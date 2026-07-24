// Content models and shared types. Build spec Section 25.

export type HatType =
  | 'Baggy Cricket Caps'
  | 'Cricket Sun Hats'
  | 'Performance Cricket Caps'
  | 'Not Sure Yet';

export type VolumeBracketValue = '12–24' | '25–49' | '50–100' | '100+';

export type Surface = 'paper' | 'ink' | 'cream' | 'green' | 'red';

export type JournalCategory =
  | 'Baggy Caps'
  | 'Presentation'
  | 'Sun Hats & Performance'
  | 'Ordering & Design';

export interface NavItem {
  label: string;
  hash: string; // '#headwear'
  href: string; // '/#headwear' or '/journal'
  isRoute: boolean; // true for Journal and Enquire
}

export interface ImageAsset {
  id: string;
  src: string | null; // null renders the Placeholder component
  alt: string;
  subject: string; // art direction note, not rendered
  crop: string; // art direction note, not rendered
  treatment: string; // art direction note, not rendered
  aspectDesktop: `${number}:${number}`;
  aspectMobile: `${number}:${number}` | 'hidden';
  width: number;
  height: number;
  blurDataURL?: string;
  decorative: boolean; // true forces alt=""
  priority?: boolean;
}

export interface HeadwearCategory {
  slug: 'baggy' | 'sun-hats' | 'performance';
  title: string;
  positioning: string;
  body: string;
  href: string;
  linkLabel: string;
  imageId: string;
}

export interface Occasion {
  name: 'Match' | 'Awards' | 'Milestones' | 'Honorary' | 'Presentation';
  number: string; // '01'
  description: string;
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
  | { kind: 'imagery'; heading?: string; surface?: 'paper' | 'cream'; images: { id: string; caption: string }[] }
  | { kind: 'process'; heading: string }
  | { kind: 'quantities'; heading: string; intro: string };

export interface CommercialPageContent {
  slug: string;
  intent: string; // documentation only
  accent: Extract<Surface, 'green' | 'red'>;
  h1: string;
  heroEyebrow: string;
  heroIntro: string;
  heroImageId: string;
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
