import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: ReactNode;
  as?: 'p' | 'span';
  className?: string;
  id?: string;
}

/**
 * A small uppercase tracked label above a heading. The numbered scorebook prefix
 * was removed in Revision 2 — the surface changes now do the structural work.
 * Kept only where a label still genuinely helps (Journal and Volumes).
 */
export function SectionLabel({ children, as: Tag = 'p', className, id }: SectionLabelProps) {
  return (
    <Tag id={id} className={cn('type-label text-on-surface-secondary', className)}>
      {children}
    </Tag>
  );
}
