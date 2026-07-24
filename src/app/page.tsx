import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { HOMEPAGE } from '@/content/homepage';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { HeadwearCategories } from '@/components/sections/HeadwearCategories';
import { OccasionGrid } from '@/components/sections/OccasionGrid';
import { ProductDetail } from '@/components/sections/ProductDetail';
import { CharacterFeature } from '@/components/sections/CharacterFeature';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { VolumeSelector } from '@/components/sections/VolumeSelector';
import { JournalPreview } from '@/components/sections/JournalPreview';
import { EnquirySection } from '@/components/sections/EnquirySection';

export const metadata: Metadata = buildMetadata({ path: '/' });

// Surface sequence, top to bottom (build spec Section 12):
// paper, paper, paper, cream, paper, cream, paper, paper, paper, ink, ink.
export default function HomePage() {
  const { hero, process, volumes } = HOMEPAGE;
  return (
    <>
      <EditorialHero
        eyebrow={hero.eyebrow}
        displayLine={hero.displayLine}
        headline={hero.headline}
        intro={hero.intro}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        microLine={hero.microLine}
        imageId={hero.imageId}
        detailImageId={hero.detailImageId}
        height="full"
      />
      <BrandStatement />
      <HeadwearCategories />
      <OccasionGrid />
      <ProductDetail />
      <CharacterFeature />
      <ProcessSteps
        label={process.label}
        number={process.number}
        heading={process.heading}
        steps={process.steps}
        variant="full"
        note={process.note}
        closingLine={process.closingLine}
        imageId={process.imageId}
        cta={process.cta}
      />
      <VolumeSelector
        label={volumes.label}
        number={volumes.number}
        heading={volumes.heading}
        intro={volumes.intro}
        brackets={volumes.brackets}
        note={volumes.note}
        imageId={volumes.imageId}
      />
      <JournalPreview />
      <EnquirySection />
    </>
  );
}
