import type { CommercialBlock, CommercialPageContent, Surface } from '@/types';
import { PAGE_SEO, type SeoPath } from '@/content/seo';
import { VOLUME_BRACKETS, PROCESS_STEPS } from '@/content/site';
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
import { InstantFrame } from '@/components/media/InstantFrame';
import { TextLink } from '@/components/ui/TextLink';
import { Reveal } from '@/components/ui/Reveal';

type Light = 'paper' | 'cream';

/**
 * Plans the surface for every section on a commercial page (Revision 1.4). The
 * intro prose is the ink interrupt; the use-cases block is the single green
 * interrupt; the enquiry band is the closing ink. Every light section alternates
 * paper/cream so no two adjacent lights share a token, and a post-pass repairs
 * any green-next-to-ink or two-darks-in-a-row that a given block order produces.
 */
function planSurfaces(roles: Array<'ink' | 'green' | 'light'>): Surface[] {
  let nextLight: Light = 'cream'; // hero is paper, so the first light is cream
  const out: Surface[] = roles.map((role) => {
    if (role !== 'light') return role;
    const token = nextLight;
    nextLight = nextLight === 'cream' ? 'paper' : 'cream';
    return token;
  });

  const isDark = (s?: Surface) => s === 'ink' || s === 'green';
  const lightAwayFrom = (a?: Surface, b?: Surface): Light =>
    a === 'paper' || b === 'paper' ? 'cream' : 'paper';

  // Green must never touch ink.
  for (let i = 0; i < out.length; i++) {
    if (out[i] === 'green' && (out[i - 1] === 'ink' || out[i + 1] === 'ink')) {
      out[i] = lightAwayFrom(out[i - 1], out[i + 1]);
    }
  }
  // No two dark sections run consecutively.
  for (let i = 1; i < out.length; i++) {
    if (isDark(out[i]) && isDark(out[i - 1])) {
      out[i] = lightAwayFrom(out[i - 2], out[i + 1]);
    }
  }
  return out;
}

function BlockShell({
  children,
  surface,
  labelledBy,
}: {
  children: React.ReactNode;
  surface: Surface;
  labelledBy: string;
}) {
  return (
    <section
      data-surface={surface}
      aria-labelledby={labelledBy}
      className="bg-surface text-on-surface"
    >
      <div className="shell section-pad">{children}</div>
    </section>
  );
}

function renderBlock(block: CommercialBlock, index: number, surface: Surface) {
  const hid = `lp-block-${index}`;

  switch (block.kind) {
    case 'prose':
      return (
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <Reveal>
            <h2 id={hid} className="type-heading-l max-w-[20ch]">
              {block.heading}
            </h2>
          </Reveal>
          <div className="mt-8 md:mt-12 flex max-w-[68ch] flex-col gap-4">
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
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <Reveal>
            <h2 id={hid} className="type-heading-l max-w-[20ch]">
              {block.heading}
            </h2>
          </Reveal>
          <div className="mt-8 md:mt-12">
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
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <div className="max-w-[68ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-l">
                {block.heading}
              </h2>
            </Reveal>
            {block.intro && (
              <Reveal delay={80}>
                <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{block.intro}</p>
              </Reveal>
            )}
          </div>
          <ul className="mt-8 md:mt-12 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {block.options.map((option) => (
              <li key={option.name}>
                <ScorebookRule />
                <div className="py-6">
                  <p className="type-heading-s">{option.name}</p>
                  <p
                    className={cn(
                      'type-body-s mt-2',
                      option.detail ? 'text-on-surface' : 'text-on-surface-secondary',
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
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <div className="max-w-[68ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-l">
                {block.heading}
              </h2>
            </Reveal>
            {block.intro && (
              <Reveal delay={80}>
                <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{block.intro}</p>
              </Reveal>
            )}
          </div>
          <div className="mt-8 md:mt-12">
            {block.rows
              ? block.rows.map((row) => (
                  <div key={row.title}>
                    <ScorebookRule />
                    <div className="grid grid-cols-1 gap-1 py-6 sm:grid-cols-12 sm:gap-8">
                      <h3 className="type-heading-s sm:col-span-4">{row.title}</h3>
                      <p className="type-body text-on-surface-secondary sm:col-span-8">
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
      const threeUp = block.images.length >= 3;
      const columns = threeUp ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
      const sizes = threeUp ? '(max-width: 767px) 100vw, 33vw' : '(max-width: 767px) 100vw, 50vw';
      // One aspect ratio per row (Revision 5.1): 4:5 for a three-up row, 3:2 for
      // a supporting pair.
      const ratio = threeUp ? '4:5' : '3:2';
      return (
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <h2 id={hid} className="sr-only">
            {block.heading ?? 'Gallery'}
          </h2>
          <div className={cn('grid grid-cols-1 gap-4 md:gap-6 lg:gap-8', columns)}>
            {block.images.map((image) => (
              <InstantFrame
                key={image.id}
                imageId={image.id}
                sizes={sizes}
                caption={image.caption}
                ratioDesktop={ratio}
                ratioMobile={ratio}
              />
            ))}
          </div>
        </BlockShell>
      );
    }

    case 'process':
      // No longer the accent surface; it takes a planned light surface (1.4).
      return (
        <div key={index} data-surface={surface} className="bg-surface text-on-surface">
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
        <BlockShell key={index} surface={surface} labelledBy={hid}>
          <div className="max-w-[68ch]">
            <Reveal>
              <h2 id={hid} className="type-heading-l">
                {block.heading}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="type-body-l mt-4 md:mt-6 text-on-surface-secondary">{block.intro}</p>
            </Reveal>
          </div>
          <div className="mt-8 md:mt-12">
            <ScorebookRule />
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {VOLUME_BRACKETS.map((bracket, i) => (
                <div
                  key={bracket.value}
                  className={cn(
                    'py-8',
                    i % 2 === 1 && 'border-l border-[color:var(--rule)] pl-6',
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
  const hasJournal = journalLinks.length > 0;

  // Roles for every surface-bearing section after the paper hero, in render
  // order: content blocks, then (optional) journal links, FAQs, enquiry band,
  // related headwear. planSurfaces turns these into a valid ladder.
  const blockRoles = content.blocks.map((block, i): 'ink' | 'green' | 'light' => {
    if (i === 0 && block.kind === 'prose') return 'ink';
    if (block.kind === 'useCases') return 'green';
    return 'light';
  });
  const tailRoles: Array<'ink' | 'green' | 'light'> = [
    ...(hasJournal ? (['light'] as const) : []),
    'light', // FAQs
    'ink', // enquiry band
    'light', // related headwear
  ];
  const surfaces = planSurfaces([...blockRoles, ...tailRoles]);
  const blockSurfaces = surfaces.slice(0, content.blocks.length);
  let tail = content.blocks.length;
  const journalSurface = hasJournal ? surfaces[tail++] : undefined;
  const faqSurface = surfaces[tail++];
  const relatedSurface = surfaces[tail + 1];

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

      {content.blocks.map((block, index) => renderBlock(block, index, blockSurfaces[index]))}

      {/* Related Journal links. Renders nothing until a matching article exists. */}
      {hasJournal && journalSurface && (
        <section data-surface={journalSurface} aria-label="From the Journal" className="bg-surface">
          <div className="shell section-pad">
            <RelatedLinks heading="From the Journal" links={journalLinks} />
          </div>
        </section>
      )}

      <section data-surface={faqSurface} aria-labelledby="faq-heading" className="bg-surface">
        <div className="shell section-pad">
          <Reveal>
            <h2 id="faq-heading" className="type-heading-l max-w-[20ch]">
              {content.faqHeading}
            </h2>
          </Reveal>
          <div className="mt-8 md:mt-12">
            <FaqList items={content.faqs} />
          </div>
        </div>
      </section>

      <EnquiryCtaBand
        heading={content.enquiry.heading}
        line={content.enquiry.line}
        section={content.slug}
      />

      <RelatedHeadwear currentHref={path} surface={relatedSurface} />
    </>
  );
}
