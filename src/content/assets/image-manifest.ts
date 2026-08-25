import type { ImageAsset } from '@/types';

// The asset manifest (build spec Section 9.3–9.4). Every image on the site is
// registered here. `src: null` renders the local Placeholder component. When a
// real file lands in /public/images, set `src` and the placeholder disappears
// with no component changes. Alt text lives here, not inline, so it can be
// reviewed as a set (Section 9.6).
//
// The homepage carries exactly four images: the hero and the three product
// images in the Headwear section (brief Section 5).

export const IMAGE_MANIFEST: ImageAsset[] = [
  // --- Hero -----------------------------------------------------------------
  {
    id: 'hero-primary',
    src: '/images/hero-primary.jpg',
    alt: 'Cricketer wearing a custom embroidered baggy cricket cap in dark navy with red piping and a club crest',
    subject: 'Studio portrait: player in a navy baggy cap with red piping, crest legible, front on.',
    crop: 'In the instant frame, right column of the hero. Face centred, so the 4:5 mobile crop holds.',
    treatment: 'Neutral studio grey, editorial grade.',
    aspectDesktop: '4:3',
    aspectMobile: '4:5',
    width: 1440,
    height: 1080,
    decorative: false,
    priority: true,
  },
  // --- Headwear categories --------------------------------------------------
  {
    id: 'category-baggy',
    src: null,
    alt: 'Custom embroidered baggy cricket cap for a cricket club',
    subject: 'Wool baggy cap, studio still life on cream paper, raking light.',
    crop: 'Vertical, product centred with generous headroom.',
    treatment: 'Studio still life.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
  {
    id: 'category-presentation',
    src: null,
    alt: 'Custom cricket presentation cap with embroidered club crest',
    subject: 'Structured presentation cap, studio still life, crest legible, warm light.',
    crop: 'Vertical, product centred with generous headroom.',
    treatment: 'Studio still life.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
  {
    id: 'category-sunhat',
    src: null,
    alt: 'Custom wide-brim cricket sun hat in club colours',
    subject: 'Wide-brim sun hat photographed from slightly below, brim filling the upper frame.',
    crop: 'Vertical, brim shape emphasised.',
    treatment: 'Studio still life.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
  // --- Journal --------------------------------------------------------------
  {
    id: 'journal-default',
    src: null,
    alt: 'A custom cricket cap photographed as a still life.',
    subject: 'Custom cricket cap still life on a neutral background.',
    crop: 'Studio still life, neutral.',
    treatment: 'Studio still life.',
    aspectDesktop: '3:2',
    aspectMobile: '3:2',
    width: 1500,
    height: 1000,
    decorative: false,
  },

  // --- Landing page: /custom-cricket-caps -----------------------------------
  {
    id: 'lp-hero-custom',
    src: null,
    alt: 'Three pieces of custom cricket headwear, one baggy cap, one presentation cap and one wide-brim sun hat, arranged on cream paper.',
    subject:
      'A group of three: baggy cap, presentation cap and wide-brim sun hat, arranged on cream paper, shot from above.',
    crop: 'Right-weighted, 3:2, not full bleed.',
    treatment: 'Studio still life on cream.',
    aspectDesktop: '3:2',
    aspectMobile: '4:5',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-custom-crest',
    src: null,
    alt: 'Macro of an embroidered club crest on the front panel of a cricket cap.',
    subject: 'Macro embroidery on a front panel.',
    crop: 'Macro, tight.',
    treatment: 'Macro detail, quality 90.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
  {
    id: 'lp-custom-club',
    src: null,
    alt: 'A cricket club pavilion exterior in summer light.',
    subject: 'A club pavilion exterior in summer light.',
    crop: 'Ambient, wide.',
    treatment: 'Warm summer light.',
    aspectDesktop: '3:2',
    aspectMobile: '3:2',
    width: 1500,
    height: 1000,
    decorative: false,
  },

  // --- Landing page: /baggy-cricket-caps ------------------------------------
  {
    id: 'lp-hero-baggy',
    src: null,
    alt: 'Custom embroidered baggy cricket cap in club colours, three-quarter view, with the crest legible.',
    subject: 'Single baggy cap, three-quarter view, hard light, crest legible.',
    crop: 'Right-weighted, 3:2.',
    treatment: 'Hard light.',
    aspectDesktop: '3:2',
    aspectMobile: '4:5',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-baggy-inside',
    src: null,
    alt: 'The inside of a baggy cricket cap showing an internal woven label and an embroidered cap number.',
    subject: 'Cap turned to show the internal label and cap number.',
    crop: 'Studio, high detail.',
    treatment: 'Studio, high detail.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
  {
    id: 'lp-baggy-presentation',
    src: null,
    alt: 'A baggy cricket cap in a presentation box on a pavilion table.',
    subject: 'Cap in a presentation box on a pavilion table.',
    crop: 'Warm, ambient.',
    treatment: 'Warm low light.',
    aspectDesktop: '3:2',
    aspectMobile: '3:2',
    width: 1500,
    height: 1000,
    decorative: false,
  },

  // --- Landing page: /cricket-sun-hats --------------------------------------
  {
    id: 'lp-hero-sunhat',
    src: null,
    alt: 'Custom wide-brim cricket sun hat in club colours, photographed from below against a bright sky.',
    subject: 'Sun hat photographed from below against a bright sky, brim shape dominant.',
    crop: 'Right-weighted, 3:2.',
    treatment: 'Bright, high key.',
    aspectDesktop: '3:2',
    aspectMobile: '4:5',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-sunhat-field',
    src: null,
    alt: 'A fielder in a club cricket sun hat standing at the boundary, shot from behind.',
    subject: 'A fielder in a club sun hat at the boundary, shot from behind, no face required.',
    crop: 'Wide, ambient.',
    treatment: 'Warm, ambient.',
    aspectDesktop: '3:2',
    aspectMobile: '3:2',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-sunhat-detail',
    src: null,
    alt: 'Macro of the brim edge stitching and embroidered crest on a cricket sun hat.',
    subject: 'Macro of the brim edge stitching and crest.',
    crop: 'Macro, tight.',
    treatment: 'Macro detail, quality 90.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },

  // --- Landing page: /cricket-presentation-caps -----------------------------
  {
    id: 'lp-hero-presentation',
    src: null,
    alt: 'Custom cricket presentation cap with embroidered club crest on a pavilion table beside an honours board.',
    subject: 'A single cap on a pavilion table beside an honours board, warm low light.',
    crop: 'Right-weighted, 3:2.',
    treatment: 'Warm low light.',
    aspectDesktop: '3:2',
    aspectMobile: '4:5',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-presentation-box',
    src: null,
    alt: 'A presentation cricket cap in a box with a named card.',
    subject: 'Cap in a presentation box with a named card.',
    crop: 'Studio, warm.',
    treatment: 'Warm low light.',
    aspectDesktop: '3:2',
    aspectMobile: '3:2',
    width: 1500,
    height: 1000,
    decorative: false,
  },
  {
    id: 'lp-presentation-number',
    src: null,
    alt: 'Macro of an embroidered cap number inside a cricket cap.',
    subject: 'Macro of an embroidered cap number inside a cap.',
    crop: 'Macro, tight.',
    treatment: 'Macro detail, quality 90.',
    aspectDesktop: '4:5',
    aspectMobile: '4:5',
    width: 1280,
    height: 1600,
    decorative: false,
  },
];

const IMAGE_MAP: ReadonlyMap<string, ImageAsset> = new Map(
  IMAGE_MANIFEST.map((asset) => [asset.id, asset]),
);

/** Resolve a manifest entry by ID. Throws on an unknown ID so typos fail fast. */
export function getImageAsset(id: string): ImageAsset {
  const asset = IMAGE_MAP.get(id);
  if (!asset) {
    throw new Error(`Unknown image asset id: "${id}". Register it in image-manifest.ts.`);
  }
  return asset;
}

/** Manifest entries still awaiting a real file (used by scripts/check-images.ts). */
export function getUnfulfilledImages(): ImageAsset[] {
  return IMAGE_MANIFEST.filter((asset) => asset.src === null);
}
