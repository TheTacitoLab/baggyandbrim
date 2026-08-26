import Image, { getImageProps } from 'next/image';
import type { SitePhoto } from '@/types';
import { Reveal } from '@/components/ui/Reveal';
import { CtaLink } from '@/components/ui/CtaLink';
import { PolaroidPair } from '@/components/media/PolaroidPair';

interface EditorialHeroProps {
  eyebrow: string;
  displayLines?: [string, string]; // homepage H1, two lines, two words each
  headline: string; // commercial H1 / SEO-bearing line
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microLine?: string;
  /** Reduced (commercial) variant only: the page's main photo, rendered as a
   *  clean portrait inside the shell. */
  image?: SitePhoto;
  /** Reduced variant only: a paired polaroid stack beside the title instead of
   *  a single photo (the range hub uses this). */
  polaroids?: { front: SitePhoto; back: SitePhoto };
  height?: 'full' | 'reduced';
}

// The homepage hero photography. Two crops, art-directed via <picture> so each
// device downloads exactly one file (Next.js image docs, Art direction). The
// h1 carries the message, so both images are decorative (alt="").
const HERO_DESKTOP = '/hero/hero-desktop.png';
const HERO_MOBILE = '/hero/hero-mobile.png';

function HeroPicture() {
  const common = { alt: '', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, width: 2049, height: 1152, src: HERO_DESKTOP });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, width: 1080, height: 1920, src: HERO_MOBILE });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        {...rest}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}

/**
 * The hero. Homepage variant: the photograph runs full bleed below the header
 * and fills the rest of the first viewport. On desktop and tablet the subject
 * sits right of frame, so the copy overlays on the left, aligned to the shell
 * gutters — its left edge lines up with every section heading below. On mobile
 * the image stands alone full screen and the copy follows beneath it.
 *
 * Contrast, measured against the actual pixels behind the desktop copy region
 * (left half of hero-desktop.png): ink text reads at 5.7:1 at the darkest
 * percentile and 9.6:1 at the median, so no scrim is needed and none renders.
 *
 * Commercial variant: paper surface, two columns, the page's own photo inside
 * the shell. Exactly one H1 per page. Content is readable with JavaScript off.
 */
export function EditorialHero({
  eyebrow,
  displayLines,
  headline,
  intro,
  primaryCta,
  secondaryCta,
  microLine,
  image,
  polaroids,
  height = 'full',
}: EditorialHeroProps) {
  if (height === 'reduced') {
    // Commercial hero (build spec 7.1): copy left, the page's photo beside the
    // title on the right, top edges level. A col-span-4 figure in a 12-column
    // grid at gap-6 resolves to the same width as a homepage tile in its
    // 3-column grid at gap-6, so the two render at identical size.
    return (
      <section data-surface="paper" aria-labelledby="hero-heading" className="bg-paper">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 pb-16 pt-8 lg:grid-cols-12 lg:items-start lg:pb-24 lg:pt-12">
            <div className="lg:col-span-7">
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
            {image && (
              <figure className="relative mt-4 aspect-[4/5] w-full overflow-hidden lg:col-span-4 lg:col-start-9 lg:mt-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  preload
                  className="object-cover"
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
              </figure>
            )}
            {polaroids && (
              <div className="mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
                <PolaroidPair front={polaroids.front} back={polaroids.back} />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  const lines = displayLines ?? ['Old Heads.', 'New Game.'];
  const copy = (
    // The lead runs wider on desktop; the h1 has fixed line breaks so it does
    // not reflow (build spec 5.1).
    <div className="max-w-[34ch] lg:max-w-[44ch]">
      <Reveal>
        <p className="type-label">{eyebrow}</p>
      </Reveal>
      <h1 id="hero-heading" className="mt-6">
        <Reveal as="span" className="block">
          <span className="type-display-l block whitespace-nowrap">{lines[0]}</span>
        </Reveal>{' '}
        <Reveal as="span" delay={100} className="block">
          <span className="type-display-l block whitespace-nowrap">{lines[1]}</span>
        </Reveal>
      </h1>
      <Reveal delay={180}>
        <p className="type-body-l mt-6">{intro}</p>
      </Reveal>
      <Reveal delay={260}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CtaLink
            href={primaryCta.href}
            event="cta_hero_click"
            className="btn btn-primary whitespace-nowrap"
          >
            {primaryCta.label}
          </CtaLink>
          {secondaryCta && (
            <CtaLink
              href={secondaryCta.href}
              event="cta_hero_click"
              className="btn btn-secondary whitespace-nowrap"
            >
              {secondaryCta.label}
            </CtaLink>
          )}
        </div>
      </Reveal>
      {microLine && (
        <Reveal delay={340}>
          <p className="type-body-s mt-8">{microLine}</p>
        </Reveal>
      )}
    </div>
  );

  return (
    <section data-surface="paper" aria-labelledby="hero-heading" className="bg-paper">
      {/* The fixed header overlays the top of the page; clearing it here means
          the image starts directly beneath it, no gap and no overlap. */}
      <div className="pt-[var(--header-height)]">
        <div className="relative">
          <div className="relative h-[calc(100svh-var(--header-height))] w-full">
            <HeroPicture />
          </div>
          {/* One copy block, one H1: below the image in flow on mobile, overlaid
              left of the subject from md up. */}
          <div className="md:absolute md:inset-0 md:flex md:items-center">
            <div className="shell w-full pb-14 pt-10 md:py-0">{copy}</div>
          </div>
        </div>
      </div>

      {/* Static sentinel at the base of the hero; the sticky CTA observes it to
          know the hero has scrolled out of view. */}
      <div id="header-sentinel" aria-hidden="true" className="h-px w-full" />
    </section>
  );
}
