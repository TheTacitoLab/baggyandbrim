'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

interface CtaLinkProps {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string | number>;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/** A link that fires one analytics event on click. The only reason a CTA needs
 *  to be a client component (build spec Section 30). */
export function CtaLink({ href, event, params, className, children, ...rest }: CtaLinkProps) {
  return (
    <Link href={href} className={className} onClick={() => track(event, params)} {...rest}>
      {children}
    </Link>
  );
}
