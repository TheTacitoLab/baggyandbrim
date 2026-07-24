import { InstantFrame } from '@/components/media/InstantFrame';
import { Reveal } from '@/components/ui/Reveal';
import { CtaLink } from '@/components/ui/CtaLink';

interface EditorialHeroProps {
  eyebrow: string;
  displayLines?: [string, string]; // homepage H1, two lines, two words each
  headline: string; // commercial H1 / SEO-bearing line
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microLine?: string;
  imageId: string;
  height?: 'full' | 'reduced';
}

/**
 * The hero (Revision 6). Rebuilt from scratch: two 50/50 columns inside the page
 * container, never full-bleed, never overlaid. Text left, one framed image
 * right. On mobile the image comes first, then the text, everything left-aligned
 * (Mode B). Exactly one H1 per page. Content is readable with JavaScript off.
 */
export function EditorialHero({
  eyebrow,
  displayLines,
  headline,
  intro,
  primaryCta,
  secondaryCta,
  microLine,
  imageId,
  height = 'full',
}: EditorialHeroProps) {
  if (height === 'reduced') {
    // Landing-page hero: paper surface, two columns, not full bleed.
    return (
      <section data-surface="paper" aria-labelledby="hero-heading" className="bg-paper">
        <div className="shell">
          <div className="flex flex-col gap-8 pb-16 pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-24 lg:pt-12">
            <div>
              <Reveal>
                <p className="type-label text-on-surface-secondary">{eyebrow}</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 id="hero-heading" className="type-heading-l mt-4 max-w-[18ch]">
                  {headline}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="type-body-l mt-4 max-w-[52ch] text-on-surface-secondary md:mt-6">
                  {intro}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10 lg:mt-12">
                  <CtaLink
                    href={primaryCta.href}
                    event="cta_hero_click"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    {primaryCta.label}
                  </CtaLink>
                  {secondaryCta && (
                    <CtaLink
                      href={secondaryCta.href}
                      event="cta_hero_click"
                      className="btn btn-secondary w-full sm:w-auto"
                    >
                      {secondaryCta.label}
                    </CtaLink>
                  )}
                </div>
              </Reveal>
            </div>
            <div>
              <InstantFrame
                imageId={imageId}
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                revealDirection="none"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Homepage hero. Two 50/50 columns on desktop, text left and image right. On
  // mobile the text leads so both CTAs sit above the fold at 375x667 (Revision
  // 6.2, the hard requirement); the framed image follows beneath it.
  const lines = displayLines ?? ['Old Heads.', 'New Game.'];
  return (
    <section data-surface="paper" aria-labelledby="hero-heading" className="bg-paper">
      <div className="hero-home">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <p className="type-label text-on-surface-secondary">{eyebrow}</p>
              </Reveal>
              <h1 id="hero-heading" className="mt-4">
                <Reveal as="span" className="block">
                  <span className="type-display-l block whitespace-nowrap">{lines[0]}</span>
                </Reveal>
                <Reveal as="span" delay={100} className="block">
                  <span className="type-display-l block whitespace-nowrap">{lines[1]}</span>
                </Reveal>
              </h1>
              <Reveal delay={180}>
                <p className="type-body-l mt-6 max-w-[46ch] text-on-surface-secondary">{intro}</p>
              </Reveal>
              <Reveal delay={260}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10 lg:mt-12">
                  <CtaLink
                    href={primaryCta.href}
                    event="cta_hero_click"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    {primaryCta.label}
                  </CtaLink>
                  {secondaryCta && (
                    <CtaLink
                      href={secondaryCta.href}
                      event="cta_hero_click"
                      className="btn btn-secondary w-full sm:w-auto"
                    >
                      {secondaryCta.label}
                    </CtaLink>
                  )}
                </div>
              </Reveal>
              {microLine && (
                <Reveal delay={340}>
                  <p className="type-body-s mt-6 max-w-[52ch] text-on-surface-secondary">
                    {microLine}
                  </p>
                </Reveal>
              )}
            </div>
            <div>
              <InstantFrame
                imageId={imageId}
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                revealDirection="none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Static sentinel at the base of the hero; the sticky CTA observes it to
          know the hero has scrolled out of view. */}
      <div id="header-sentinel" aria-hidden="true" className="h-px w-full" />
    </section>
  );
}
