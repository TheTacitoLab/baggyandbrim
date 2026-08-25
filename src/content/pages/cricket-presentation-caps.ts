import type { CommercialPageContent } from '@/types';

// /cricket-presentation-caps (build spec Section 13.6). Low volume, highest value
// and highest intent on the site. Tone note: humour is off this page entirely.
// Accent: red. No body paragraph here appears on any other page.

export const cricketPresentationCaps: CommercialPageContent = {
  slug: 'cricket-presentation-caps',
  intent: 'Occasion-driven buyers organising a presentation or milestone.',
  accent: 'red',
  h1: 'Cricket Presentation Caps for Milestones, Awards and Honorary Members',
  heroEyebrow: 'Milestones and awards',
  heroIntro:
    'Caps made to be handed over and kept. Numbered, named and boxed, for debuts, milestones, life memberships and club anniversaries.',
  heroImageId: 'lp-hero-presentation',
  primaryCta: { label: 'Start Your Headwear Brief', href: '/enquire' },
  secondaryCta: { label: 'See baggy caps', href: '/baggy-cricket-caps' },
  blocks: [
    {
      kind: 'prose',
      heading: 'Caps that mark something',
      body: [
        'Presentation caps are the reason most clubs eventually call a specialist. A squad order can be tidied up next season. A cap handed to a life member in front of two hundred people cannot.',
        'These runs are usually small, often fewer than twenty, and almost always tied to a date: a dinner, an anniversary, a final home game. The work is in the detail rather than the volume.',
        'We build these briefs backwards from the date and forwards from the name that goes inside the cap.',
      ],
    },
    {
      kind: 'useCases',
      heading: 'What clubs award caps for',
      items: [
        'First-team debut',
        'Hundredth appearance',
        'Five hundred wickets or ten thousand runs',
        'Captaincy',
        'Life membership',
        'Long service by volunteers and groundstaff',
        'Club anniversaries',
        'Tour parties',
        'Championship-winning sides',
        'Retirement',
        'Memorial caps',
      ],
    },
    {
      kind: 'prose',
      heading: 'Numbering, naming and dating',
      body: [
        'Three details do most of the emotional work: the number, the name and the year.',
        "A cap number places a player in the club's history. A name inside the cap makes it theirs rather than a spare. A year gives it a fixed point, which matters twenty seasons later when nobody remembers which summer it was.",
        'If your club has never numbered caps, this is the natural moment to start. Working backwards through the honours board is a job, but clubs that do it rarely regret it.',
      ],
    },
    {
      kind: 'imagery',
      heading: 'Presentation caps in detail',
      surface: 'cream',
      images: [
        { id: 'lp-presentation-box', caption: 'Boxed with a named card.' },
        { id: 'lp-presentation-number', caption: 'The cap number, embroidered inside.' },
      ],
    },
    {
      kind: 'prose',
      heading: 'Presentation and packaging',
      // TODO-11: confirm available presentation packaging, boxes, cards and inserts.
      body: [
        'Presentation options including boxing and named cards are confirmed on enquiry, since they depend on the run size and the occasion.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Planning around a fixed date',
      body: [
        'Work backwards. Set the date of the presentation, allow time for delivery, allow time for production, and leave a clear week for design approval, because that is the step most likely to slip while a committee makes up its mind.',
        'Selected projects are delivered from two weeks after design approval, but a presentation run with individual names and numbers benefits from more room than that. If your date is close, say so in the brief. We would rather tell you honestly than take the order and hope.',
      ],
    },
    { kind: 'process', heading: 'How it works' },
  ],
  faqHeading: 'Common questions',
  faqs: [
    {
      question: 'Can we order just a few caps?',
      // TODO-15: whether orders below twelve are possible for single awards.
      answer:
        'The minimum order is twelve, which covers most presentation evenings. If you need fewer than twelve for a single award, tell us in the brief and we will tell you honestly whether it is workable.',
      confirmed: false,
    },
    {
      question: 'Can each cap be different?',
      answer:
        'Yes. Individual names, numbers, years and initials can be applied per cap within one run. Send the list with your brief and we will confirm every entry on the design visual before production.',
      confirmed: true,
    },
    {
      question: 'How do cap numbers work?',
      answer:
        'Most clubs number caps in the order players are capped, starting at one. Some number by decade or by team. If you already have a system we will follow it. If you do not, we will set one up with you.',
      confirmed: true,
    },
    {
      question: 'We have a presentation dinner in six weeks. Is that possible?',
      answer:
        'Often, yes, but it depends on the specification and how quickly the design is approved. Put the date in the brief. We will tell you what is realistic before you commit to anything.',
      confirmed: true,
    },
    {
      question: 'Can you produce a cap for someone who has died?',
      answer:
        'Yes. Memorial caps are one of the things clubs ask us for most carefully. Tell us what you need in the brief and we will handle it quietly and properly.',
      confirmed: true,
    },
    {
      question: 'What if the club crest has changed over the years?',
      answer:
        'That is common, particularly for anniversary caps. Some clubs use the historic crest for a commemorative run and the current one for playing kit. Send us both and we will show you each on a design visual.',
      confirmed: true,
    },
  ],
  enquiry: {
    heading: 'Start your headwear brief',
    line: 'Tell us the occasion, the names and the date, and we will handle the detail with care.',
  },
};
