export const ARTICLE_CATEGORIES = [
  'Strategy',
  'SEO',
  'PPC',
  'Content',
  'GEO',
  'Updates',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const ARTICLE_TYPES = ['Article', 'Guide', 'Case note'] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

/**
 * Updates are the person-led strand: written by a named team member, not built
 * around a keyword, and republished as a LinkedIn article. Every update carries
 * one of these kinds as its tag. Kept short on purpose; add to it when a third
 * kind genuinely shows up, not in anticipation.
 */
export const UPDATE_KINDS = ['Insights', 'Team news'] as const;

export type UpdateKind = (typeof UPDATE_KINDS)[number];

export const UPDATES_CATEGORY = 'Updates' satisfies ArticleCategory;

export type ArticleCtaPreset =
  | 'think-first'
  | 'contact'
  | 'seo'
  | 'ppc'
  | 'content'
  | 'geo'
  | 'updates';

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
  /** Registry slug, used for the author filter. Derived from name when absent. */
  slug?: string;
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

/** What an Insight is responding to, credited on the page. */
export interface ArticleSource {
  title: string;
  creator: string;
  url: string;
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
  /** A slug from src/lib/articles/authors.ts, or a full author object. */
  author?: ArticleAuthor | string;
  /** Required on Updates, ignored elsewhere. */
  kind?: UpdateKind;
  source?: ArticleSource;
  cta?: ArticleCtaConfig;
  seoTitle?: string;
  faqs?: ArticleFaq[];
  itemList?: string[];
  sponsored?: ArticleSponsoredPlacement[];
}

export interface Article extends Omit<ArticleFrontmatter, 'author'> {
  /** Always resolved by the loader. */
  author: ArticleAuthor;
  slug: string;
  content: string;
}

export const DEFAULT_AUTHOR: ArticleAuthor = {
  slug: 'paul-wilson',
  name: 'Paul Wilson',
  role: 'Founder, Consultico',
  image: '/team/paul-wilson-headshot.jpg',
};
