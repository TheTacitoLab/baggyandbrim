import type { NavItem } from '@/types';

// Primary navigation: the three products, then the Journal (build spec Section
// 11.1, revised). Product-led so the range is legible in seconds; the enquiry
// CTA sits separately as the header button.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Baggy Caps', href: '/baggy-cricket-caps' },
  { label: 'Presentation Caps', href: '/cricket-presentation-caps' },
  { label: 'Wide-Brim Sun Hats', href: '/cricket-sun-hats' },
  { label: 'Journal', href: '/journal' },
];

export interface SiteLink {
  label: string;
  href: string;
  description?: string;
}

// Every commercial page, reachable by a crawlable HTML link from the footer of
// every page (Section 11.1). Descriptions are reused by the related-headwear row.
export const COMMERCIAL_LINKS: SiteLink[] = [
  {
    label: 'Custom cricket caps',
    href: '/custom-cricket-caps',
    description: 'The full range and where to start.',
  },
  {
    label: 'Baggy caps',
    href: '/baggy-cricket-caps',
    description: 'The traditional shape, made for your club.',
  },
  {
    label: 'Presentation caps',
    href: '/cricket-presentation-caps',
    description: 'Structured caps for presentation, touring and club use.',
  },
  {
    label: 'Wide-brim sun hats',
    href: '/cricket-sun-hats',
    description: 'Wide brims for full days in the field.',
  },
];

export const EXPLORE_LINKS: SiteLink[] = [
  { label: 'Journal', href: '/journal' },
  { label: 'Process', href: '/#process' },
  { label: 'Start Your Headwear Brief', href: '/enquire' },
];

export const HEADER_CTA = {
  label: 'Start Your Headwear Brief',
  hash: '#enquire',
  href: '/enquire',
} as const;
