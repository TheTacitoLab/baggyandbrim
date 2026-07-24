import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  number?: string; // '01'. Omit on landing pages (Section 6.2)
  children: ReactNode;
  as?: 'p' | 'span';
  className?: string;
  id?: string;
}

/**
 * The scorebook section label: an uppercase tracked eyebrow preceded by a cap
 * number and a forward slash where the section is part of the homepage sequence.
 * Not a heading — the section's real <h2> is the headline beside it.
 */
export function SectionLabel({ number, children, as: Tag = 'p', className, id }: SectionLabelProps) {
  return (
    <Tag
      id={id}
      className={cn('type-label flex items-center gap-2 text-on-surface-secondary', className)}
    >
      {number && (
        <>
          <span className="tabular text-on-surface">{number}</span>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
