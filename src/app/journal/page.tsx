import type { Metadata } from 'next';
import { buildMetadata, PAGE_SEO } from '@/content/seo';
import { HOMEPAGE } from '@/content/homepage';
import { COMMERCIAL_LINKS } from '@/content/navigation';
import { getAllArticles } from '@/lib/journal';
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JournalCard } from '@/components/journal/JournalCard';
import { JournalGrid } from '@/components/journal/JournalGrid';
import { JournalEmptyState } from '@/components/journal/JournalEmptyState';
import { RelatedLinks } from '@/components/ui/RelatedLinks';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { EnquiryCtaBand } from '@/components/sections/EnquiryCtaBand';

export const metadata: Metadata = buildMetadata({ path: '/journal' });

const INTRO =
  'Notes on cricket headwear. Cap design, club traditions, embroidery, numbering systems, and the practical business of getting an order right first time.';

export default function JournalIndexPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'The Journal' }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          collectionPageSchema('/journal', 'The Journal', PAGE_SEO['/journal'].description),
        ]}
      />

      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section data-surface="paper" aria-labelledby="journal-heading" className="bg-paper">
        <div className="shell section-pad">
          <div className="max-w-[52ch]">
            <h1 id="journal-heading" className="type-heading-l">
              The Journal
            </h1>
            <p className="type-body-l mt-5 text-on-surface-secondary">{INTRO}</p>
          </div>
          <div className="mt-10">
            <ScorebookRule />
          </div>

          <div className="mt-12">
            {articles.length === 0 ? (
              <JournalEmptyState
                clusters={HOMEPAGE.journal.clusters}
                closingLine={HOMEPAGE.journal.emptyClosingLine}
                cta={{ label: 'Ask us instead', href: '/enquire' }}
              />
            ) : (
              <>
                {featured && (
                  <div className="mb-16">
                    <JournalCard article={featured} variant="featured" />
                  </div>
                )}
                <JournalGrid articles={rest} columns={3} />
              </>
            )}
          </div>
        </div>
      </section>

      <section data-surface="cream" aria-label="Custom cricket headwear" className="bg-cream">
        <div className="shell section-pad">
          <RelatedLinks
            heading="Custom cricket headwear"
            links={COMMERCIAL_LINKS.map((link) => ({
              label: link.label,
              href: link.href,
              description: link.description,
            }))}
          />
        </div>
      </section>

      <EnquiryCtaBand
        heading="Start Your Cap Brief"
        line="Notes are one thing. If you have a cap in mind, the quickest answer comes from a brief."
        section="journal"
      />
    </>
  );
}
