import type { HatType, ProcessStep, VolumeBracket } from '@/types';

// Brand constants and unresolved placeholders. A single search for `TODO_` finds
// every placeholder awaiting a real value (build spec Section 10.5). Null values
// render as hidden 'Coming soon' text — never as broken links or invented data.

export const SITE = {
  name: 'Baggy & Brim',
  namePlain: 'Baggy and Brim', // where an ampersand would break a URL, filename or field
  tagline: 'Old Heads. New Game.',
  domain: 'baggyandbrim.com',
  description: 'Custom cricket headwear for clubs, organisations, events and brands.',
  descriptionLong:
    'Custom cricket headwear for clubs, organisations, events and brands. Baggy caps, sun hats and performance caps, made to order in your colours.',
} as const;

export interface ContactDetails {
  email: string | null; // TODO_CONTACT_EMAIL (TODO-02)
  instagram: string | null; // TODO_SOCIAL_INSTAGRAM (TODO-03)
  linkedin: string | null; // TODO_SOCIAL_LINKEDIN (TODO-03)
}

// TODO-02 / TODO-03: supplied by client. Do not invent. Null keeps items hidden.
export const CONTACT: ContactDetails = {
  email: null,
  instagram: null,
  linkedin: null,
};

// TODO-04: registered company details for the footer and terms. Null renders nothing.
export const COMPANY = {
  registeredDetails: null as string | null, // TODO_COMPANY_DETAILS
  copyrightYear: 2026,
};

// The only permitted formulation of the timeline (Section 8 / Section 12 Process).
export const DELIVERY_CLAIM =
  'Selected projects can be delivered from two weeks following design approval.';

// Shared, reused across the homepage, the enquiry form and every commercial page.
export const HAT_TYPES = [
  'Baggy Cricket Caps',
  'Cricket Sun Hats',
  'Performance Cricket Caps',
  'Not Sure Yet',
] as const satisfies readonly HatType[];

export const VOLUME_BRACKETS: VolumeBracket[] = [
  {
    value: '12–24',
    display: '12 to 24',
    description:
      'A team, a squad, a presentation run or a committee. The usual starting point for a first order.',
  },
  {
    value: '25–49',
    display: '25 to 49',
    description: 'Firsts and seconds together, a tour party, a coaching group or a small event.',
  },
  {
    value: '50–100',
    display: '50 to 100',
    description: 'Whole-club orders, junior sections, anniversary runs and member editions.',
  },
  {
    value: '100+',
    display: '100 or more',
    description:
      'Organisations, schools, leagues, festivals, brands and collaborations. Worth starting the conversation early.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Fill Out a Brief',
    description:
      'Tell us the style, the quantity, the colours and the date it needs to exist by. One form, five minutes. No account, no phone tag.',
    compactDescription: 'Style, quantity, colours and the date it needs to exist by. Five minutes.',
  },
  {
    number: '02',
    title: 'Design + Approval',
    description:
      'We turn the brief into a visual of the actual cap. Crest placement, colours, embroidery, labels, numbers. Change what you want and approve when it is right.',
    compactDescription: 'A visual of the actual cap. Change what you want, approve when it is right.',
  },
  {
    number: '03',
    title: 'Production',
    description:
      'Approved artwork goes into production with the specification locked, so what you signed off is what gets made. We keep you posted at the points that matter.',
    compactDescription: 'Specification locked, so what you signed off is what gets made.',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'Caps arrive packed and ready to hand out, present or sell. Selected projects can be delivered from two weeks following design approval.',
    compactDescription: 'Packed and ready to hand out, present or sell.',
  },
];
