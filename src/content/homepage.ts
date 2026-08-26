import type { CustomisationOption, HeadwearCategory } from '@/types';
import { ORDER_DETAIL_CLAIM, PROCESS_STEPS } from '@/content/site';
import { PRODUCT_PHOTOS } from '@/content/products';

// All homepage copy (build spec Section 12). Every on-screen string lives here so
// copy can be reviewed without reading JSX. British English throughout.

const categories: HeadwearCategory[] = [
  {
    slug: 'baggy',
    title: 'Baggy Caps',
    body: 'Custom baggy cricket caps using club colours, crests and bespoke detailing.',
    href: '/baggy-cricket-caps',
    image: PRODUCT_PHOTOS.baggy,
  },
  {
    slug: 'presentation',
    title: 'Presentation Caps',
    body: 'Premium structured caps for presentation, touring, travel and club use.',
    href: '/cricket-presentation-caps',
    image: PRODUCT_PHOTOS.presentation,
  },
  {
    slug: 'sun-hats',
    title: 'Wide-Brim Sun Hats',
    body: 'Custom cricket sun hats made in club colours with embroidery and bespoke detailing.',
    href: '/cricket-sun-hats',
    image: PRODUCT_PHOTOS.sunHat,
  },
];

const options: CustomisationOption[] = [
  {
    name: 'Club colours',
    detail: 'Matched to your existing kit, or set from scratch if you are starting again.',
    confirmed: true,
  },
  {
    name: 'Embroidered crests',
    detail: 'Your crest or club logo, redrawn for embroidery where needed.',
    confirmed: true,
  },
  {
    name: 'Crest placement',
    detail: 'Front panel, side panel, rear, or under the brim.',
    confirmed: true,
  },
  {
    name: 'Initials and cap numbers',
    detail: 'Individual names, initials or club cap numbers, applied per piece.',
    confirmed: true,
  },
  {
    name: 'Bespoke trims',
    detail: 'Sweatbands, taping and finishing chosen to match your colours.',
    confirmed: true,
  },
  {
    name: 'Internal labels',
    detail: 'Woven or printed labels inside, including club name and year.',
    confirmed: true,
  },
];

export const HOMEPAGE = {
  hero: {
    eyebrow: 'Custom cricket headwear',
    displayLines: ['Old Heads.', 'New Game.'] as [string, string],
    // Retained for SEO fallbacks; the homepage H1 renders only the display lines.
    headline: 'Custom cricket headwear for clubs, schools and teams',
    intro:
      'Custom Baggy Caps, Presentation Caps and Wide-Brim Sun Hats for cricket clubs, schools and teams. Made in your colours and finished with your crest.',
    primaryCta: { label: 'Start Your Headwear Brief', href: '#enquire' },
    secondaryCta: { label: 'Explore the Headwear', href: '#headwear' },
    microLine: ORDER_DETAIL_CLAIM,
  },
  headwear: {
    heading: 'The Headwear',
    intro: 'Three products, made properly, in your colours, with your crest.',
    categories,
  },
  customisation: {
    heading: 'Custom for Your Club',
    intro:
      'Nothing here is pulled from stock. Every piece is made to order around your club, from the colours to the label inside.',
    options,
    closingLine: 'Your club. Your colours. Your headwear.',
  },
  // A held breath between the commercial sections. Mode A, ink.
  brand: {
    heading: 'We only make cricket headwear.',
    body: 'Not kit. Not equipment. The caps and hats clubs keep: handed over on debut, worn for fifteen seasons, brought out again at the anniversary dinner.',
  },
  process: {
    heading: 'Four steps. We handle the middle two.',
    steps: PROCESS_STEPS,
    note: 'Timings depend on design approval, product specification, quantity, production capacity and delivery location. We confirm dates once we have seen the brief.',
    closingLine:
      'One point of contact from brief to delivery. You are not managing three suppliers and a courier.',
    cta: { label: 'Start Your Headwear Brief', href: '#enquire' },
  },
  // Search-focused explanation of what we make and who we make it for (brief
  // Section 10). Sits apart from the shorter editorial copy above it.
  seoContent: {
    heading: 'Custom Cricket Caps & Headwear for Clubs and Teams',
    body: [
      'Baggy & Brim is a specialist cricket headwear manufacturer. We design and make custom cricket caps, custom baggy cricket caps, cricket presentation caps and wide-brim cricket sun hats for clubs and teams that want their headwear made around their own identity rather than picked from a catalogue.',
      'The range covers three products. Custom baggy cricket caps, embroidered with the club crest and built to be handed over and kept. Custom presentation caps, structured and finished for awards evenings, touring sides, officials and club use. And custom cricket sun hats with wide brims, made in club colours for long days in the field.',
      'Every order is custom. Colour matching to existing kit, embroidered crests, club logos, initials and bespoke trims are all part of the brief, so cricket caps with a club logo or cricket hats with a club crest arrive looking like they belong to the club that ordered them.',
      'We make cricket club caps and custom cricket headwear for grassroots and village clubs, Premier League clubs, schools, universities, academies, touring sides, representative teams and cricket organisations across the UK. The minimum order is twelve, which suits a single team as well as a whole club.',
      'If you are looking for custom cricket caps in the UK, embroidered cricket caps, custom presentation caps or bespoke cricket headwear for your club, school or team, start a headwear brief below.',
    ],
  },
  // Consumed by the /journal empty state only; the homepage carries no journal
  // section.
  journal: {
    emptyClosingLine:
      'The first entries are being written. In the meantime, the quickest way to get an answer about headwear is to ask us directly.',
    clusters: [
      { name: 'Baggy caps', line: 'Traditional shapes, cap numbers and the history clubs keep.' },
      {
        name: 'Presentation and recognition',
        line: 'Milestones, awards, honorary caps and how to plan them.',
      },
      {
        name: 'Sun hats',
        line: 'Wide brims, full days in the field and club identity.',
      },
      {
        name: 'Ordering and design',
        line: 'Colours, crests, artwork and getting an order right first time.',
      },
    ],
  },
  enquiry: {
    heading: 'Start Your Headwear Brief',
    supporting: [
      'Five fields and a date. Tell us what you need and we will come back with options, a specification and a realistic timeline.',
      'If you are not sure what you want yet, say so. That is a normal way to start.',
    ],
    reassurance: [
      'Minimum order 12',
      'Design visuals before anything is made',
      'One point of contact throughout',
    ],
  },
} as const;
