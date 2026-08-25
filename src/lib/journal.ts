import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { JournalArticle, JournalCategory } from '@/types';
import { readingTime as computeReadingTime, slugify } from '@/lib/utils';

// The content layer, isolated so a future CMS migration changes only this file
// (build spec Section 14.1). No component reads the filesystem directly.

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');

const CATEGORIES = ['Baggy Caps', 'Presentation', 'Sun Hats', 'Ordering & Design'] as const;

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Every field validated at build time. A malformed article fails the build with a
// message naming the file and field, which beats publishing broken metadata.
const frontmatterSchema = z.object({
  title: z.string().min(1).max(70),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'lowercase, hyphenated'),
  excerpt: z.string().min(120).max(200),
  publishedDate: z.string().regex(DATE, 'YYYY-MM-DD'),
  updatedDate: z.string().regex(DATE, 'YYYY-MM-DD').optional(),
  author: z.string().default('Baggy & Brim'),
  category: z.enum(CATEGORIES),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()).optional(),
  featuredImage: z.string().min(1),
  featuredImageAlt: z.string().min(1),
  readingTime: z.number().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  canonicalUrl: z.string().url().optional(),
  draft: z.boolean(),
  relatedCommercialPage: z.string().min(1),
});

function parseHeadings(content: string): JournalArticle['headings'] {
  const headings: JournalArticle['headings'] = [];
  const lines = content.split('\n');
  let inCodeFence = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[#*`]/g, '').trim();
    headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

let cache: JournalArticle[] | null = null;

function loadAll(): JournalArticle[] {
  if (cache) return cache;
  if (!fs.existsSync(JOURNAL_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs.readdirSync(JOURNAL_DIR).filter((file) => file.endsWith('.mdx'));
  const articles: JournalArticle[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      throw new Error(
        `Invalid Journal frontmatter in ${file}: "${issue.path.join('.')}" ${issue.message}`,
      );
    }
    const fm = parsed.data;
    const expectedSlug = file.replace(/\.mdx$/, '');
    if (fm.slug !== expectedSlug) {
      throw new Error(`Journal slug "${fm.slug}" must match filename "${expectedSlug}.mdx".`);
    }

    const computed = computeReadingTime(content);
    const reading =
      fm.readingTime && Math.abs(fm.readingTime - computed) <= 2 ? fm.readingTime : computed;

    // A featured image whose file is not present yet falls back to the
    // journal-default placeholder (build spec Section 14.2), so an article can be
    // written and published before its photography exists.
    const featuredImageExists =
      fm.featuredImage.length > 0 &&
      fs.existsSync(path.join(process.cwd(), 'public', fm.featuredImage.replace(/^\//, '')));

    return {
      ...fm,
      featuredImageExists,
      readingTime: reading,
      content,
      headings: parseHeadings(content),
    };
  });

  // Duplicate slugs would produce two pages at one URL — fail the build.
  const seen = new Set<string>();
  for (const article of articles) {
    if (seen.has(article.slug)) throw new Error(`Duplicate Journal slug: "${article.slug}".`);
    seen.add(article.slug);
  }

  cache = articles;
  return cache;
}

const isDev = process.env.NODE_ENV === 'development';

/** Published articles, newest first. Drafts excluded outside development. */
export function getAllArticles(): JournalArticle[] {
  return loadAll()
    .filter((article) => isDev || !article.draft)
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export function getLatestArticles(n: number): JournalArticle[] {
  return getAllArticles().slice(0, n);
}

export function getArticleBySlug(slug: string): JournalArticle | null {
  return loadAll().find((article) => article.slug === slug) ?? null;
}

/** Published slugs only, for generateStaticParams. */
export function getAllSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getRelatedArticles(article: JournalArticle, limit: number): JournalArticle[] {
  const pool = getAllArticles().filter((candidate) => candidate.slug !== article.slug);
  const sameCategory = pool.filter((candidate) => candidate.category === article.category);
  const rest = pool.filter((candidate) => candidate.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Published articles that support a given commercial page (Section 21.2). */
export function getArticlesForCommercialPage(path: string): JournalArticle[] {
  return getAllArticles().filter((article) => article.relatedCommercialPage === path);
}

export function getCategories(): { category: JournalCategory; count: number }[] {
  const counts = new Map<JournalCategory, number>();
  for (const article of getAllArticles()) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }
  return Array.from(counts, ([category, count]) => ({ category, count }));
}
