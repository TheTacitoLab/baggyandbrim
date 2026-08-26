import { env } from '@/lib/env';
import { SITE } from '@/content/site';
import type { FaqItem, JournalArticle } from '@/types';

// Typed JSON-LD builders (build spec Section 20). Only values that are real are
// included: no invented sameAs, address, rating, price or founding date.

const ORG_ID = `${env.siteUrl}/#organization`;
const SITE_ID = `${env.siteUrl}/#website`;

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: env.siteUrl,
    logo: `${env.siteUrl}/images/brand/logo.png`,
    slogan: SITE.tagline,
    description: SITE.description,
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    url: env.siteUrl,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${env.siteUrl}${item.href}` } : {}),
    })),
  };
}

export function faqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function contactPageSchema(path: string, name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name,
    url: `${env.siteUrl}${path}`,
    isPartOf: { '@id': SITE_ID },
  };
}

export function collectionPageSchema(path: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${env.siteUrl}${path}`,
    isPartOf: { '@id': SITE_ID },
  };
}

export function articleSchema(article: JournalArticle): Record<string, unknown> {
  const url = `${env.siteUrl}/journal/${article.slug}`;
  // Only declare an image once the file actually exists; schema must not point
  // at placeholder art or a 404.
  const image = article.featuredImageExists
    ? article.featuredImage.startsWith('http')
      ? article.featuredImage
      : `${env.siteUrl}${article.featuredImage}`
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    ...(image ? { image } : {}),
    datePublished: article.publishedDate,
    dateModified: article.updatedDate ?? article.publishedDate,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: url,
    articleSection: article.category,
  };
}
