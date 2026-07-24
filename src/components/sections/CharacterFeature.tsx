import { HOMEPAGE } from '@/content/homepage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';

const { characters } = HOMEPAGE;

/**
 * Section 7. The one illustration-led moment. Full-bleed cream interruption.
 * The core site must work with this section removed, so it sells nothing and
 * carries no CTA. Character artwork here is content, not decoration.
 */
export function CharacterFeature() {
  return (
    <section
      data-surface="cream"
      aria-labelledby="characters-heading"
      className="bg-cream text-on-surface"
    >
      <div className="shell pt-[calc(var(--section-pad))]">
        <SectionLabel number={characters.number}>{characters.label}</SectionLabel>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="characters-heading" className="type-display-l max-w-[18ch]">
              {characters.headline}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:self-end">
            {characters.body.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={index * 90} className="type-body-s max-w-[36ch]">
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed illustration: a dedicated 4:5 asset on mobile, 16:9 on desktop. */}
      <div className="mt-12 lg:hidden">
        <ImageReveal imageId={characters.mobileImageId} sizes="100vw" quality={100} />
      </div>
      <div className="mt-12 hidden lg:block">
        <ImageReveal imageId={characters.imageId} sizes="100vw" quality={100} />
      </div>

      <div className="shell pb-[calc(var(--section-pad))] pt-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <p className="type-label text-on-surface-secondary">{characters.captions[0]}</p>
          <p className="type-label text-on-surface-secondary sm:text-right">
            {characters.captions[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
