# Baggy & Brim

A premium editorial lead-generation website for a custom cricket headwear specialist.
No ecommerce; the single commercial objective is qualified enquiries submitted through
the headwear brief form.

Built to the Baggy & Brim Website Build Specification (v1.0). This README covers setup,
environment variables, content authoring, the image manifest, the design tokens and
deployment.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript (`strict`) |
| Styling | Tailwind CSS v4, CSS-first `@theme`, design tokens in `src/app/globals.css` |
| Rendering | Server Components by default; a small fixed set of client components |
| Animation | Motion (`motion/react`) for orchestration; CSS for everything else |
| Content | Local MDX (`gray-matter`, `next-mdx-remote/rsc`), isolated behind `src/lib/journal.ts` |
| Forms | Native elements + React state + Zod (shared client/server schema) |
| Enquiry delivery | Web3Forms via a server route handler |
| Analytics | GA4 via `@next/third-parties`, gated behind consent |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build (Turbopack)
npm start           # serve the production build
npm run lint        # ESLint (next/core-web-vitals + jsx-a11y)
npm run typecheck   # tsc --noEmit
npm run check       # copy, duplicate-copy and image-placeholder checks
```

## Environment variables

All variables are read once in `src/lib/env.ts` (validated with Zod) and exported as a
typed `env` object. No other module reads `process.env`. See `.env.example`.

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `WEB3FORMS_ACCESS_KEY` | Server | Yes (for live form) | Web3Forms key. Never `NEXT_PUBLIC_`. Missing → route returns 500 at runtime, build still passes |
| `NEXT_PUBLIC_SITE_URL` | Client | Yes | Canonical origin for `metadataBase`, canonicals, sitemap and JSON-LD |
| `NEXT_PUBLIC_GA_ID` | Client | No | GA4 ID. Analytics disabled entirely when absent |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Client | No | Search Console token. Meta tag omitted when absent |
| `ENQUIRY_NOTIFICATION_EMAIL` | Server | No | Recipient override passed to Web3Forms |
| `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` | Client | No | `true` enables the cookie-consent banner |
| `VERCEL_ENV` | Server | Automatic | Drives `noindex` on non-production deployments |

**Indexability.** Only a Vercel **production** deployment is indexable. Every other
environment (preview, local) returns `Disallow: /` in `robots.txt` and `noindex`
globally, guarding against a preview deployment indexing before launch.

## Project structure

```
content/journal/           # {slug}.mdx articles
public/images/             # real photography (see the image manifest)
scripts/                   # QA scripts (copy, duplicate copy, images)
src/app/                   # routes, metadata files, api/enquiry route, sitemap, robots
src/components/            # layout, sections, ui, media, journal, form, seo, analytics
src/content/               # ALL on-screen copy, typed, plus the image manifest and SEO
src/lib/                   # env, fonts, journal, schema, analytics, utils, validation, og
src/hooks/                 # useReducedMotion, useScrollLock
src/types/                 # content models and shared types
```

**Copy lives in `src/content/`, not in components.** Every on-screen string is imported
from a typed content file, so copy can be reviewed without reading JSX.

## Content authoring

### Homepage and commercial pages

- Homepage copy: `src/content/homepage.ts`.
- Commercial pages: `src/content/pages/*.ts`. Each exports a `CommercialPageContent`
  object whose `blocks` array drives the page in its own H2 order. All four pages share
  one template (`src/components/templates/CommercialPage.tsx`) and every rendering
  component; only the copy differs. `npm run check:dupes` enforces that no body
  paragraph appears on two pages.
- SEO titles/descriptions: `src/content/seo.ts`.

### Journal

Drop a file at `content/journal/{slug}.mdx`. Frontmatter is validated with Zod at build
time; a malformed article fails the build with the file and field named. Adding one file
switches `/journal` from its empty state to the populated state with no code change;
removing it reverts it.

Required frontmatter: `title`, `slug` (must match the filename), `excerpt` (120–200
chars), `publishedDate` (`YYYY-MM-DD`), `author`, `category` (one of `Baggy Caps`,
`Presentation`, `Sun Hats`, `Ordering & Design`), `primaryKeyword`,
`featuredImage`, `featuredImageAlt`, `draft` (explicit boolean), `relatedCommercialPage`.
Optional: `updatedDate`, `secondaryKeywords`, `readingTime`, `metaTitle`,
`metaDescription`, `canonicalUrl`.

MDX components available in articles: `Figure`, `PullQuote`, `KeyPoints`, `InlineCTA`,
`RelatedLinks`. `KeyPoints` takes a pipe-delimited `items` string
(`<KeyPoints items="One|Two|Three" />`). Drafts render with a banner in development and
return 404 in production.

Content rules: no invented statistics, historical claims, quotations, or named clubs,
players or dates unless supplied and verified. Record any sourced factual claim in a
`sources` comment in the MDX file.

## Image manifest

Every image is registered in `src/content/assets/image-manifest.ts` with its ratio,
subject, crop, treatment and alt text (alt lives here, not inline, so it can be reviewed
as a set). Entries have `src: null` until a real file exists, at which point the local
`Placeholder` component renders a labelled cream block at the correct aspect ratio.

**To add a real image:** drop the file into `public/images/...` and set `src` on the
manifest entry (or, for Journal featured images, just add the file at the path in the
frontmatter — a missing file falls back to the `journal-default` placeholder). Run
`npm run check:images` to list entries still using placeholders. Zero placeholders is a
blocking launch item.

## Design tokens

All tokens live in `src/app/globals.css`:

- **Colour** — the palette is defined once and mapped to Tailwind utilities (`bg-ink`,
  `text-paper`, …). Sections set one `data-surface` attribute (`paper`, `ink`, `cream`,
  `green`, `red`); children read `var(--surface)`, `var(--on-surface)` and `var(--rule)`
  and need no colour props. This keeps the site free of one-off colour classes.
- **Type** — semantic utility classes (`type-display-xl` … `type-label`, `type-number`)
  map to the fluid scale.
- **Motion** — duration/easing/stagger tokens. The reveal system is CSS-driven and
  no-JS safe: elements are fully visible unless the document is marked `.js-ready`, at
  which point one shared `RevealObserver` animates them in. `prefers-reduced-motion` is
  honoured entirely in CSS, so it does not depend on JavaScript.

## The enquiry form

One Zod schema (`src/lib/validation/enquiry.ts`) is shared by the client form and the
server route (`src/app/api/enquiry/route.ts`). The route validates, checks a honeypot
(silent success), rate-limits (5/IP/10 min, in-memory), then forwards to Web3Forms with a
10 s timeout. The access key never reaches the browser. All form states (idle,
submitting, success, recoverable failure, validation, rate-limited) are implemented, and
entered data is never lost on a failed submission.

## SEO

Next.js Metadata API only. Per-page metadata in `src/content/seo.ts`; `sitemap.ts` and
`robots.ts` are generated; per-page OG images via `next/og`; all JSON-LD flows through the
typed builders in `src/lib/schema.ts` and the `JsonLd` component (Organization, WebSite,
BreadcrumbList, FAQPage, Article, CollectionPage, ContactPage). No invented structured
data (no ratings, prices, addresses or `sameAs` to profiles that do not exist).

## Deployment

Deploy on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production domain and
`WEB3FORMS_ACCESS_KEY` in the production environment. Production is indexable; previews
are automatically `noindex`. Submit the sitemap in Search Console after launch.

## Notable implementation notes

- The spec targets Next.js 15+; this build uses the current stable **Next.js 16**
  (Turbopack default, async `params`/`searchParams`) and **Zod 4**.
- `next/image` uses `preload` (Next 16 replaced the deprecated `priority` prop).
- `playwright-core` is an optional dev dependency used only for local visual QA
  screenshots; it is not part of the runtime.

## Outstanding items before launch

Tracked in Section 37 of the build spec. The blocking ones:

- Founders Grotesk licence and font files, including the X-Condensed family (a
  documented Archivo stand-in is in place, see `src/lib/fonts.ts`).
- Contact email, social handles, registered company details.
- Privacy policy and terms content (the pages ship honest, clearly-marked placeholders).
- `WEB3FORMS_ACCESS_KEY` and a live test submission.
- Final photography (zero image placeholders).
- Confirmation of the four production specifications and every FAQ still marked
  `confirmed: false`.
- Consent-banner requirement (the banner is built and disabled by flag).
