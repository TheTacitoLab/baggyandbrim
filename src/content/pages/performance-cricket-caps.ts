import type { CommercialPageContent } from '@/types';

// /performance-cricket-caps (build spec Section 13.5). Justifies a specialist for
// what looks like a commodity item. Do not judge its ranking against the others.
// Accent: red. No body paragraph here appears on any other page.

export const performanceCricketCaps: CommercialPageContent = {
  slug: 'performance-cricket-caps',
  intent: 'Buyers of everyday training and travel cricket caps.',
  accent: 'red',
  h1: 'Custom Performance Cricket Caps',
  heroEyebrow: 'Everyday cricket caps',
  heroIntro:
    'Lightweight caps for training, travel and coaching, made in your club colours. The cap that gets worn every week rather than once a season.',
  heroImageId: 'lp-hero-performance',
  primaryCta: { label: 'Start Your Cap Brief', href: '/enquire' },
  secondaryCta: { label: 'Compare with baggy caps', href: '/baggy-cricket-caps' },
  blocks: [
    {
      kind: 'prose',
      heading: 'Built to be worn constantly',
      body: [
        'A performance cap earns its place by being worn. Nets on Tuesday, warm-ups on Saturday, coaching on Sunday morning, the drive to an away ground in between.',
        'That changes what matters. Weight, breathability, how the peak holds its shape after six months, whether the colour survives being left on a dashboard. It also changes how the crest should be applied, since a cap worn weekly gets handled far more than one that lives in a box.',
        'We make them in club colours with your crest, in a modern fit, as part of the same run as your baggy caps and sun hats if you want the whole club to match.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Where performance caps differ from baggy caps',
      body: [
        'A baggy cap is about ceremony. A performance cap is about frequency. One is handed over, the other is packed.',
        'Clubs that order both usually keep the baggy cap for presentation and first-team match days, and give everyone a performance cap for training and travel. It costs less than capping the whole club in wool and it means juniors get something with the crest on it from their first season.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Fit, fabric and finishing',
      body: [
        'We will confirm the construction detail with you rather than promise specifics we have not settled. What is fixed is the part that matters most: club colours matched to your kit, your crest placed where it works, lettering and internal labels as you need them, and one consistent run so every cap in the order matches.',
      ],
    },
    {
      kind: 'imagery',
      heading: 'Performance caps in use',
      surface: 'cream',
      images: [
        { id: 'lp-performance-training', caption: 'Worn at training, week in and week out.' },
        { id: 'lp-performance-detail', caption: 'Peak edge and crest, close up.' },
      ],
    },
    {
      kind: 'useCases',
      heading: 'Who orders performance caps',
      items: [
        'Training and nets',
        'Coaching staff',
        'Travel and tour kit',
        'Junior sections',
        'Club shop stock',
        'Sponsor and supporter caps',
        'Staff caps at events',
      ],
    },
    { kind: 'process', heading: 'How it works' },
    {
      kind: 'quantities',
      heading: 'Quantities',
      intro:
        'Runs start at twelve. Performance caps are the most common whole-club order, so many land in the larger brackets once a club decides everyone should have one.',
    },
  ],
  faqHeading: 'Common questions',
  faqs: [
    {
      question: 'What is the difference between a performance cap and a baggy cap?',
      answer:
        'Weight, shape and purpose. A baggy cap is a soft traditional shape usually reserved for presentation and match identity. A performance cap is lighter, more structured and made to be worn several times a week. Most clubs end up with both.',
      confirmed: true,
    },
    {
      question: 'Can we order them for the whole club?',
      answer:
        'Yes. Performance caps are the most common whole-club order because they suit every age group and get worn year round. Whole-club runs usually land in the 50 to 100 bracket.',
      confirmed: true,
    },
    {
      question: 'Can we sell them in the club shop?',
      answer:
        'Yes. Clubs regularly order a run for members and supporters alongside the squad order. Tell us in the brief if part of the run is for resale, since it changes the size spread we recommend.',
      confirmed: true,
    },
    {
      question: 'What decoration methods are available?',
      // TODO-13: confirm available decoration methods before publication.
      answer:
        'Embroidery is our default. Other options are confirmed on enquiry once we know the artwork and the run size.',
      confirmed: false,
    },
    {
      question: 'Do you make caps for coaches and staff separately?',
      answer:
        'Yes. A small run of staff caps alongside a squad order is straightforward, and clubs often differentiate them with a different colourway or a small addition to the crest.',
      confirmed: true,
    },
    {
      question: 'How long do they take?',
      answer:
        'Selected projects can be delivered from two weeks following design approval. Timing depends on the specification, the quantity and where they are going, and we confirm it once we have seen the brief.',
      confirmed: true,
    },
  ],
  enquiry: {
    heading: 'Start your cap brief',
    line: 'Tell us the colours, the crest and the numbers. We will show you the cap before the whole club gets one.',
  },
};
