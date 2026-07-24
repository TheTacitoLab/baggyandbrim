import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/journal';
import { SITE } from '@/content/site';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleHeader } from '@/components/journal/ArticleHeader';
import { TableOfContents } from '@/components/journal/TableOfContents';
import { JournalCard } from '@/components/journal/JournalCard';
import { mdxComponents } from '@/components/journal/mdx-components';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { EnquiryCtaBand } from '@/components/sections/EnquiryCtaBand';

// Unknown slugs 404 rather than render (build spec 18.3).
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const isDev = process.env.NODE_ENV === 'development';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || (article.draft && !isDev)) return {};

  const title = article.metaTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt;
  return {
    title,
    description,
    alternates: { canonical: article.canonicalUrl ?? `/journal/${article.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} | ${SITE.name}`,
      description,
      url: `/journal/${article.slug}`,
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate ?? article.publishedDate,
      authors: [article.author],
      section: article.category,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  if (article.draft && !isDev) notFound();

  const related = getRelatedArticles(article, 3);
  const showToc = article.headings.filter((h) => h.level === 2).length >= 4;

  const visualCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Journal', href: '/journal' },
    { label: article.category },
    { label: article.title },
  ];
  const schemaCrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Journal', href: '/journal' },
    { label: article.title },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(schemaCrumbs), articleSchema(article)]} />

      <div className="shell pt-[calc(var(--header-height)+1.5rem)]">
        <Breadcrumbs items={visualCrumbs} />
      </div>

      {article.draft && isDev && (
        <div className="shell mt-4">
          <p className="border border-[color:var(--colour-red)] p-3 text-[color:var(--colour-red)] type-body-s">
            Draft — visible in development only. This article returns a 404 in production.
          </p>
        </div>
      )}

      <article className="shell section-pad pt-10">
        <div
          className={cn(
            showToc
              ? 'xl:grid xl:grid-cols-[15rem_minmax(0,68ch)] xl:justify-center xl:gap-x-16 xl:gap-y-10'
              : 'mx-auto max-w-[68ch]',
          )}
        >
          <div className={cn(showToc && 'xl:col-start-2 xl:row-start-1')}>
            <ArticleHeader article={article} />
          </div>

          {showToc && (
            <aside className="mt-10 xl:col-start-1 xl:row-start-2 xl:mt-0">
              <TableOfContents headings={article.headings} />
            </aside>
          )}

          <div className={cn('mt-10 max-w-[68ch]', showToc && 'xl:col-start-2 xl:row-start-2 xl:mt-0')}>
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>
        </div>

        {related.length >= 2 && (
          <section aria-labelledby="related-articles-heading" className="mt-20">
            <ScorebookRule />
            <h2 id="related-articles-heading" className="type-heading-m mt-10">
              More from the Journal
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <JournalCard key={item.slug} article={item} showExcerpt={false} />
              ))}
            </div>
          </section>
        )}
      </article>

      <EnquiryCtaBand
        heading="Start Your Cap Brief"
        line="If this raised a question about a cap, the quickest answer comes from a brief."
        section="journal-article"
      />
    </>
  );
}
