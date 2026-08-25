import type { Metadata } from 'next';
import { buildMetadata } from '@/content/seo';
import { HOMEPAGE } from '@/content/homepage';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { HeadwearCategories } from '@/components/sections/HeadwearCategories';
import { Customisation } from '@/components/sections/Customisation';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { SeoContent } from '@/components/sections/SeoContent';
import { EnquirySection } from '@/components/sections/EnquirySection';

export const metadata: Metadata = buildMetadata({ path: '/' });

// Surface ladder, top to bottom: paper, paper, cream, ink, paper, cream, ink, ink.
// Narrative order: what we make → how it is customised → who we are → how it
// works → search-focused explanation → the brief.
export default function HomePage() {
  const { hero, process } = HOMEPAGE;
  return (
    <>
      <EditorialHero
        eyebrow={hero.eyebrow}
        displayLines={hero.displayLines}
        headline={hero.headline}
        intro={hero.intro}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        microLine={hero.microLine}
        imageId={hero.imageId}
        height="full"
      />
      <HeadwearCategories />
      <Customisation />
      <BrandStatement />
      <ProcessSteps
        heading={process.heading}
        steps={process.steps}
        variant="full"
        note={process.note}
        closingLine={process.closingLine}
        cta={process.cta}
      />
      <SeoContent />
      <EnquirySection />
    </>
  );
}
