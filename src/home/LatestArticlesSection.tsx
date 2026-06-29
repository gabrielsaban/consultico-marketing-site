import Link from 'next/link';
import Container from '@/components/Container';
import ArticleCard from '@/components/articles/ArticleCard';
import { shouldShowArticleCategories } from '@/lib/articles/display';
import { getAllArticles } from '@/lib/articles/loader';

export default function LatestArticlesSection() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 3);
  const showCategories = shouldShowArticleCategories(articles);

  if (latest.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:bg-gray-950 md:py-20 lg:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-futura text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-blue">
            Latest articles
          </h2>
          <Link
            href="/articles"
            className="font-helvetica text-[0.95rem] font-medium text-brand-blue hover:underline"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} showCategories={showCategories} />
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Link
            href="/articles"
            className="inline-flex font-helvetica text-[0.95rem] font-medium text-brand-blue hover:underline"
          >
            View all articles →
          </Link>
        </div>
      </Container>
    </section>
  );
}
