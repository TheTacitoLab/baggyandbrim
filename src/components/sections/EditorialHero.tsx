import Image from 'next/image';
import { getImageAsset } from '@/content/assets/image-manifest';
import { Placeholder } from '@/components/media/Placeholder';
import { Reveal } from '@/components/ui/Reveal';
import { CtaLink } from '@/components/ui/CtaLink';
import { TextLink } from '@/components/ui/TextLink';
import { cn } from '@/lib/utils';

interface EditorialHeroProps {
  eyebrow: string;
  displayLine?: string; // Recoleta line, homepage only
  headline: string; // the SEO-bearing line
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microLine?: string;
  imageId: string;
  detailImageId?: string; // desktop-only overlap image
  height?: 'full' | 'reduced';
}

function HeroImage({ imageId, className }: { imageId: string; className?: string }) {
  const asset = getImageAsset(imageId);
  return (
    <div className={cn('relative overflow-hidden bg-cream', className)}>
      {asset.src ? (
        <Image
          src={asset.src}
          alt={asset.decorative ? '' : asset.alt}
          fill
          sizes="100vw"
          preload
          quality={78}
          className="object-cover"
        />
      ) : (
        <Placeholder asset={asset} />
      )}
    </div>
  );
}

/** The homepage full-bleed hero and the shorter landing-page hero. Exactly one
 *  H1 per page. Content is present and readable with JavaScript disabled; the
 *  entry stagger is applied by the shared reveal system. */
export function EditorialHero({
  eyebrow,
  displayLine,
  headline,
  intro,
  primaryCta,
  secondaryCta,
  microLine,
  imageId,
  detailImageId,
  height = 'full',
}: EditorialHeroProps) {
  if (height === 'reduced') {
    // Landing-page hero: paper surface, image right, not full bleed, 62vh max.
    return (
      <section data-surface="paper" aria-labelledby="hero-heading" className="bg-paper">
        <div className="shell grid grid-cols-1 items-center gap-10 pb-16 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="type-label text-on-surface-secondary">{eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 id="hero-heading" className="type-heading-l mt-5 max-w-[16ch]">
                {headline}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="type-body-l mt-6 max-w-[46ch] text-on-surface-secondary">{intro}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <CtaLink
                  href={primaryCta.href}
                  event="cta_hero_click"
                  className="btn btn-primary"
                >
                  {primaryCta.label}
                </CtaLink>
                {secondaryCta && <TextLink href={secondaryCta.href}>{secondaryCta.label}</TextLink>}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal direction="mask">
              <HeroImage imageId={imageId} className="aspect-[3/2]" />
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  // Homepage hero: full-bleed image with overlaid type on desktop; stacked on mobile.
  return (
    <section aria-labelledby="hero-heading" className="relative isolate bg-paper">
      {/* Image layer: in-flow block on mobile, full-bleed behind on desktop. */}
      <div className="relative h-[55svh] w-full lg:absolute lg:inset-0 lg:h-full">
        <HeroImage imageId={imageId} className="h-full w-full" />
        {/* Scrim from the left, desktop only, so overlaid type stays legible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, rgba(17,17,15,0.55) 0%, rgba(17,17,15,0.2) 45%, rgba(17,17,15,0) 60%)',
          }}
        />
        {detailImageId && (
          <div className="absolute bottom-8 left-8 hidden h-[180px] w-[180px] xl:block">
            <HeroImage imageId={detailImageId} className="h-full w-full" />
          </div>
        )}
      </div>

      {/* Type layer: paper (ink text) on mobile, overlaid (paper text) on desktop. */}
      <div className="shell relative bg-paper py-12 text-ink lg:flex lg:min-h-[92svh] lg:items-center lg:bg-transparent lg:py-0 lg:text-paper">
        <div className="lg:w-7/12 lg:pt-[var(--header-height)]">
          <Reveal>
            <p className="type-label text-grey lg:text-paper/70">{eyebrow}</p>
          </Reveal>
          <h1 id="hero-heading" className="mt-4">
            <Reveal as="span" className="block">
              <span className="type-display-xl block">{displayLine}</span>
            </Reveal>
            <Reveal as="span" delay={120} className="block">
              <span
                className="mt-4 block max-w-[26ch] font-medium"
                style={{ fontSize: 'var(--type-heading-s)', letterSpacing: '0.08em', lineHeight: 1.3 }}
              >
                {headline}
              </span>
            </Reveal>
          </h1>
          <Reveal delay={220}>
            <p className="type-body-l mt-6 max-w-[44ch] text-grey lg:text-paper/80">{intro}</p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <CtaLink
                href={primaryCta.href}
                event="cta_hero_click"
                className="btn w-full bg-ink text-paper sm:w-auto lg:bg-paper lg:text-ink"
              >
                {primaryCta.label}
              </CtaLink>
              {secondaryCta && (
                <TextLink href={secondaryCta.href} className="lg:text-paper">
                  {secondaryCta.label}
                </TextLink>
              )}
            </div>
          </Reveal>
          {microLine && (
            <Reveal delay={400}>
              <p className="type-body-s mt-6 max-w-[48ch] text-grey lg:text-paper/70">{microLine}</p>
            </Reveal>
          )}
        </div>
      </div>

      {/* Sentinel at the base of the hero drives the header transparency swap and
          the sticky CTA's show-after behaviour. */}
      <div id="header-sentinel" aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
