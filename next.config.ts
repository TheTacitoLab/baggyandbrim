import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    // AVIF first, WebP fallback. Sources are high-quality JPEG/PNG in /public/images.
    formats: ['image/avif', 'image/webp'],
    // Next 16 defaults images.qualities to [75]; declare the levels the spec uses
    // (78 photography, 90 macro detail) or they get coerced.
    qualities: [75, 78, 90],
  },
  // Predictable mistyped and legacy paths, per build spec Section 18.3. Explicit
  // 301 (statusCode) rather than Next's default 308 from `permanent: true`.
  async redirects() {
    return [
      { source: '/cricket-caps', destination: '/custom-cricket-caps', statusCode: 301 },
      { source: '/caps', destination: '/custom-cricket-caps', statusCode: 301 },
      { source: '/sun-hats', destination: '/cricket-sun-hats', statusCode: 301 },
      { source: '/baggy-caps', destination: '/baggy-cricket-caps', statusCode: 301 },
      // The performance range is retired; both its URLs 301 to the range hub.
      { source: '/performance-caps', destination: '/custom-cricket-caps', statusCode: 301 },
      { source: '/performance-cricket-caps', destination: '/custom-cricket-caps', statusCode: 301 },
      { source: '/presentation-caps', destination: '/cricket-presentation-caps', statusCode: 301 },
      { source: '/blog', destination: '/journal', statusCode: 301 },
      { source: '/blog/:slug', destination: '/journal/:slug', statusCode: 301 },
      { source: '/contact', destination: '/enquire', statusCode: 301 },
    ];
  },
};

export default nextConfig;
