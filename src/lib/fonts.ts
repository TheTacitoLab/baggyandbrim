// TYPOGRAPHY SYSTEM: Founders Grotesk throughout (brief Section 4).
//   Main titles      Founders Grotesk Bold (700), tight tracking
//   Secondary titles Founders Grotesk Medium/Semibold (500/600)
//   Accents/eyebrows Founders Grotesk X-Condensed, uppercase
//   Body             Founders Grotesk Regular (400)
//
// Founders Grotesk is a licensed Klim typeface and its files are not yet
// supplied. Until they are, Archivo (a close grotesque with a variable width
// axis) stands in: the CSS stacks in globals.css list 'Founders Grotesk' and
// 'Founders Grotesk X-Condensed' first, so supplying the licensed files is a
// one-commit swap:
//   1. Drop the woff2 files into src/assets/fonts/.
//   2. Uncomment the two localFont blocks below and add their .variable classes
//      to the <html> className in src/app/layout.tsx.
// The stacks in globals.css already prefer var(--font-founders) and
// var(--font-founders-condensed) ahead of Archivo.

import { Archivo } from 'next/font/google';
// import localFont from 'next/font/local';

export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  // Variable font; the wdth axis backs the condensed accent via font-stretch.
  axes: ['wdth'],
});

// export const founders = localFont({
//   src: [
//     { path: '../assets/fonts/FoundersGrotesk-Regular.woff2', weight: '400', style: 'normal' },
//     { path: '../assets/fonts/FoundersGrotesk-Medium.woff2', weight: '500', style: 'normal' },
//     { path: '../assets/fonts/FoundersGrotesk-Semibold.woff2', weight: '600', style: 'normal' },
//     { path: '../assets/fonts/FoundersGrotesk-Bold.woff2', weight: '700', style: 'normal' },
//   ],
//   display: 'swap',
//   variable: '--font-founders',
//   preload: true,
// });

// export const foundersCondensed = localFont({
//   src: [
//     { path: '../assets/fonts/FoundersGroteskXCond-Medium.woff2', weight: '500', style: 'normal' },
//     { path: '../assets/fonts/FoundersGroteskXCond-Semibold.woff2', weight: '600', style: 'normal' },
//   ],
//   display: 'swap',
//   variable: '--font-founders-condensed',
// });
