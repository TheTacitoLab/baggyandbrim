import type { Metadata } from 'next';
import { SITE } from '@/content/site';

// Per-page SEO copy (build spec Section 17, 19). Titles are stored without the
// brand suffix — the root layout's title.template appends ' | Baggy & Brim'.

export interface PageSeoEntry {
  title: string; // page portion, suffix added by template
  description: string; // 140–158 chars, primary phrase once
  intent: string; // documentation only; one primary search intent
}

export const PAGE_SEO = {
  '/': {
    title: 'Custom Cricket Headwear for Clubs',
    description:
      'Custom baggy caps, presentation caps and wide-brim sun hats for cricket clubs, schools and teams. Made in your colours with your crest. Minimum order 12.',
    intent: 'Brand and category discovery for custom cricket headwear buyers.',
  },
  '/custom-cricket-caps': {
    title: 'Custom Cricket Caps for Clubs',
    description:
      'Custom cricket caps made to order in your club colours with embroidered crests. Baggy caps, presentation caps and wide-brim sun hats. Minimum order 12.',
    intent: 'Broad commercial research into commissioning custom cricket caps.',
  },
  '/baggy-cricket-caps': {
    title: 'Custom Baggy Cricket Caps',
    description:
      'Traditional baggy cricket caps made for your club. Club colours, embroidered crests, cap numbers and names inside. Minimum order 12.',
    intent: 'Club buyers commissioning traditional baggy caps.',
  },
  '/cricket-sun-hats': {
    title: 'Custom Wide-Brim Cricket Sun Hats',
    description:
      'Wide-brim cricket sun hats made in your club colours with your crest embroidered. Squad, junior section and whole-club orders. Minimum order 12.',
    intent: 'Squad and junior-section buyers of custom club sun hats.',
  },
  '/cricket-presentation-caps': {
    title: 'Cricket Presentation Caps',
    description:
      'Presentation caps for debuts, milestones, life memberships and club anniversaries. Numbered, named and made to be kept. Minimum order 12.',
    intent: 'Occasion-driven buyers organising a presentation or milestone.',
  },
  '/journal': {
    title: 'The Journal',
    description:
      'Notes on cricket headwear. Cap design, club traditions, embroidery, cap numbers, and how to get a custom cap order right first time.',
    intent: 'Editorial hub and internal-linking engine.',
  },
  '/enquire': {
    title: 'Start Your Headwear Brief',
    description:
      'Tell us what your club needs and we will come back with options, a specification and a realistic timeline. Custom cricket headwear from a minimum of 12.',
    intent: 'Direct conversion destination for the enquiry form.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How Baggy & Brim handles the information you send through the enquiry form.',
    intent: 'Legal reference.',
  },
  '/terms': {
    title: 'Terms',
    description: 'Terms covering the use of the Baggy & Brim website.',
    intent: 'Legal reference.',
  },
} as const satisfies Record<string, PageSeoEntry>;

export type SeoPath = keyof typeof PAGE_SEO;

interface BuildMetadataArgs {
  path: SeoPath;
  type?: 'website' | 'article';
}

/** Build Next Metadata for a static route from its PAGE_SEO entry. */
export function buildMetadata({ path, type = 'website' }: BuildMetadataArgs): Metadata {
  const entry = PAGE_SEO[path];
  const fullTitle = `${entry.title} | ${SITE.name}`;
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: entry.description,
      url: path,
      siteName: SITE.name,
      locale: 'en_GB',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: entry.description,
    },
  };
}
