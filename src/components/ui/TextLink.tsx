import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  withArrow?: boolean;
}

/** Text link with a 1px underline offset 6px, drawn from the left on hover. */
export function TextLink({ href, children, className, external = false, withArrow = false }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn('text-link', className)}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
      {withArrow && <span aria-hidden="true">&nbsp;→</span>}
    </Link>
  );
}
