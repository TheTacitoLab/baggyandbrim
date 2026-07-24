import type { NavItem } from '@/types';

// Primary navigation, five items, in this order (build spec Section 11.1).
// On '/' the header renders `hash` with a smooth-scroll handler; elsewhere it
// renders `href` — the full route for Journal and Enquire, the '/#hash' form for
// the three homepage sections.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Headwear', hash: '#headwear', href: '/#headwear', isRoute: false },
  { label: 'Occasions', hash: '#occasions', href: '/#occasions', isRoute: false },
  { label: 'Process', hash: '#process', href: '/#process', isRoute: false },
  { label: 'Journal', hash: '#journal', href: '/journal', isRoute: true },
  { label: 'Enquire', hash: '#enquire', href: '/enquire', isRoute: true },
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
    label: 'Baggy cricket caps',
    href: '/baggy-cricket-caps',
    description: 'The traditional shape, made for your club.',
  },
  {
    label: 'Cricket sun hats',
    href: '/cricket-sun-hats',
    description: 'Wide brims for full days in the field.',
  },
  {
    label: 'Performance cricket caps',
    href: '/performance-cricket-caps',
    description: 'Lightweight caps for training and travel.',
  },
  {
    label: 'Presentation caps',
    href: '/cricket-presentation-caps',
    description: 'Numbered, named and made to be kept.',
  },
];

export const EXPLORE_LINKS: SiteLink[] = [
  { label: 'Journal', href: '/journal' },
  { label: 'Process', href: '/#process' },
  { label: 'Occasions', href: '/#occasions' },
  { label: 'Start Your Cap Brief', href: '/enquire' },
];

export const HEADER_CTA = {
  label: 'Start Your Cap Brief',
  hash: '#enquire',
  href: '/enquire',
} as const;
