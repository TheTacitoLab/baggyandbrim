import type { SitePhoto } from '@/types';

// The three product photographs (build spec Section 1). Shared by the homepage
// tiles, each product landing page and the /custom-cricket-caps two-photo
// split, so the alt text and the crop stay consistent everywhere a photo
// appears. objectPosition biases each crop so the headwear leads the frame:
// the caps sit high in the baggy and sun-hat shots, low in the presentation
// shot where the cap is held at the player's side.

export const PRODUCT_PHOTOS = {
  baggy: {
    src: '/products/baggy-cap.jpg',
    alt: 'Cricketer wearing a custom navy baggy cricket cap with red piping and an embroidered club crest',
    objectPosition: '50% 22%',
  },
  presentation: {
    src: '/products/presentation-cap.jpg',
    alt: 'Navy velvet cricket presentation cap with gold trim, tassel and an embroidered rose, held at the side',
    objectPosition: '50% 70%',
  },
  sunHat: {
    src: '/products/wide-brim-sun-hat.jpg',
    alt: 'Cricketer in a cream wide-brim cricket sun hat with a green underbrim and embroidered club badge',
    objectPosition: '50% 22%',
  },
} as const satisfies Record<string, SitePhoto>;
