'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface StickyEnquiryCTAProps {
  href: string;
  label: string;
  showAfterSelector?: string; // hero sentinel
  hideBelowSelector?: string; // the enquiry anchor
}

const DISMISS_KEY = 'bb-sticky-dismissed';

/**
 * Appears once the hero has left the viewport, hides at the enquiry section and
 * stays hidden below it, never shows on /enquire, and is dismissible for the
 * session on mobile (build spec, Sticky enquiry CTA).
 */
export function StickyEnquiryCTA({
  href,
  label,
  showAfterSelector = '#header-sentinel',
  hideBelowSelector = '[data-enquiry-anchor]',
}: StickyEnquiryCTAProps) {
  const pathname = usePathname();
  const [passedHero, setPassedHero] = useState(false);
  const [atAnchor, setAtAnchor] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1');
  }, []);

  useEffect(() => {
    const sentinel = document.querySelector(showAfterSelector);
    if (!sentinel) {
      const onScroll = () => setPassedHero(window.scrollY > 600);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const io = new IntersectionObserver(
      ([entry]) => setPassedHero(entry.boundingClientRect.top < 0 && !entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [showAfterSelector, pathname]);

  useEffect(() => {
    const anchor = document.querySelector(hideBelowSelector);
    if (!anchor) {
      setAtAnchor(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setAtAnchor(entry.boundingClientRect.top < window.innerHeight * 0.8),
      { threshold: [0, 0.2, 1] },
    );
    io.observe(anchor);
    return () => io.disconnect();
  }, [hideBelowSelector, pathname]);

  if (pathname === '/enquire') return null;

  const show = passedHero && !atAnchor && !dismissed;
  const resolvedHref = pathname === '/' ? '#enquire' : href;

  const onClick = () => {
    const doc = document.documentElement;
    const depth = Math.round(
      (window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)) * 100,
    );
    track('cta_sticky_click', { page_path: pathname, scroll_depth: depth });
  };

  return (
    <div
      aria-hidden={!show}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 transition-all duration-200 md:inset-x-auto md:bottom-6 md:right-6',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch md:block">
        <Link
          href={resolvedHref}
          onClick={onClick}
          tabIndex={show ? 0 : -1}
          className="btn flex-1 rounded-none bg-ink text-paper md:h-12 md:flex-none md:rounded-[2px]"
          style={{ minHeight: '56px' }}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          tabIndex={show ? 0 : -1}
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, '1');
            setDismissed(true);
          }}
          className="flex w-14 items-center justify-center bg-ink text-paper md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
