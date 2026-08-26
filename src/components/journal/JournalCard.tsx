import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { CtaLink } from '@/components/ui/CtaLink';
import { formatDate, cn } from '@/lib/utils';
import type { JournalArticle } from '@/types';

interface JournalCardProps {
  article: JournalArticle;
  variant?: 'featured' | 'grid' | 'compact';
  showExcerpt?: boolean; // false on the homepage
  location?: string; // analytics
  headingLevel?: 'h2' | 'h3'; // h2 on /journal, where cards sit directly under the H1
}

export function JournalCard({
  article,
  variant = 'grid',
  showExcerpt = true,
  location = 'journal',
  headingLevel: Heading = 'h3',
}: JournalCardProps) {
  const headingClass = variant === 'featured' ? 'type-heading-l' : 'type-heading-s';
  return (
    <article className="group flex flex-col">
      <p className="type-label text-on-surface-secondary">{article.category}</p>
      <Heading className={cn('mt-3', headingClass)}>
        <CtaLink
          href={`/journal/${article.slug}`}
          event="journal_article_click"
          params={{ slug: article.slug, location }}
        >
          {article.title}
        </CtaLink>
      </Heading>
      {showExcerpt && (
        <p className="type-body mt-3 max-w-[42ch] text-on-surface-secondary">{article.excerpt}</p>
      )}
      <p className="type-label mt-4 text-on-surface-secondary">
        <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
        <span aria-hidden="true"> · </span>
        {article.readingTime} min read
      </p>
      <div className="mt-5">
        <ScorebookRule animate={false} />
      </div>
    </article>
  );
}
