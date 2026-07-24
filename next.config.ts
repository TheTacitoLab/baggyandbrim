import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    // AVIF first, WebP fallback. Sources are high-quality JPEG/PNG in /public/images.
    formats: ['image/avif', 'image/webp'],
    // Next 16 defaults images.qualities to [75]; declare the levels the spec uses
    // (78 photography, 90 macro detail, 100 illustration) or they get coerced.
    qualities: [75, 78, 90, 100],
  },
  // All 301. Predictable mistyped and legacy paths, per build spec Section 18.3.
  async redirects() {
    return [
      { source: '/cricket-caps', destination: '/custom-cricket-caps', permanent: true },
      { source: '/caps', destination: '/custom-cricket-caps', permanent: true },
      { source: '/sun-hats', destination: '/cricket-sun-hats', permanent: true },
      { source: '/baggy-caps', destination: '/baggy-cricket-caps', permanent: true },
      { source: '/performance-caps', destination: '/performance-cricket-caps', permanent: true },
      { source: '/presentation-caps', destination: '/cricket-presentation-caps', permanent: true },
      { source: '/blog', destination: '/journal', permanent: true },
      { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
      { source: '/contact', destination: '/enquire', permanent: true },
    ];
  },
};

export default nextConfig;
