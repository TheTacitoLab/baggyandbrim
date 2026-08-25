'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { HEADER_CTA, NAV_ITEMS } from '@/content/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Wordmark } from './Wordmark';

/** Smooth-scroll to an in-page anchor and move focus to it, so keyboard and
 *  screen-reader users land where sighted users do (build spec 28.2). */
export function scrollToHash(hash: string) {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  history.replaceState(null, '', hash);
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Bottom rule appears once scrolled past 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onCtaClick = useCallback(() => {
    track('cta_header_click', { page_path: pathname });
    if (isHome) scrollToHash(HEADER_CTA.hash);
  }, [isHome, pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b bg-paper text-ink transition-colors duration-200',
        scrolled ? 'border-[color:var(--colour-rule)]' : 'border-transparent',
      )}
      data-surface="paper"
      style={{ height: 'var(--header-height)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Wordmark href="/" as="span" size="sm" />

        {/* Desktop navigation: the three products, then the Journal. */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'type-label transition-opacity hover:opacity-70',
                      isActive && 'underline decoration-1 underline-offset-[6px]',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={isHome ? HEADER_CTA.hash : HEADER_CTA.href}
            onClick={onCtaClick}
            className="btn btn-primary"
          >
            {HEADER_CTA.label}
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={isHome ? HEADER_CTA.hash : HEADER_CTA.href}
            onClick={onCtaClick}
            className="type-label px-3 py-2"
          >
            Enquire
          </Link>
          <button
            id="menu-trigger"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
