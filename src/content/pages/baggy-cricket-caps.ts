import type { CommercialPageContent } from '@/types';

// /baggy-cricket-caps (build spec Section 13.3). Serves commissioning intent
// first, research intent second. Qualifies as club-focused in the H1 and first
// paragraph. Accent: green. No body paragraph here appears on any other page.

export const baggyCricketCaps: CommercialPageContent = {
  slug: 'baggy-cricket-caps',
  intent: 'Club buyers commissioning traditional baggy caps.',
  accent: 'green',
  h1: 'Custom Baggy Cricket Caps',
  heroEyebrow: 'Traditional cricket caps',
  heroIntro:
    'Traditional cricket caps made in your club colours, with your crest embroidered on the front and your cap numbers inside. The cap that gets handed over and kept.',
  heroImageId: 'lp-hero-baggy',
  primaryCta: { label: 'Start Your Cap Brief', href: '/enquire' },
  secondaryCta: { label: 'See how presentation caps work', href: '/cricket-presentation-caps' },
  blocks: [
    {
      kind: 'prose',
      heading: 'What makes a baggy cap a baggy cap',
      body: [
        'The baggy cap is the oldest shape in cricket and the one clubs get most attached to. Soft crown, low profile, short peak, a crest on the front and nothing else competing with it.',
        'We make them to order. You choose the colours, the crest, the placement and what goes inside. Nothing about the cap is fixed except the shape, and even that has more variation than most people expect.',
        'It is the cap clubs use for presentation, for first-team identity and for anything worth marking. Once a club has awarded one, it tends to keep awarding them.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Made for your club',
      body: [
        'A baggy cap only earns its place when it is unmistakably yours. We build each one around your colours and your crest rather than dropping a badge onto a stock cap.',
        'Send us a shirt, a crest file or a photograph of an old cap. We will set the colours, place the crest and confirm every detail on a design visual before a single stitch is made.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Cap numbers and club records',
      body: [
        'Plenty of clubs number their caps. The first player capped is number one, and the sequence runs from there. It turns a cap into a record and gives the club something to maintain.',
        'If you already run a numbering system, we will apply it. If you are starting one, we can add numbers inside the cap or on the rear panel. Clubs starting from scratch usually begin with the current first team and work backwards through the honours board.',
      ],
    },
    {
      kind: 'imagery',
      heading: 'Baggy caps in detail',
      surface: 'cream',
      images: [
        { id: 'lp-baggy-inside', caption: 'The label and cap number sit inside the crown.' },
        { id: 'lp-baggy-presentation', caption: 'Boxed and ready to be handed over.' },
      ],
    },
    {
      kind: 'useCases',
      heading: 'When clubs commission baggy caps',
      items: [
        'First-team caps',
        'Debut presentations',
        'Life membership',
        'Anniversary editions',
        'Touring parties',
        'Captain and committee caps',
      ],
    },
    { kind: 'process', heading: 'How it works' },
    {
      kind: 'quantities',
      heading: 'Quantities',
      intro:
        'Runs start at twelve, which covers a first team and a committee. Clubs that number caps often reorder in small batches each season as new players are capped.',
    },
  ],
  faqHeading: 'Common questions',
  faqs: [
    {
      question: 'What is a baggy cricket cap?',
      answer:
        'A soft-crowned cricket cap with a low profile and a short peak, traditionally in wool or a wool blend, with the club crest embroidered on the front. It is the shape most people picture when they think of a cricket cap, and it is worn as much for identity as for shade.',
      confirmed: true,
    },
    {
      question: 'Can you put cap numbers on them?',
      answer:
        'Yes. Numbers can be embroidered inside the cap, on the rear panel or on the internal label. Tell us in the brief whether you are continuing an existing sequence or starting one, and we will set it up so future orders carry on from the right number.',
      confirmed: true,
    },
    {
      question: 'Can each cap have a different name or initials?',
      answer:
        'Yes. Individual names, initials or numbers can be applied per cap. Send the list with your brief and we will confirm placement on the design visual before anything is made.',
      confirmed: true,
    },
    {
      question: 'What are they made from?',
      // TODO-10: confirm fabric composition for baggy caps before publication.
      // Do not publish this answer until the specification is confirmed.
      answer:
        'Fabric options are confirmed on enquiry, since the right choice depends on whether the caps are for presentation or regular play.',
      confirmed: false,
    },
    {
      question: 'Can you match a cap we already have?',
      answer:
        'Usually. Send a photograph of the existing cap, ideally alongside something for scale, and tell us what you want to keep and what you want to change. Clubs often want the same shape with a corrected crest or a cleaner colour.',
      confirmed: true,
    },
    {
      question: 'Are they suitable for playing in, or just for presentation?',
      answer:
        'Both. Some clubs award one cap and expect it to be worn, others produce a presentation cap that lives in a box and a separate set for the field. Tell us which you are doing, because it changes what we recommend.',
      confirmed: true,
    },
  ],
  enquiry: {
    heading: 'Start your cap brief',
    line: 'Send us the crest, the colours and the numbers. We will show you the cap on a visual before it is made.',
  },
};
