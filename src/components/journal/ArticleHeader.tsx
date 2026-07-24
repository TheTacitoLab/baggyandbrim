import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { JournalArticle } from '@/types';
import { getImageAsset } from '@/content/assets/image-manifest';
import { Placeholder } from '@/components/media/Placeholder';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { formatDate, aspectToCss } from '@/lib/utils';

export function ArticleHeader({ article }: { article: JournalArticle }) {
  const frameStyle = { '--ar-d': aspectToCss('16:9'), '--ar-m': aspectToCss('3:2') } as CSSProperties;
  return (
    <header>
      <p className="type-label text-on-surface-secondary">{article.category}</p>
      <h1 className="type-heading-l mt-4 max-w-[22ch]">{article.title}</h1>

      <div className="mt-8">
        <ScorebookRule animate={false} />
        <div className="type-label flex flex-wrap gap-x-6 gap-y-1 py-4 text-on-surface-secondary">
          <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
          {article.updatedDate && (
            <span>
              Updated <time dateTime={article.updatedDate}>{formatDate(article.updatedDate)}</time>
            </span>
          )}
          <span>{article.author}</span>
          <span>{article.readingTime} min read</span>
        </div>
        <ScorebookRule animate={false} />
      </div>

      <div className="media-frame mt-10" style={frameStyle}>
        {article.featuredImageExists ? (
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            sizes="(max-width: 1279px) 100vw, 68ch"
            preload
            quality={78}
            className="object-cover"
          />
        ) : (
          <Placeholder asset={getImageAsset('journal-default')} />
        )}
      </div>
    </header>
  );
}
