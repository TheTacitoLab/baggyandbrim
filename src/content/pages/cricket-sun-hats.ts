import type { CommercialPageContent } from '@/types';

// /cricket-sun-hats (build spec Section 13.4). Clear immediately that these are
// custom club hats, not off-the-shelf stock. No sun-protection rating is claimed
// (TODO-14). Accent: green. No body paragraph here appears on any other page.

export const cricketSunHats: CommercialPageContent = {
  slug: 'cricket-sun-hats',
  intent: 'Squad and junior-section buyers of custom club sun hats.',
  accent: 'green',
  h1: 'Custom Cricket Sun Hats for Clubs',
  heroEyebrow: 'Custom club sun hats',
  heroIntro:
    'Wide-brim cricket hats made in your club colours with your crest on the front. Ordered for squads, junior sections and anyone spending a full day in the field.',
  heroImageId: 'lp-hero-sunhat',
  primaryCta: { label: 'Start Your Cap Brief', href: '/enquire' },
  secondaryCta: { label: 'See performance caps', href: '/performance-cricket-caps' },
  blocks: [
    {
      kind: 'prose',
      heading: 'Made for your club, not bought off a shelf',
      body: [
        'A cricket sun hat has one job in the field and another in the clubhouse. It has to keep the sun off through a full session, and it has to look like it belongs to your club rather than to whoever had stock that week.',
        'We make them to order. Your colours, your crest, your sizing across the squad, produced as one run so the whole side matches.',
        'Junior sections are the most common starting point, usually because a club has decided that every player in the field should have one.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Brim, fit and shape',
      body: [
        'Brim width changes the character of the hat more than anything else. A wider brim gives more shade and reads as traditional cricket. A narrower brim is easier to wear in wind and under a helmet bag on the way to the ground.',
        'Fit matters more on sun hats than on caps, because they are worn for longer stretches. Tell us the age range and the squad size in your brief and we will advise on sizing.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Colours and crest placement',
      body: [
        'The front panel is the natural home for a crest, but it is not the only option. The side, the rear and the underside of the brim all work, and clubs often split the club name and a year across two of them.',
        'Colours come from whatever you already use. Send a shirt or a crest file and we will hold them across the whole run, so the squad reads as one side rather than a set of near-misses.',
      ],
    },
    {
      kind: 'imagery',
      heading: 'Sun hats in the field',
      surface: 'cream',
      images: [
        { id: 'lp-sunhat-field', caption: 'Worn through a full session at the boundary.' },
        { id: 'lp-sunhat-detail', caption: 'Brim stitching and crest, close up.' },
      ],
    },
    {
      kind: 'useCases',
      heading: 'Who orders club sun hats',
      items: [
        'Junior and academy sections',
        'Whole-squad fielding kit',
        "Women's and men's senior teams",
        'Coaching staff',
        'Club tours to hot countries',
        'Cricket festivals',
      ],
    },
    { kind: 'process', heading: 'How it works' },
    {
      kind: 'quantities',
      heading: 'Quantities',
      intro:
        'Runs start at twelve. A junior section usually lands in the middle brackets, and a whole-club order often reaches the larger ones.',
    },
  ],
  faqHeading: 'Common questions',
  faqs: [
    {
      question: 'Can we order sun hats and caps in the same run?',
      answer:
        'Yes. Ordering both together keeps the colours and the crest consistent across the club, which is harder to achieve if you buy them separately a season apart.',
      confirmed: true,
    },
    {
      question: 'What sizes do you offer?',
      // TODO-12: confirm size range and whether adjustable sizing is available.
      answer:
        'Sizing is confirmed on enquiry. Tell us the age range and squad size in your brief and we will set out the options.',
      confirmed: false,
    },
    {
      question: 'Do you make sun hats for junior sections?',
      answer:
        'Yes, and it is one of the most common orders we see. Junior runs usually cover a wider size range than senior squads, so tell us the age groups in your brief.',
      confirmed: true,
    },
    {
      question: 'Can the crest go anywhere other than the front?',
      answer:
        'Yes. Front panel is standard, but the side, the rear and the underside of the brim all work. Clubs sometimes put the club name on the front and initials or a year on the side.',
      confirmed: true,
    },
    {
      question: 'How many do we need to order?',
      answer:
        'Runs start at twelve. A junior section usually lands in the 25 to 49 bracket, and a whole-club order often reaches 50 to 100.',
      confirmed: true,
    },
    {
      question: 'How long do they take?',
      answer:
        'Selected projects can be delivered from two weeks following design approval. If you are ordering for the start of a season, start the brief before the season plan is finalised rather than after.',
      confirmed: true,
    },
  ],
  enquiry: {
    heading: 'Start your cap brief',
    line: 'Tell us the squad, the age range and your colours. We will set the sizing and show you the hat before it is made.',
  },
};
