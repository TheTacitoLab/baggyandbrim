'use client';

import type { CSSProperties } from 'react';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Built from parsed headings, not hand-maintained. Rendered only when the article
 * has four or more H2s (checked by the caller). Sticky in the left margin above
 * 1280px, inline collapsible below (build spec 14.4).
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const list = (
    <ul className="flex flex-col gap-2">
      {headings.map((heading) => (
        <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? '0.75rem' : 0 } as CSSProperties}>
          <a
            href={`#${heading.id}`}
            className="type-body-s text-on-surface-secondary transition-colors hover:text-on-surface"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label="On this page">
      <details className="faq xl:hidden" open>
        <summary className="type-label flex items-center justify-between py-3 text-on-surface-secondary">
          On this page
          <svg className="faq-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </summary>
        <div className="pb-4">{list}</div>
      </details>

      <div className="sticky top-32 hidden xl:block">
        <p className="type-label text-on-surface-secondary">On this page</p>
        <div className="mt-4">{list}</div>
      </div>
    </nav>
  );
}
