import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { CtaLink } from '@/components/ui/CtaLink';

interface Cluster {
  name: string;
  line: string;
}

interface JournalEmptyStateProps {
  clusters: readonly Cluster[];
  closingLine: string;
  cta?: { label: string; href: string };
}

/**
 * No fake articles. An editorial contents-page-in-progress: the four planned
 * clusters as ledger rows, a closing line and one CTA (build spec Section 10).
 */
export function JournalEmptyState({ clusters, closingLine, cta }: JournalEmptyStateProps) {
  return (
    <div>
      <ul>
        {clusters.map((cluster) => (
          <li key={cluster.name}>
            <ScorebookRule />
            <div className="grid grid-cols-1 gap-1 py-6 sm:grid-cols-12 sm:gap-8">
              <h3 className="type-heading-s sm:col-span-4">{cluster.name}</h3>
              <p className="type-body text-on-surface-secondary sm:col-span-7 sm:col-start-5">
                {cluster.line}
              </p>
            </div>
          </li>
        ))}
        <li aria-hidden="true">
          <ScorebookRule />
        </li>
      </ul>
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-body-l max-w-[52ch]">{closingLine}</p>
        {cta && (
          <CtaLink
            href={cta.href}
            event="cta_section_click"
            params={{ section: 'journal' }}
            className="btn btn-secondary shrink-0"
          >
            {cta.label}
          </CtaLink>
        )}
      </div>
    </div>
  );
}
