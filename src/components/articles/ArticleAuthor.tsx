import Image from 'next/image';
import { formatArticleDate } from '@/lib/articles/format';
import type { Article } from '@/lib/articles/types';

interface ArticleAuthorProps {
  article: Article;
}

export default function ArticleAuthor({ article }: ArticleAuthorProps) {
  const author = article.author!;

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-6 dark:border-gray-800">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
        <Image src={author.image} alt="" fill className="object-cover" sizes="48px" />
      </div>
      <div className="font-helvetica">
        <div className="text-[1rem] font-medium text-gray-900 dark:text-gray-100">{author.name}</div>
        <div className="text-[0.875rem] text-gray-600 dark:text-gray-400">{author.role}</div>
        <div className="text-[0.875rem] text-gray-500 dark:text-gray-500">
          Published {formatArticleDate(article.date)}
          {article.updated && article.updated !== article.date
            ? ` · Updated ${formatArticleDate(article.updated)}`
            : ''}
          {' · '}
          {article.readTime}
        </div>
      </div>
    </div>
  );
}
