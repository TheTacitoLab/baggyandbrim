import Link from 'next/link';
import { ScorebookRule } from './ScorebookRule';

interface RelatedLinksProps {
  heading: string;
  links: { label: string; href: string; description?: string }[];
  variant?: 'ruled' | 'inline';
}

/** Renders null when links is empty — never an empty heading (build spec 13.1,
 *  21.2 rule 4). Used for related Journal links, which show nothing until
 *  matching articles exist. */
export function RelatedLinks({ heading, links, variant = 'ruled' }: RelatedLinksProps) {
  if (links.length === 0) return null;

  if (variant === 'inline') {
    return (
      <nav aria-label={heading} className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-link">
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label={heading}>
      <h2 className="type-heading-m">{heading}</h2>
      <ul className="mt-8">
        {links.map((link) => (
          <li key={link.href}>
            <ScorebookRule animate={false} />
            <Link
              href={link.href}
              className="group grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-8"
            >
              <span className="type-heading-s sm:col-span-4">
                <span className="text-link">{link.label}</span>
              </span>
              {link.description && (
                <span className="type-body text-on-surface-secondary sm:col-span-7 sm:col-start-5">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
        <li aria-hidden="true">
          <ScorebookRule animate={false} />
        </li>
      </ul>
    </nav>
  );
}
