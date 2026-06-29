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
    content: content.trim(),
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md'));

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return parseArticleFile(slug, fileContents);
  });

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
  return parseArticleFile(slug, fileContents);
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
