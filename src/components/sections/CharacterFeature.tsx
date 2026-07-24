import { HOMEPAGE } from '@/content/homepage';
import { ImageReveal } from '@/components/media/ImageReveal';
import { Reveal } from '@/components/ui/Reveal';

const { characters } = HOMEPAGE;

/**
 * Characters (surface: cream). The one illustration-led moment, moved below the
 * commercial run (Revision 9). Mode A: centred headline and short body. The
 * illustration is line art on a flat surface, so it stays unframed (Revision
 * 8.5) and sits inside the page container. It sells nothing and carries no CTA.
 */
export function CharacterFeature() {
  return (
    <section
      data-surface="cream"
      aria-labelledby="characters-heading"
      className="bg-cream text-on-surface"
    >
      <div className="shell section-pad">
        <div className="mx-auto max-w-[52ch] text-center">
          <Reveal>
            <h2 id="characters-heading" className="type-display-m">
              {characters.headline}
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4">
            {characters.body.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={index * 90} className="type-body-l text-on-surface-secondary">
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Unframed illustration: a dedicated 4:5 asset on mobile, 16:9 on desktop. */}
        <div className="mt-8 md:mt-12 lg:hidden">
          <ImageReveal imageId={characters.mobileImageId} sizes="100vw" quality={100} />
        </div>
        <div className="mt-8 md:mt-12 hidden lg:block">
          <ImageReveal imageId={characters.imageId} sizes="(max-width: 1439px) 100vw, 1312px" quality={100} />
        </div>

        <div className="mt-6 flex flex-col gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="type-label text-on-surface-secondary">{characters.captions[0]}</p>
          <p className="type-label text-on-surface-secondary sm:text-right">{characters.captions[1]}</p>
        </div>
      </div>
    </section>
  );
}
