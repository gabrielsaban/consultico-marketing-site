'use client';

import { useMemo, useState } from 'react';
import { shouldShowArticleCategories } from '@/lib/articles/display';
import { ARTICLE_CATEGORIES } from '@/lib/articles/types';
import type { Article, ArticleCategory } from '@/lib/articles/types';
import ArticleCard from './ArticleCard';

interface ArticleCategoryFilterProps {
  articles: Article[];
}

export default function ArticleCategoryFilter({ articles }: ArticleCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');
  const showCategories = shouldShowArticleCategories(articles);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

  const availableCategories = ARTICLE_CATEGORIES.filter((category) =>
    articles.some((article) => article.category === category)
  );

  if (articles.length === 0) {
    return (
      <p className="text-center text-[clamp(1rem,1.2vw,1.125rem)] font-helvetica-light text-gray-600 dark:text-gray-400">
        First articles coming soon.
      </p>
    );
  }

  return (
    <>
      {showCategories && availableCategories.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:mb-12">
          <FilterChip
            label="All"
            active={activeCategory === 'All'}
            onClick={() => setActiveCategory('All')}
          />
          {availableCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      )}

      {filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} showCategories={showCategories} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[0.8rem] font-helvetica font-medium transition-colors md:text-[0.875rem] ${
        active
          ? 'border-brand-blue bg-brand-blue text-white'
          : 'border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue dark:border-gray-600 dark:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
