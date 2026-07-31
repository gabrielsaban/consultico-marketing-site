import Image from 'next/image';
import Link from 'next/link';
import { formatArticleDate } from '@/lib/articles/format';
import type { Article } from '@/lib/articles/types';

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
  showCategories?: boolean;
  className?: string;
}

export default function ArticleCard({
  article,
  compact = true,
  showCategories = false,
  className = '',
}: ArticleCardProps) {
  const author = article.author!;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-blue/40 ${className}`}
    >
      <div className={`flex flex-1 flex-col border-t-4 border-brand-blue/15 transition-colors group-hover:border-brand-blue ${compact ? 'p-4 md:p-5' : 'p-5 md:p-6'}`}>
        {(showCategories || (article.type && article.type !== 'Article')) && (
          <div className={`flex flex-wrap items-center gap-2 ${compact ? 'mb-2' : 'mb-3'}`}>
            {showCategories && (
              <span className="inline-flex rounded-full border border-brand-blue px-2.5 py-0.5 text-[0.7rem] font-helvetica font-medium uppercase tracking-wide text-brand-blue">
                {article.category}
              </span>
            )}
            {article.type && article.type !== 'Article' && (
              <span className="inline-flex rounded-full border border-gray-300 px-2.5 py-0.5 text-[0.7rem] font-helvetica font-medium uppercase tracking-wide text-gray-600 dark:border-gray-600 dark:text-gray-300">
                {article.type}
              </span>
            )}
          </div>
        )}

        {!showCategories && (
          <p className="mb-2 font-helvetica text-[0.75rem] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
            {article.readTime}
          </p>
        )}

        <h3
          className={`font-futura font-bold text-brand-blue line-clamp-2 ${
            compact
              ? 'mb-2 text-[clamp(1rem,1.2vw,1.15rem)]'
              : 'mb-2 text-[clamp(1.1rem,1.5vw,1.35rem)]'
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`font-helvetica-light text-gray-700 dark:text-gray-300 line-clamp-2 ${
            compact
              ? 'mb-4 text-[0.875rem] leading-[1.55]'
              : 'mb-4 text-[clamp(0.95rem,1.1vw,1rem)] leading-[1.6] line-clamp-3'
          }`}
        >
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2.5 border-t border-gray-100 pt-4 dark:border-gray-800">
          <div
            className={`relative shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 ${
              compact ? 'h-8 w-8' : 'h-9 w-9'
            }`}
          >
            <Image
              src={author.image}
              alt=""
              fill
              className="object-cover"
              sizes={compact ? '32px' : '36px'}
            />
          </div>
          <div className="min-w-0 font-helvetica text-[0.75rem] text-gray-600 dark:text-gray-400 md:text-[0.8rem]">
            <div className="truncate font-medium text-gray-800 dark:text-gray-200">{author.name}</div>
            <div className="truncate">
              {formatArticleDate(article.date)}
              {showCategories ? ` · ${article.readTime}` : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
