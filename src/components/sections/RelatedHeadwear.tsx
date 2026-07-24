import Link from 'next/link';
import { COMMERCIAL_LINKS } from '@/content/navigation';
import { ScorebookRule } from '@/components/ui/ScorebookRule';

/** Section 13 step 13. Ruled row to the other commercial pages, one line each. */
export function RelatedHeadwear({ currentHref }: { currentHref: string }) {
  const links = COMMERCIAL_LINKS.filter((link) => link.href !== currentHref);
  return (
    <section aria-labelledby="related-headwear-heading" data-surface="paper" className="bg-paper">
      <div className="shell section-pad">
        <h2 id="related-headwear-heading" className="type-heading-m">
          More headwear
        </h2>
        <ul className="mt-8">
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
          <ScorebookRule animate={false} />
        </ul>
      </div>
    </section>
  );
}
