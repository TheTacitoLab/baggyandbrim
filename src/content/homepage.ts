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
  // TODO-10: fabric compositions per style. Renders 'Details confirmed on enquiry'.
  { name: 'Fabric choice', detail: null, confirmed: false },
  {
    name: 'Trim and finishing',
    detail: 'Sweatbands, taping, button and eyelet finishing.',
    confirmed: true,
  },
  {
    name: 'Presentation details',
    detail: 'Boxing, tissue, cards and named packaging for presentation runs.',
    confirmed: true,
  },
  // TODO-11: packaging options / custom boxes. Renders 'Details confirmed on enquiry'.
  { name: 'Packaging', detail: null, confirmed: false },
];

export const HOMEPAGE = {
  hero: {
    eyebrow: 'Custom cricket headwear',
    displayLine: 'Old Heads. New Game.',
    headline: 'Custom cricket caps, sun hats and performance headwear',
    intro:
      'Made to order for cricket clubs, schools, organisations and brands. Baggy caps for the ceremony, sun hats for the long days, performance caps for everything in between.',
    primaryCta: { label: 'Start Your Cap Brief', href: '#enquire' },
    secondaryCta: { label: 'Explore the Headwear', href: '#headwear' },
    microLine:
      'Runs from 12 caps. Selected projects delivered from two weeks after design approval.',
    imageId: 'hero-primary',
    detailImageId: 'hero-detail',
  },
  brand: {
    label: 'The idea',
    number: '01',
    headline: 'We only make cricket headwear.',
    body: [
      'Most kit suppliers treat the cap as the last line on the order form. We start there.',
      'Baggy & Brim exists for the caps clubs keep. The one handed over on debut. The one that survives fifteen seasons in the field and three changes of captain. The one that comes out of a drawer at the anniversary dinner and still means something.',
      'The game has moved on. Formats, fabrics, fixtures, all of it. The cap has quietly stayed the same, which is exactly why it still carries weight.',
    ],
    closingLine: 'Old heads, new game. We keep the ceremony and remove the admin.',
    imageId: 'statement-ground',
  },
  headwear: {
    label: 'Headwear',
    number: '02',
    heading: 'Three caps. One club identity.',
    intro:
      'Different days need different headwear. We make all three properly, in your colours, with your crest.',
    categories,
  },
  occasions: {
    label: 'Occasions',
    number: '03',
    heading: 'A cap is rarely just a cap.',
    intro: 'Clubs commission headwear for five reasons. Only one of them is uniform.',
    occasions,
    closingLine: 'If it is worth marking, it is worth putting on a cap.',
    footerLink: { label: 'See how presentation caps work', href: '/cricket-presentation-caps' },
    imageId: 'occasions-honours',
  },
  product: {
    label: 'The cap',
    number: '04',
    heading: 'Specified properly, not picked from a catalogue.',
    intro:
      'Every brief is built from the same set of decisions. Choose as many or as few as you want. We will make the rest sensible.',
    options,
    closingLine: 'If you have a crest, a colour and a number in mind, that is enough to start.',
    imageIdPrimary: 'product-construction',
    imageIdSecondary: 'product-stack',
  },
  characters: {
    label: 'Old heads',
    number: '05',
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
    label: 'Process',
    number: '06',
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
    number: '07',
    heading: 'From a first eleven to a full club.',
    intro: 'Runs start at twelve. Tell us the bracket and we will tell you what is realistic.',
    brackets: VOLUME_BRACKETS,
    note: 'Pricing is confirmed on enquiry, once the specification is clear.',
    imageId: 'volumes-team',
  },
  journal: {
    label: 'Journal',
    number: '08',
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
    label: 'Enquire',
    number: '09',
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
