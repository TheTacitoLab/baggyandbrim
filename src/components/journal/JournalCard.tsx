import Image from 'next/image';
import { getImageAsset } from '@/content/assets/image-manifest';
import { FramePlaceholder } from '@/components/media/InstantFrame';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { CtaLink } from '@/components/ui/CtaLink';
import { formatDate, cn } from '@/lib/utils';
import type { JournalArticle } from '@/types';

interface JournalCardProps {
  article: JournalArticle;
  variant?: 'featured' | 'grid' | 'compact';
  showExcerpt?: boolean; // false on the homepage
  location?: string; // analytics
}

// Journal cards are 3:2 and always framed (Revision 5.2, 8.5).
const RATIO = 'aspect-[3/2]';

function CardImage({ article }: { article: JournalArticle }) {
  const exists = article.featuredImageExists;
  const asset = getImageAsset('journal-default');
  return (
    <div className="instant-frame">
      <div className={cn('media-frame instant-frame__well', RATIO)}>
        {exists ? (
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            quality={78}
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
        ) : (
          <FramePlaceholder subject={asset.subject} />
        )}
      </div>
      <p className={cn('instant-frame__chin', !exists ? undefined : 'instant-frame__chin--empty')}>
        {exists ? '' : `${asset.subject} 3:2`}
      </p>
    </div>
  );
}

export function JournalCard({
  article,
  variant = 'grid',
  showExcerpt = true,
  location = 'journal',
}: JournalCardProps) {
  const headingClass = variant === 'featured' ? 'type-heading-l' : 'type-heading-s';
  return (
    <article className="group flex flex-col">
      <CardImage article={article} />
      <p className="type-label mt-5 text-on-surface-secondary">{article.category}</p>
      <h3 className={cn('mt-3', headingClass)}>
        <CtaLink
          href={`/journal/${article.slug}`}
          event="journal_article_click"
          params={{ slug: article.slug, location }}
        >
          {article.title}
        </CtaLink>
      </h3>
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
