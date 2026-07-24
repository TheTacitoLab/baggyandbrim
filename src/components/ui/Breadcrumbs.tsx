import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[]; // last item has no href
  className?: string;
}

/** Visual breadcrumbs on every non-homepage route (Section 18.5). The matching
 *  BreadcrumbList JSON-LD is rendered separately alongside. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('type-label text-on-surface-secondary', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-on-surface">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-on-surface">
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
