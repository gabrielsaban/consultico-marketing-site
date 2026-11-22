'use client';

import { useMemo, useState } from 'react';
import { shouldShowArticleCategories } from '@/lib/articles/display';
import { authorSlugOf } from '@/lib/articles/authors';
import { ARTICLE_CATEGORIES, UPDATES_CATEGORY } from '@/lib/articles/types';
import type { Article, ArticleCategory } from '@/lib/articles/types';
import ArticleCard from './ArticleCard';

interface ArticleCategoryFilterProps {
  articles: Article[];
}

export default function ArticleCategoryFilter({ articles }: ArticleCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');
  const [activeAuthor, setActiveAuthor] = useState<string | 'All'>('All');
  const showCategories = shouldShowArticleCategories(articles);

  // Updates are followed by person, so that tab gets a second row of author
  // chips. Only once two or more people have published: a filter with one
  // option is noise.
  const updateAuthors = useMemo(() => {
    const seen = new Map<string, string>();
    for (const article of articles) {
      if (article.category !== UPDATES_CATEGORY) continue;
      seen.set(authorSlugOf(article.author), article.author.name);
    }
    return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
  }, [articles]);
  const showAuthorFilter = activeCategory === UPDATES_CATEGORY && updateAuthors.length > 1;

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter(
      (article) =>
        article.category === activeCategory &&
        (!showAuthorFilter || activeAuthor === 'All' || authorSlugOf(article.author) === activeAuthor)
    );
  }, [activeCategory, activeAuthor, articles, showAuthorFilter]);

  const selectCategory = (category: ArticleCategory | 'All') => {
    setActiveCategory(category);
    setActiveAuthor('All');
  };

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
            onClick={() => selectCategory('All')}
          />
          {availableCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => selectCategory(category)}
            />
          ))}
        </div>
      )}

      {showAuthorFilter && (
        <div
          className="-mt-6 mb-10 flex flex-wrap justify-center gap-2 md:-mt-8 md:mb-12"
          aria-label="Filter updates by author"
        >
          <FilterChip
            label="Everyone"
            active={activeAuthor === 'All'}
            onClick={() => setActiveAuthor('All')}
          />
          {updateAuthors.map((author) => (
            <FilterChip
              key={author.slug}
              label={author.name}
              active={activeAuthor === author.slug}
              onClick={() => setActiveAuthor(author.slug)}
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
