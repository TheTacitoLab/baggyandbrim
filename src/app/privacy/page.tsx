import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { CONTACT, COMPANY } from '@/content/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TextLink } from '@/components/ui/TextLink';

export const metadata: Metadata = buildMetadata({ path: '/privacy' });

// The consent checkbox links here, so this cannot ship empty (TODO-05). The copy
// below states only what is factually true about the enquiry form. The full
// policy is supplied by the client or legal before launch — no clauses are
// invented here.
export default function PrivacyPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }];
  return (
    <section data-surface="paper" aria-labelledby="privacy-heading" className="bg-paper">
      <JsonLd data={[breadcrumbSchema(breadcrumbs)]} />
      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="shell section-pad pt-10">
        <div className="max-w-[68ch]">
          <h1 id="privacy-heading" className="type-heading-l">
            Privacy Policy
          </h1>
          <p className="type-body-s mt-4 text-on-surface-secondary">
            The full policy is being finalised before launch. What follows describes how the
            enquiry form handles your information today.
          </p>

          <h2 className="type-heading-s mt-12">What we collect</h2>
          <p className="type-body mt-4 text-on-surface">
            When you send a brief, we collect the details you enter: your name, email address and
            phone number, the type and quantity of headwear you are interested in, your target
            date, and, if you provide them, your club or organisation and any message. We do not
            ask for anything we do not need to respond to you.
          </p>

          <h2 className="type-heading-s mt-10">Why we collect it</h2>
          <p className="type-body mt-4 text-on-surface">
            We use these details for one purpose: to respond to your enquiry, prepare a design and
            confirm a specification. We do not sell your details or use them for unrelated
            marketing.
          </p>

          <h2 className="type-heading-s mt-10">How your brief reaches us</h2>
          <p className="type-body mt-4 text-on-surface">
            The form is submitted through Web3Forms, a form-delivery service, which forwards your
            brief to us by email. Your details pass through that service in order to reach us.
          </p>

          <h2 className="type-heading-s mt-10">Cookies</h2>
          <p className="type-body mt-4 text-on-surface">
            This website sets no cookies of its own. If website analytics is switched on in future,
            it may set cookies, and you will be asked before that happens.
          </p>

          <h2 className="type-heading-s mt-10">Getting in touch</h2>
          <p className="type-body mt-4 text-on-surface">
            {CONTACT.email ? (
              <>
                For any question about your information, email us at{' '}
                <TextLink href={`mailto:${CONTACT.email}`}>{CONTACT.email}</TextLink>.
              </>
            ) : (
              <>
                For any question about your information, contact us through the{' '}
                <TextLink href="/enquire">enquiry form</TextLink> and we will help.
              </>
            )}
          </p>

          {COMPANY.registeredDetails && (
            <p className="type-body-s mt-10 text-on-surface-secondary">{COMPANY.registeredDetails}</p>
          )}
        </div>
      </div>
    </section>
  );
}
