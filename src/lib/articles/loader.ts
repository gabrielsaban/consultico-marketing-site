import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  ARTICLE_CATEGORIES,
  DEFAULT_AUTHOR,
  type Article,
  type ArticleCategory,
  type ArticleFrontmatter,
} from './types';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

function parseArticleFile(slug: string, fileContents: string): Article {
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;

  if (!frontmatter.title || !frontmatter.excerpt || !frontmatter.date || !frontmatter.category) {
    throw new Error(`Article "${slug}" is missing required frontmatter fields.`);
  }

  if (!ARTICLE_CATEGORIES.includes(frontmatter.category)) {
    throw new Error(`Article "${slug}" has invalid category: ${frontmatter.category}`);
  }

  return {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    date: frontmatter.date,
    updated: frontmatter.updated,
    category: frontmatter.category,
    type: frontmatter.type ?? 'Article',
    readTime: frontmatter.readTime ?? '5 min read',
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    author: frontmatter.author ?? DEFAULT_AUTHOR,
    cta: frontmatter.cta,
    seoTitle: frontmatter.seoTitle,
    faqs: frontmatter.faqs,
    itemList: frontmatter.itemList,
    sponsored: frontmatter.sponsored,
    content: content.trim(),
  };
}

/**
 * Scheduling.
 *
 * An article goes live once its `date` has arrived. Until then it is excluded from
 * listings, the sitemap, related-article rails and its own URL, so a future-dated file
 * can sit committed in the repo and publish itself on the day.
 *
 * Note this is evaluated at render time, so the routes that surface articles set
 * `revalidate` — without that, a static build would never notice the date arriving.
 *
 * Set ARTICLES_SHOW_SCHEDULED=1 to preview scheduled articles locally.
 */
function isPublished(article: Article): boolean {
  if (process.env.ARTICLES_SHOW_SCHEDULED === '1') return true;
  const publishAt = new Date(article.date).getTime();
  if (Number.isNaN(publishAt)) return true;
  return publishAt <= Date.now();
}

export function getAllArticles(): Article[] {
  // Never return an empty list here. The directory is committed, so a missing
  // one means the markdown was not bundled into this route's serverless
  // function rather than that we have no articles — and the two are
  // indistinguishable to every caller. Returning [] silently emptied the
  // sitemap of all nine live articles for six days. Throwing instead means a
  // revalidation fails loudly and the last good response keeps being served.
  // The fix when this fires is outputFileTracingIncludes in next.config.ts.
  if (!fs.existsSync(articlesDirectory)) {
    throw new Error(
      `Articles directory not found at ${articlesDirectory}. If this is a ` +
        `deployed route, add it to outputFileTracingIncludes in next.config.ts.`
    );
  }

  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md'));

  const articles = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return parseArticleFile(slug, fileContents);
    })
    .filter(isPublished);

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const article = parseArticleFile(slug, fileContents);

  // A scheduled article 404s on its own URL until its publish date.
  return isPublished(article) ? article : undefined;
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getRelatedArticles(slug: string, limit = 4): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  return getAllArticles()
    .filter((article) => article.slug !== slug)
    .sort((a, b) => {
      const aSameCategory = a.category === current.category ? 1 : 0;
      const bSameCategory = b.category === current.category ? 1 : 0;
      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}
