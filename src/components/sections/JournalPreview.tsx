import { HOMEPAGE } from '@/content/homepage';
import { getLatestArticles } from '@/lib/journal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { JournalGrid } from '@/components/journal/JournalGrid';
import { JournalEmptyState } from '@/components/journal/JournalEmptyState';
import { TextLink } from '@/components/ui/TextLink';
import { Reveal } from '@/components/ui/Reveal';

const { journal } = HOMEPAGE;

/**
 * Section 10. Reads getLatestArticles(3): renders the card row when articles
 * exist, otherwise the editorial empty state. Adding one MDX file switches the
 * section over with no code change.
 */
export function JournalPreview() {
  const articles = getLatestArticles(3);
  const hasArticles = articles.length > 0;

  return (
    <section
      id="journal"
      data-surface="paper"
      aria-labelledby="journal-heading"
      tabIndex={-1}
      className="bg-paper outline-none"
    >
      <div className="shell section-pad">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[46ch]">
            <SectionLabel number={journal.number}>{journal.label}</SectionLabel>
            <Reveal>
              <h2 id="journal-heading" className="type-heading-l mt-5">
                {journal.heading}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="type-body-l mt-5 text-on-surface-secondary">{journal.intro}</p>
            </Reveal>
          </div>
          {hasArticles && (
            <TextLink href={journal.populatedLink.href} withArrow>
              {journal.populatedLink.label}
            </TextLink>
          )}
        </div>

        <div className="mt-12">
          {hasArticles ? (
            <JournalGrid articles={articles} showExcerpt={false} location="homepage" />
          ) : (
            <JournalEmptyState
              clusters={journal.clusters}
              closingLine={journal.emptyClosingLine}
              cta={journal.emptyCta}
            />
          )}
        </div>
      </div>
    </section>
  );
}
