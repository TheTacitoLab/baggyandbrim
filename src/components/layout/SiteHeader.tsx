'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/content/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Wordmark } from './Wordmark';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Bottom rule appears once scrolled past 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

        {/* Desktop navigation: the three products, the Journal and Contact —
            five identical items, no boxed CTA (build spec 4.2). */}
        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = !item.href.includes('#') && pathname.startsWith(item.href);
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
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/#enquire" className="type-label px-3 py-2">
            Contact
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
