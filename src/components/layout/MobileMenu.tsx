'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { COMMERCIAL_LINKS, HEADER_CTA, NAV_ITEMS } from '@/content/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { scrollToHash } from './SiteHeader';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Full-screen ink panel. Focus trapped, Escape closes, background scroll
 *  locked, trigger refocused on close (build spec Section 1, 28.2). */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const close = () => {
    onClose();
    requestAnimationFrame(() => document.getElementById('menu-trigger')?.focus());
  };

  const onAnchor = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    event.preventDefault();
    close();
    requestAnimationFrame(() => scrollToHash(hash));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-surface="ink"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 12 }}
          transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper"
        >
          <div className="shell flex items-center justify-between" style={{ height: 'var(--header-height)' }}>
            <span className="type-label">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span aria-hidden="true" className="relative block h-6 w-6">
                <span className="absolute left-0 top-1/2 block h-px w-6 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 block h-px w-6 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="shell flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
            <nav aria-label="Primary" className="flex flex-col">
              <ul className="flex flex-col gap-5">
                {NAV_ITEMS.map((item) => {
                  const href = isHome && !item.isRoute ? item.hash : item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={href}
                        onClick={item.isRoute ? close : (e) => onAnchor(e, item.hash)}
                        className="type-heading-m"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="my-8 h-px w-full bg-[color:var(--colour-rule-inverse)]" />

              <ul className="flex flex-col gap-3">
                {COMMERCIAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close} className="type-body">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href={isHome ? HEADER_CTA.hash : HEADER_CTA.href}
              onClick={isHome ? (e) => onAnchor(e, HEADER_CTA.hash) : close}
              className="btn btn-primary mt-10 w-full"
            >
              {HEADER_CTA.label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
