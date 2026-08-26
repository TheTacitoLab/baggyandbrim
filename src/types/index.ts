// Content models and shared types. Build spec Section 25.

export type HatType =
  | 'Baggy Caps'
  | 'Presentation Caps'
  | 'Wide-Brim Sun Hats'
  | 'Not Sure Yet';

export type VolumeBracketValue = '12–24' | '25–49' | '50–100' | '100+';

export type Surface = 'paper' | 'ink' | 'cream' | 'green' | 'red';

export type JournalCategory = 'Baggy Caps' | 'Presentation' | 'Sun Hats' | 'Ordering & Design';

export interface NavItem {
  label: string;
  href: string; // '/baggy-cricket-caps' or '/journal'
}

// A real photograph in /public. objectPosition tunes the crop so the headwear
// leads the frame.
export interface SitePhoto {
  src: string;
  alt: string;
  objectPosition?: string; // CSS object-position, e.g. '50% 22%'
}

export interface HeadwearCategory {
  slug: 'baggy' | 'presentation' | 'sun-hats';
  title: string;
  body: string;
  href: string;
  image: SitePhoto;
}

export interface ProcessStep {
  number: string; // '01'
  title: 'Fill Out a Brief' | 'Design + Approval' | 'Production' | 'Delivery';
  description: string;
  compactDescription: string; // one line, for landing pages
}

export interface VolumeBracket {
  value: VolumeBracketValue; // form value, en dash
  display: string; // '12 to 24', for prose
  description: string;
}

export interface CustomisationOption {
  name: string;
  detail: string | null; // null renders 'Details confirmed on enquiry'
  confirmed: boolean; // false means production spec is unconfirmed
}

export interface FaqItem {
  question: string;
  answer: string;
  confirmed: boolean; // false means the answer contains a TODO and must not publish
}

// The middle of every commercial page is an ordered list of blocks, so each page
// follows its own H2 order while sharing every rendering component (build spec
// Section 13.1: same template, page-specific copy, no thin variants).
export type CommercialBlock =
  | { kind: 'prose'; heading: string; body: string[] }
  | {
      kind: 'comparison';
      heading: string;
      rows: { style: string; bestFor: string; character: string; href: string; linkLabel: string }[];
    }
  | { kind: 'options'; heading: string; intro?: string; options: CustomisationOption[] }
  | {
      kind: 'useCases';
      heading: string;
      intro?: string;
      items?: string[];
      rows?: { title: string; description: string }[];
    }
  | { kind: 'imagePair'; left: SitePhoto; right: SitePhoto }
  | { kind: 'process'; heading: string }
  | { kind: 'quantities'; heading: string; intro: string };

export interface CommercialPageContent {
  slug: string;
  intent: string; // documentation only
  accent: Extract<Surface, 'green' | 'red'>;
  h1: string;
  heroEyebrow: string;
  heroIntro: string;
  heroImage?: SitePhoto; // a single photo beside the title
  heroPolaroids?: { front: SitePhoto; back: SitePhoto }; // a paired polaroid stack instead
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  blocks: CommercialBlock[];
  faqHeading: string;
  faqs: FaqItem[];
  enquiry: { heading: string; line: string };
}

export interface JournalArticle {
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  updatedDate?: string;
  author: string;
  category: JournalCategory;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageExists: boolean; // resolved at load; false renders the placeholder
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  draft: boolean;
  relatedCommercialPage: string;
  content: string; // raw MDX body
  headings: { id: string; text: string; level: 2 | 3 }[];
}

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  organisation?: string;
  hatTypes: HatType[];
  volume: VolumeBracketValue;
  targetDate: string; // ISO YYYY-MM-DD
  message?: string;
  consent: true;
  botcheck?: string;
}

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; kind: 'validation'; errors: Record<string, string> }
  | { ok: false; kind: 'rate-limit' | 'upstream' | 'config'; message: string };

export interface PageSeo {
  path: string;
  intent: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonical: string;
  ogImage?: string;
}
