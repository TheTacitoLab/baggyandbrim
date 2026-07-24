import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { HOMEPAGE } from '@/content/homepage';
import { breadcrumbSchema, contactPageSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { EnquiryForm } from '@/components/form/EnquiryForm';

export const metadata: Metadata = buildMetadata({ path: '/enquire' });

// Its own short introduction, no repeated brand narrative, self-referencing
// canonical (build spec 11.2). Shared prose with the homepage stays minimal.
const INTRO = [
  'This is the brief. Fill it in and we will come back with options, a specification and an honest timeline.',
  'If you are not yet sure what you want, say so. That is a normal way to start.',
];

export default function EnquirePage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Start Your Cap Brief' }];

  return (
    <section data-surface="ink" aria-labelledby="enquire-heading" className="bg-ink text-paper">
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          contactPageSchema('/enquire', 'Start Your Cap Brief'),
        ]}
      />
      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="shell section-pad grid grid-cols-1 gap-x-8 gap-y-12 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="type-label text-on-surface-secondary">Custom cricket headwear</p>
          <h1 id="enquire-heading" className="type-heading-l mt-5">
            Start Your Cap Brief
          </h1>
          <div className="mt-6 flex flex-col gap-4">
            {INTRO.map((paragraph, index) => (
              <p key={index} className="type-body max-w-[42ch] text-on-surface-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="mt-10">
            {HOMEPAGE.enquiry.reassurance.map((item) => (
              <li key={item}>
                <ScorebookRule />
                <p className="type-body-s py-4">{item}</p>
              </li>
            ))}
            <ScorebookRule />
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm source="enquire-page" />
        </div>
      </div>
    </section>
  );
}
