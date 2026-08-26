import type { JournalArticle } from '@/types';
import { ScorebookRule } from '@/components/ui/ScorebookRule';
import { formatDate } from '@/lib/utils';

export function ArticleHeader({ article }: { article: JournalArticle }) {
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
    </header>
  );
}
