import type { CommercialBlock, CommercialPageContent, Surface } from '@/types';
import { PAGE_SEO, type SeoPath } from '@/content/seo';
import { PROCESS_STEPS, VOLUME_BRACKETS } from '@/content/site';
import { getArticlesForCommercialPage } from '@/lib/journal';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { RelatedLinks } from '@/components/ui/RelatedLinks';
import { cn } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { EnquiryCtaBand } from '@/components/sections/EnquiryCtaBand';
import { RelatedHeadwear } from '@/components/sections/RelatedHeadwear';
import { FaqList } from '@/components/ui/FaqList';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { ImageReveal } from '@/components/media/ImageReveal';
import { TextLink } from '@/components/ui/TextLink';
import { Reveal } from '@/components/ui/Reveal';

function BlockShell({
  children,
  surface = 'paper',
  labelledBy,
}: {
  children: React.ReactNode;
  surface?: Surface;
  labelledBy: string;
}) {
  return (
    <section data-surface={surface} aria-labelledby={labelledBy} className="bg-surface text-on-surface">
      <div className="shell section-pad">{children}</div>
    </section>
  );
}

function renderBlock(block: CommercialBlock, index: number, accent: 'green' | 'red') {
  const hid = `lp-block-${index}`;

  switch (block.kind) {
    case 'prose':
      return (
        <BlockShell key={index} labelledBy={hid}>
          <Reveal>
            <h2 id={hid} className="type-heading-m max-w-[20ch]">
              {block.heading}
            </h2>
          </Reveal>
          <div className="mt-8 flex max-w-[64ch] flex-col gap-4 lg:ml-[8.33%]">
            {block.body.map((paragraph, i) => (
              <Reveal key={i} as="p" delay={i * 80} className="type-body text-on-surface">
                {paragraph}
              </Reveal>
            ))}
          </div>
        </BlockShell>
      );

    case 'comparison':
      return (
        <BlockShell key={index} labelledBy={hid}>
          <Reveal>
            <h2 id={hid} className="type-heading-m">
              {block.heading}
            </h2>
          </Reveal>
          <div className="mt-10">
            {block.rows.map((row) => (
              <div key={row.style}>
                <ScorebookRule />
                <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-6 lg:grid-cols-12">
                  <h3 className="type-heading-s lg:col-span-3">{row.style}</h3>
                  <p className="type-body text-on-surface lg:col-span-4">{row.bestFor}</p>
                  <p className="type-body-s text-on-surface-secondary lg:col-span-3">
                    {row.character}
                  </p>
                  <div className="lg:col-span-2">
                    <TextLink href={row.href}>{row.linkLabel}</TextLink>
                  </div>
                </div>
              </div>
            ))}
            <ScorebookRule />
          </div>
        </BlockShell>
      );

    case 'options':
      return (
        <BlockShell key={index} labelledBy={hid}>
          <div className="max-w-[46ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-m">
                {block.heading}
              </h2>
            </Reveal>
            {block.intro && (
              <Reveal delay={80}>
                <p className="type-body-l mt-5 text-on-surface-secondary">{block.intro}</p>
              </Reveal>
            )}
          </div>
          <ul className="mt-10 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {block.options.map((option) => (
              <li key={option.name}>
                <ScorebookRule />
                <div className="py-5">
                  <p className="type-heading-s">{option.name}</p>
                  <p
                    className={cn(
                      'type-body-s mt-1',
                      option.detail
                        ? 'text-on-surface'
                        : 'text-on-surface-secondary',
                    )}
                  >
                    {option.detail ?? 'Details confirmed on enquiry'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </BlockShell>
      );

    case 'useCases':
      return (
        <BlockShell key={index} labelledBy={hid}>
          <div className="max-w-[46ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-m">
                {block.heading}
              </h2>
            </Reveal>
            {block.intro && (
              <Reveal delay={80}>
                <p className="type-body-l mt-5 text-on-surface-secondary">{block.intro}</p>
              </Reveal>
            )}
          </div>
          <div className="mt-10">
            {block.rows
              ? block.rows.map((row) => (
                  <div key={row.title}>
                    <ScorebookRule />
                    <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-8">
                      <h3 className="type-heading-s sm:col-span-4">{row.title}</h3>
                      <p className="type-body text-on-surface-secondary sm:col-span-7 sm:col-start-5">
                        {row.description}
                      </p>
                    </div>
                  </div>
                ))
              : block.items?.map((item) => (
                  <div key={item}>
                    <ScorebookRule />
                    <p className="type-body py-4">{item}</p>
                  </div>
                ))}
            <ScorebookRule />
          </div>
        </BlockShell>
      );

    case 'imagery': {
      const columns = block.images.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
      const sizes =
        block.images.length >= 3
          ? '(max-width: 767px) 100vw, 33vw'
          : '(max-width: 767px) 100vw, 50vw';
      return (
        <BlockShell key={index} surface={block.surface ?? 'cream'} labelledBy={hid}>
          <h2 id={hid} className="sr-only">
            {block.heading ?? 'Gallery'}
          </h2>
          <div className={cn('grid grid-cols-1 gap-8', columns)}>
            {block.images.map((image) => (
              <ImageReveal
                key={image.id}
                imageId={image.id}
                sizes={sizes}
                caption={image.caption}
              />
            ))}
          </div>
        </BlockShell>
      );
    }

    case 'process':
      // The one accent surface on the page (build spec 8.5).
      return (
        <div key={index} data-surface={accent} className="bg-surface text-on-surface">
          <ProcessSteps
            heading={block.heading}
            steps={PROCESS_STEPS}
            variant="compact"
            fullProcessHref="/#process"
          />
        </div>
      );

    case 'quantities':
      return (
        <BlockShell key={index} surface="cream" labelledBy={hid}>
          <div className="max-w-[46ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-m">
                {block.heading}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="type-body-l mt-5 text-on-surface-secondary">{block.intro}</p>
            </Reveal>
          </div>
          <div className="mt-10">
            <ScorebookRule />
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {VOLUME_BRACKETS.map((bracket, i) => (
                <div
                  key={bracket.value}
                  className={cn(
                    'py-8',
                    i % 2 === 1 && 'border-l border-[color:var(--rule)] pl-5',
                    'lg:border-l lg:border-[color:var(--rule)] lg:px-6',
                    i === 0 && 'lg:border-l-0 lg:pl-0',
                  )}
                >
                  <span className="type-heading-m tabular block">{bracket.display}</span>
                  <p className="type-body-s mt-3 text-on-surface-secondary">{bracket.description}</p>
                </div>
              ))}
            </div>
            <ScorebookRule />
          </div>
        </BlockShell>
      );
  }
}

export function CommercialPage({ content }: { content: CommercialPageContent }) {
  const path = `/${content.slug}`;
  const seo = PAGE_SEO[path as SeoPath];
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: seo?.title ?? content.h1 }];
  const journalLinks = getArticlesForCommercialPage(path).map((article) => ({
    label: article.title,
    href: `/journal/${article.slug}`,
    description: article.excerpt,
  }));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(content.faqs)]} />

      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <EditorialHero
        eyebrow={content.heroEyebrow}
        headline={content.h1}
        intro={content.heroIntro}
        primaryCta={content.primaryCta}
        secondaryCta={content.secondaryCta}
        imageId={content.heroImageId}
        height="reduced"
      />

      {content.blocks.map((block, index) => renderBlock(block, index, content.accent))}

      {/* Related Journal links (Section 13.1 step 10). Renders nothing until a
          matching article exists — never an empty heading. */}
      {journalLinks.length > 0 && (
        <section data-surface="cream" aria-label="From the Journal" className="bg-cream">
          <div className="shell section-pad">
            <RelatedLinks heading="From the Journal" links={journalLinks} />
          </div>
        </section>
      )}

      <section data-surface="paper" aria-labelledby="faq-heading" className="bg-paper">
        <div className="shell section-pad">
          <Reveal>
            <h2 id="faq-heading" className="type-heading-l max-w-[20ch]">
              {content.faqHeading}
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqList items={content.faqs} />
          </div>
        </div>
      </section>

      <EnquiryCtaBand
        heading={content.enquiry.heading}
        line={content.enquiry.line}
        section={content.slug}
      />

      <RelatedHeadwear currentHref={path} />
    </>
  );
}
