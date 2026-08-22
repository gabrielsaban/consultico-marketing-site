export const ARTICLE_CATEGORIES = [
  'Strategy',
  'SEO',
  'PPC',
  'Content',
  'GEO',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const ARTICLE_TYPES = ['Article', 'Guide', 'Case note'] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export type ArticleCtaPreset =
  | 'think-first'
  | 'contact'
  | 'seo'
  | 'ppc'
  | 'content'
  | 'geo';

export interface ArticleCtaConfig {
  preset?: ArticleCtaPreset;
  eyebrow?: string;
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  image: string;
}

/**
 * A paid placement inside an article. Declaring it here rather than marking the
 * link up inline keeps it auditable: the renderer adds rel="sponsored" from this
 * list, and the content linter refuses to build once `until` has passed, so a
 * placement cannot quietly outlive the money.
 */
export interface ArticleSponsoredPlacement {
  /** Advertiser name, as it appears on the page. */
  name: string;
  /** Every URL of theirs in the article. Each gets rel="sponsored". */
  urls: string[];
  /** Last day the placement is paid for, YYYY-MM-DD. */
  until: string;
}

export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: ArticleCategory;
  type?: ArticleType;
  readTime: string;
  image?: string;
  imageAlt?: string;
  author?: ArticleAuthor;
  cta?: ArticleCtaConfig;
  seoTitle?: string;
  faqs?: ArticleFaq[];
  itemList?: string[];
  sponsored?: ArticleSponsoredPlacement[];
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export const DEFAULT_AUTHOR: ArticleAuthor = {
  name: 'Paul Wilson',
  role: 'Founder, Consultico',
  image: '/team/paul_wilson.png',
};
