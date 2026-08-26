import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { getLegalDocument, LEGAL_LAST_UPDATED } from '@/content/legal';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LegalArticle } from '@/components/legal/LegalArticle';

export const metadata: Metadata = buildMetadata({ path: '/privacy' });

// Content lives in content/legal/privacy.md (build spec 3.6). Square-bracket
// placeholders are unsupplied company details, left visible until launch.
export default function PrivacyPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Privacy Notice' }];
  return (
    <section data-surface="paper" aria-labelledby="privacy-heading" className="bg-paper">
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />
      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="shell section-pad pt-10">
        <div className="max-w-[68ch]">
          <h1 id="privacy-heading" className="type-heading-l">
            Privacy Notice
          </h1>
          <p className="type-body-s mt-4 text-on-surface-secondary">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>
          <div className="mt-10">
            <LegalArticle source={getLegalDocument('privacy')} />
          </div>
        </div>
      </div>
    </section>
  );
}
