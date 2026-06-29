import Link from 'next/link';
import { formatArticleDate } from '@/lib/articles/format';
import { getServiceLinkForCategory } from '@/lib/articles/cta';
import type { Article } from '@/lib/articles/types';
import type { ResolvedArticleCta } from '@/lib/articles/cta';
import ArticleSidebarCta from './ArticleSidebarCta';

interface ArticleSidebarProps {
  exploreArticles: Article[];
  cta: ResolvedArticleCta;
  currentCategory: Article['category'];
  className?: string;
}

export default function ArticleSidebar({
  exploreArticles,
  cta,
  currentCategory,
  className = '',
}: ArticleSidebarProps) {
  const serviceLink = getServiceLinkForCategory(currentCategory);

  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="hidden xl:block">
        <ArticleSidebarCta cta={cta} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-futura text-[1rem] font-bold text-brand-blue">Keep reading</h2>
          <Link
            href="/articles"
            className="font-helvetica text-[0.8rem] font-medium text-brand-blue hover:underline"
          >
            All articles
          </Link>
        </div>

        {exploreArticles.length > 0 ? (
          <ul className="space-y-4">
            {exploreArticles.map((article) => (
              <li key={article.slug} className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 dark:border-gray-800">
                <Link href={`/articles/${article.slug}`} className="group block">
                  <p className="mb-1 font-helvetica text-[0.72rem] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {article.category} · {article.readTime}
                  </p>
                  <p className="font-futura text-[0.95rem] font-bold leading-[1.35] text-gray-900 transition-colors group-hover:text-brand-blue dark:text-gray-100">
                    {article.title}
                  </p>
                  <p className="mt-1 font-helvetica text-[0.8rem] text-gray-500 dark:text-gray-400">
                    {formatArticleDate(article.date)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-helvetica-light text-[0.9rem] leading-[1.6] text-gray-600 dark:text-gray-400">
            More articles are on the way. Browse what we have published so far.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <p className="mb-2 font-helvetica text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
          Related service
        </p>
        <Link
          href={serviceLink.href}
          className="font-futura text-[0.98rem] font-bold text-brand-blue hover:underline"
        >
          {serviceLink.label} →
        </Link>
      </div>
    </aside>
  );
}
