import type { CommercialPageContent } from '@/types';

// /custom-cricket-caps — the commercial hub (build spec Section 13.2).
// Broad commercial intent, routes to the three styles. Accent: green.
// No body paragraph here appears on any other page.

export const customCricketCaps: CommercialPageContent = {
  slug: 'custom-cricket-caps',
  intent: 'Broad commercial research into commissioning custom cricket caps.',
  accent: 'green',
  h1: 'Custom Cricket Caps for Clubs, Schools and Organisations',
  heroEyebrow: 'Custom cricket headwear',
  heroIntro:
    'Baggy caps, sun hats and performance caps, made to order in your club colours with your crest embroidered where you want it. Runs start at twelve.',
  heroImageId: 'lp-hero-custom',
  primaryCta: { label: 'Start Your Cap Brief', href: '/enquire' },
  secondaryCta: { label: 'See how the process works', href: '/#process' },
  blocks: [
    {
      kind: 'prose',
      heading: 'What we make',
      body: [
        'A custom cricket cap is a specification, not a product code. Shape, colour, crest, placement, lettering, lining, label. Get those right and the cap looks like it belongs to your club rather than to a catalogue.',
        'We make three styles and nothing else. That is the whole business. Every brief goes through the same route: you tell us what you need, we send a visual of the actual cap, you approve it, and we make it.',
        'Most clubs come to us with a crest, a set of colours and a date. That is enough to start.',
      ],
    },
    {
      kind: 'comparison',
      heading: 'Choosing between the three styles',
      rows: [
        {
          style: 'Baggy caps',
          bestFor: 'Presentation, awards, first-team identity, club tradition',
          character: 'Traditional shape, wool blend feel, ceremonial weight',
          href: '/baggy-cricket-caps',
          linkLabel: 'Baggy caps',
        },
        {
          style: 'Sun hats',
          bestFor: 'Long days in the field, whole-squad protection, juniors',
          character: 'Wide brim, practical, unmistakably cricket',
          href: '/cricket-sun-hats',
          linkLabel: 'Sun hats',
        },
        {
          style: 'Performance caps',
          bestFor: 'Training, travel, coaching, everyday club wear',
          character: 'Lightweight, modern fit, worn constantly',
          href: '/performance-cricket-caps',
          linkLabel: 'Performance caps',
        },
      ],
    },
    {
      kind: 'imagery',
      heading: 'Custom cricket caps in detail',
      surface: 'cream',
      images: [
        { id: 'lp-custom-crest', caption: 'Embroidery worked into a front panel.' },
        { id: 'lp-custom-club', caption: 'Made for a specific club, in its colours.' },
      ],
    },
    {
      kind: 'options',
      heading: 'What you can customise',
      intro:
        'Everything that makes the cap yours is a decision on the brief. Choose the ones that matter and we will make the rest sensible.',
      options: [
        {
          name: 'Style',
          detail: 'Baggy, sun hat or performance, or a mix of all three across one order.',
          confirmed: true,
        },
        {
          name: 'Club colours',
          detail: 'Set from a shirt, a crest file or a colour reference you already have.',
          confirmed: true,
        },
        {
          name: 'Crest and placement',
          detail: 'Front, side, rear or under the brim, at the size the shape can carry.',
          confirmed: true,
        },
        {
          name: 'Lettering and numbers',
          detail: 'Names, initials and club cap numbers applied per cap.',
          confirmed: true,
        },
        {
          name: 'Internal labels',
          detail: 'Woven club name and year sewn inside the cap.',
          confirmed: true,
        },
        {
          name: 'Finishing',
          detail: 'Sweatbands, taping and button finishing chosen to match.',
          confirmed: true,
        },
      ],
    },
    {
      kind: 'useCases',
      heading: 'Who orders custom cricket caps',
      items: [
        'Cricket clubs',
        'School and university sides',
        'Academies and coaching groups',
        'Leagues and county organisations',
        'Touring teams',
        'Cricket festivals and charity days',
        'Brands producing cricket product',
      ],
    },
    { kind: 'process', heading: 'How it works' },
    {
      kind: 'quantities',
      heading: 'How many caps do you need?',
      intro:
        'Runs start at twelve. A first order usually sits in the smaller brackets and grows once a club sees the result.',
    },
  ],
  faqHeading: 'Common questions',
  faqs: [
    {
      question: 'What is the minimum order for custom cricket caps?',
      answer:
        'Runs start at twelve caps. That covers a squad, a presentation run or a committee. Larger runs are straightforward, and we work in brackets of 12 to 24, 25 to 49, 50 to 100 and 100 or more.',
      confirmed: true,
    },
    {
      question: 'Can you match our existing club colours?',
      answer:
        'Yes. Send us anything you have: a photograph of your current kit, a shirt, a crest file or a colour reference. If your colours have drifted across suppliers over the years, we will agree one set with you and hold it for future orders.',
      confirmed: true,
    },
    {
      question: 'What artwork do you need for the crest?',
      answer:
        'A vector file is ideal. If you only have a photograph or a low-resolution image, tell us in the brief. Redrawing a crest for embroidery is normal and we will confirm what is needed once we have seen it.',
      confirmed: true,
    },
    {
      question: 'How long does an order take?',
      answer:
        'Selected projects can be delivered from two weeks following design approval. The real answer depends on the style, the quantity, the complexity of the artwork and where it is going. We confirm dates once we have seen the brief rather than quoting a number we cannot stand behind.',
      confirmed: true,
    },
    {
      question: 'Can we order more than one style at once?',
      answer:
        'Yes, and most clubs do. Baggy caps for presentation, sun hats for the field and performance caps for training is a common combination. Select more than one style in the brief form.',
      confirmed: true,
    },
    {
      question: 'Do you supply other teamwear?',
      answer:
        'No. We make cricket headwear. If you need shirts and trousers as well, we will work alongside whoever supplies them and match colours where we can.',
      confirmed: true,
    },
  ],
  enquiry: {
    heading: 'Start your cap brief',
    line: 'Tell us the style, the colours and the date. We will come back with options and a realistic timeline.',
  },
};
