// TEMPORARY FALLBACK. Recoleta Black licence not yet supplied. Georgia is a
// placeholder and is not the approved brand typeface. Replace before launch.
// See Section 37 (TODO-01) of the build spec.
//
// When the licensed Recoleta-Black.woff2 is supplied:
//   1. Drop the file into src/assets/fonts/.
//   2. Uncomment the `recoleta` localFont block below and add `recoleta.variable`
//      to the <html> className in src/app/layout.tsx.
//   3. Remove the `font-display-fallback` class from <html> in the same file.
// That is the whole swap — one commit — because --font-display already prefers
// var(--font-recoleta) ahead of Georgia in globals.css.

import { Bricolage_Grotesque } from 'next/font/google';
// import localFont from 'next/font/local';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '800'],
});

// export const recoleta = localFont({
//   src: [{ path: '../assets/fonts/Recoleta-Black.woff2', weight: '900', style: 'normal' }],
//   display: 'swap',
//   variable: '--font-recoleta',
//   preload: true,
//   fallback: ['Georgia', 'Times New Roman', 'serif'],
// });
