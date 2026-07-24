'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { HEADER_CTA, NAV_ITEMS } from '@/content/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Wordmark } from './Wordmark';

const SECTION_IDS = ['headwear', 'occasions', 'process', 'journal', 'enquire'];

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
  // Every page now has a paper hero (Revision 6), so the header is solid on every
  // page. The transparent-over-dark-hero overlay was retired with the old hero.
  const overlay = false;
  const [solid, setSolid] = useState(!overlay);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(isHome ? SECTION_IDS : []);

  // Transparent → solid transition, driven by a sentinel at the base of the hero.
  useEffect(() => {
    // Solidity depends on the presence and position of a DOM sentinel, so it must
    // be synced after mount. These fallbacks set the resolved value once.
    if (!overlay) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolid(true);
      return;
    }
    const sentinel = document.getElementById('header-sentinel');
    if (!sentinel) {
      setSolid(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [overlay, pathname]);

  // Bottom rule appears once scrolled past 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onAnchor = useCallback((event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    scrollToHash(hash);
  }, []);

  const onCtaClick = useCallback(() => {
    track('cta_header_click', { page_path: pathname });
    if (isHome) scrollToHash(HEADER_CTA.hash);
  }, [isHome, pathname]);

  const light = overlay && !solid;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        solid ? 'bg-paper text-ink' : 'bg-transparent text-paper',
        scrolled && solid ? 'border-[color:var(--colour-rule)]' : 'border-transparent',
      )}
      data-surface={light ? 'ink' : 'paper'}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Wordmark href="/" as="span" size="sm" />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActiveSection = isHome && active === item.hash.replace('#', '');
              const isActiveRoute = !isHome && item.isRoute && pathname.startsWith(item.href);
              const isActive = isActiveSection || isActiveRoute;
              const href = isHome ? item.hash : item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={href}
                    onClick={isHome ? (e) => onAnchor(e, item.hash) : undefined}
                    aria-current={isActive ? 'location' : undefined}
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
            className={cn(
              'btn',
              solid ? 'btn-primary' : 'border border-current bg-transparent text-paper',
            )}
          >
            {HEADER_CTA.label}
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={isHome ? HEADER_CTA.hash : HEADER_CTA.href}
            onClick={onCtaClick}
            className={cn(
              'type-label px-3 py-2',
              !solid && 'text-paper',
            )}
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
