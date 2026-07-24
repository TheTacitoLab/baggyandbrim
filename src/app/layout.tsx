import type { Metadata, Viewport } from 'next';
import './globals.css';
import { bricolage } from '@/lib/fonts';
import { env } from '@/lib/env';
import { SITE } from '@/content/site';
import { PAGE_SEO } from '@/content/seo';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyEnquiryCTA } from '@/components/ui/StickyEnquiryCTA';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { Analytics } from '@/components/analytics/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${PAGE_SEO['/'].title} | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  // Only Vercel production is indexable; every other environment is noindex.
  robots: env.shouldIndex
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_GB',
    url: env.siteUrl,
    title: `${PAGE_SEO['/'].title} | ${SITE.name}`,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  verification: env.gscVerification ? { google: env.gscVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#11110F',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${bricolage.variable} font-display-fallback`}
      // Next 16 no longer overrides scroll-behavior on navigation by default;
      // this opts back into instant scroll on route change while keeping smooth
      // scrolling for in-page anchors.
      data-scroll-behavior="smooth"
    >
      <body>
        {/* Marks the document ready before paint so the reveal system can hide
            elements it will animate. A JS failure leaves everything visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-ready')",
          }}
        />
        <SkipLink />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <StickyEnquiryCTA href="/enquire" label="Start Your Cap Brief" />
        <RevealObserver />
        <Analytics gaId={env.gaId} consentRequired={env.consentBannerEnabled} />
      </body>
    </html>
  );
}
