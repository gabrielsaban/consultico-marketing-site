import type { Article } from './types';

export const GENERIC_ARTICLE_IMAGES = ['/og.jpg'];

export function hasDedicatedArticleImage(article: Article): boolean {
  return Boolean(article.image && !GENERIC_ARTICLE_IMAGES.includes(article.image));
}

export function shouldShowArticleCategories(articles: Article[]): boolean {
  if (articles.length >= 3) return true;
  const categories = new Set(articles.map((article) => article.category));
  return categories.size >= 2;
}
