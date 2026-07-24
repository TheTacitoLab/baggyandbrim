import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { COMPANY, SITE } from '@/content/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = buildMetadata({ path: '/terms' });

// Full terms are supplied by the client or legal before launch (TODO-06). Nothing
// is invented here beyond a factual description of what the site is for.
export default function TermsPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Terms' }];
  return (
    <section data-surface="paper" aria-labelledby="terms-heading" className="bg-paper">
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />
      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="shell section-pad pt-10">
        <div className="max-w-[68ch]">
          <h1 id="terms-heading" className="type-heading-l">
            Terms
          </h1>
          <p className="type-body-s mt-4 text-[color:var(--colour-grey-muted)]">
            The full terms are being finalised before launch.
          </p>
          <p className="type-body mt-8 text-on-surface">
            This website provides information about {SITE.name} and its custom cricket headwear, and
            lets you submit an enquiry. Sending a brief starts a conversation; it is not an order.
            Nothing is produced until you have seen and approved a design.
          </p>
          <p className="type-body mt-5 text-on-surface">
            Full terms covering orders, artwork, payment and delivery will be published here before
            launch.
          </p>
          {COMPANY.registeredDetails && (
            <p className="type-body-s mt-10 text-on-surface-secondary">{COMPANY.registeredDetails}</p>
          )}
        </div>
      </div>
    </section>
  );
}
