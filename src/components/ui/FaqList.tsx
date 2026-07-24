'use client';

import { useEffect, useRef } from 'react';
import type { FaqItem } from '@/types';
import { ScorebookRule } from './ScorebookRule';

/**
 * Accessible disclosure list (build spec 13.1). Native <details> so it works
 * without JavaScript: rendered open on the server, then collapsed on mobile by a
 * client effect. Answers are present in the HTML in both states. Expanded by
 * default on desktop, collapsed on mobile.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      refs.current.forEach((detail) => {
        if (detail) detail.open = false;
      });
    }
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <details
          key={item.question}
          ref={(el) => {
            refs.current[index] = el;
          }}
          open
          className="faq"
        >
          <ScorebookRule animate={false} />
          <summary className="flex items-start justify-between gap-6 py-6">
            <h3 className="type-heading-s">{item.question}</h3>
            <svg
              className="faq-icon mt-1 shrink-0"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              aria-hidden="true"
              fill="none"
            >
              <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </summary>
          <div className="pb-7">
            <p className="type-body max-w-[68ch] text-on-surface-secondary">{item.answer}</p>
          </div>
        </details>
      ))}
      <ScorebookRule animate={false} />
    </div>
  );
}
