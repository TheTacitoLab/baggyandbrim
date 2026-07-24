import Link from 'next/link';
import type { Surface } from '@/types';
import { COMMERCIAL_LINKS } from '@/content/navigation';
import { ScorebookRule } from '@/components/ui/ScorebookRule';

/** A ruled row linking the other commercial pages, one line each. The surface is
 *  planned by the page ladder (Revision 1.4). */
export function RelatedHeadwear({
  currentHref,
  surface = 'paper',
}: {
  currentHref: string;
  surface?: Surface;
}) {
  const links = COMMERCIAL_LINKS.filter((link) => link.href !== currentHref);
  return (
    <section
      aria-labelledby="related-headwear-heading"
      data-surface={surface}
      className="bg-surface text-on-surface"
    >
      <div className="shell section-pad">
        <h2 id="related-headwear-heading" className="type-heading-l">
          More headwear
        </h2>
        <ul className="mt-8 md:mt-12">
          {links.map((link) => (
            <li key={link.href}>
              <ScorebookRule animate={false} />
              <Link
                href={link.href}
                className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-8"
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
      </div>
    </section>
  );
}
