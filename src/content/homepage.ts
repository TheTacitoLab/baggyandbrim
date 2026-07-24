import type { CustomisationOption, HeadwearCategory, Occasion } from '@/types';
import { PROCESS_STEPS, VOLUME_BRACKETS } from '@/content/site';

// All homepage copy (build spec Section 12). Every on-screen string lives here so
// copy can be reviewed without reading JSX. British English throughout.

const categories: HeadwearCategory[] = [
  {
    slug: 'baggy',
    title: 'Baggy Cricket Caps',
    positioning: 'The ceremonial one.',
    body: 'Traditional shapes, club colours, embroidered crests and construction built to be handed over. This is the cap that gets photographed and kept.',
    href: '/baggy-cricket-caps',
    linkLabel: 'View baggy caps',
    imageId: 'category-baggy',
  },
  {
    slug: 'sun-hats',
    title: 'Cricket Sun Hats',
    positioning: 'The long day one.',
    body: 'Wide brims for full sessions in the field. Club identity, sensible protection, and a shape that still looks like cricket.',
    href: '/cricket-sun-hats',
    linkLabel: 'View sun hats',
    imageId: 'category-sunhat',
  },
  {
    slug: 'performance',
    title: 'Performance Cricket Caps',
    positioning: 'The everyday one.',
    body: 'Lightweight caps for training, travel, coaching and the walk from car park to nets. Built to be worn constantly.',
    href: '/performance-cricket-caps',
    linkLabel: 'View performance caps',
    imageId: 'category-performance',
  },
];

const occasions: Occasion[] = [
  {
    name: 'Match',
    number: '01',
    description:
      'Headwear made as part of a playing identity. Same colours, same crest, same look from first change to last over.',
  },
  {
    name: 'Awards',
    number: '02',
    description:
      'Caps that recognise something. Player of the season, a first team debut, the volunteer who has run the bar since 2009.',
  },
  {
    name: 'Milestones',
    number: '03',
    description:
      'Hundredth appearance. Fiftieth season. A tour, a title, a ground move. Caps that put a date on a memory.',
  },
  {
    name: 'Honorary',
    number: '04',
    description:
      'Life members, former captains, sponsors, groundstaff. The people who are part of the club without appearing on the team sheet.',
  },
  {
    name: 'Presentation',
    number: '05',
    description:
      'Caps designed to be given formally and kept permanently. Boxed, numbered, and handed over properly.',
  },
];

// Revision 9.2: six confirmed decisions. Fabric, trim, presentation and
// packaging fold into a single closing sentence rather than four ruled rows,
// two of which were unconfirmed placeholders.
const options: CustomisationOption[] = [
  {
    name: 'Silhouette and cap shape',
    detail: 'Traditional baggy, wide-brim sun hat or performance fit.',
    confirmed: true,
  },
  {
    name: 'Club colours',
    detail: 'Matched to your existing kit, or set from scratch if you are starting again.',
    confirmed: true,
  },
  {
    name: 'Embroidery',
    detail: 'Crests, wordmarks, initials and lettering.',
    confirmed: true,
  },
  {
    name: 'Crest placement',
    detail: 'Front panel, side panel, rear, or under the brim.',
    confirmed: true,
  },
  {
    name: 'Initials and cap numbers',
    detail: 'Individual names, initials or club cap numbers, applied per cap.',
    confirmed: true,
  },
  {
    name: 'Internal labels',
    detail: 'Woven or printed labels inside the cap, including club name and year.',
    confirmed: true,
  },
];

export const HOMEPAGE = {
  hero: {
    eyebrow: 'Custom cricket headwear',
    displayLines: ['Old Heads.', 'New Game.'] as [string, string],
    // Retained for SEO fallbacks; the homepage H1 renders only the display lines.
    headline: 'Custom cricket caps, sun hats and performance headwear',
    intro:
      'Baggy caps, sun hats and performance caps, made to order for cricket clubs, schools and organisations.',
    primaryCta: { label: 'Start Your Cap Brief', href: '#enquire' },
    secondaryCta: { label: 'Explore the Headwear', href: '#headwear' },
    microLine:
      'Runs from 12 caps. Selected projects delivered from two weeks after design approval.',
    imageId: 'hero-primary',
  },
  // Revision 9.1: a held breath between the hero and the product. Mode A, ink.
  brand: {
    heading: 'We only make cricket headwear.',
    body: 'Not kit. Not equipment. The caps clubs keep: handed over on debut, worn for fifteen seasons, brought out again at the anniversary dinner.',
  },
  headwear: {
    heading: 'Three caps. One club identity.',
    intro:
      'Different days need different headwear. We make all three properly, in your colours, with your crest.',
    categories,
    cta: { label: 'See the full range', href: '/custom-cricket-caps' },
  },
  occasions: {
    heading: 'A cap is rarely just a cap.',
    intro: 'Clubs commission headwear for five reasons. Only one of them is uniform.',
    occasions,
    cta: { label: 'See how presentation caps work', href: '/cricket-presentation-caps' },
    imageId: 'occasions-honours',
  },
  product: {
    heading: 'Specified properly, not picked from a catalogue.',
    intro:
      'Every brief is built from the same set of decisions. Choose as many or as few as you want. We will make the rest sensible.',
    options,
    closingLine:
      'Fabric, trim, packaging and presentation details are set once we know what the caps are for.',
    imageIdPrimary: 'product-construction',
    imageIdSecondary: 'product-stack',
  },
  characters: {
    headline: 'One keeps the scorebook. One loses the pencil.',
    body: [
      'Baggy has views on collars, walking before you are given, and the correct way to fold a jumper. Brim has views on tea, and not many others.',
      'They have played together for twenty years and agreed on almost nothing. The caps are the one thing they both take seriously.',
    ],
    captions: [
      'Baggy. Third change. Still convinced he should be opening.',
      'Brim. Deep square leg. Ideally in the shade.',
    ] as [string, string],
    imageId: 'character-scene',
    mobileImageId: 'character-scene-mobile',
  },
  process: {
    heading: 'Four steps. We handle the middle two.',
    steps: PROCESS_STEPS,
    note: 'Timings depend on design approval, product specification, quantity, production capacity and delivery location. We confirm dates once we have seen the brief.',
    closingLine:
      'One point of contact from brief to delivery. You are not managing three suppliers and a courier.',
    cta: { label: 'Start Your Cap Brief', href: '#enquire' },
    imageId: 'process-approval',
  },
  volumes: {
    label: 'Volumes',
    heading: 'From a first eleven to a full club.',
    intro: 'Runs start at twelve. Tell us the bracket and we will tell you what is realistic.',
    brackets: VOLUME_BRACKETS,
    note: 'Pricing is confirmed on enquiry, once the specification is clear.',
    cta: { label: 'Start Your Cap Brief', href: '#enquire' },
    imageId: 'volumes-team',
  },
  journal: {
    label: 'Journal',
    heading: 'The Journal',
    intro:
      'Notes on cap design, club traditions, embroidery, cap numbers, and how to get an order right first time.',
    emptyClosingLine:
      'The first entries are being written. In the meantime, the quickest way to get an answer about a cap is to ask us directly.',
    emptyCta: { label: 'Ask us instead', href: '#enquire' },
    populatedLink: { label: 'Read the Journal', href: '/journal' },
    clusters: [
      { name: 'Baggy caps', line: 'Traditional shapes, cap numbers and the history clubs keep.' },
      {
        name: 'Presentation and recognition',
        line: 'Milestones, awards, honorary caps and how to plan them.',
      },
      {
        name: 'Sun hats and performance',
        line: 'Full days in the field and the caps worn every week.',
      },
      {
        name: 'Ordering and design',
        line: 'Colours, crests, artwork and getting an order right first time.',
      },
    ],
  },
  enquiry: {
    heading: 'Start Your Cap Brief',
    supporting: [
      'Five fields and a date. Tell us what you need and we will come back with options, a specification and a realistic timeline.',
      'If you are not sure what you want yet, say so. That is a normal way to start.',
    ],
    reassurance: [
      'Runs from 12 caps',
      'Design visuals before anything is made',
      'One point of contact throughout',
    ],
  },
} as const;
