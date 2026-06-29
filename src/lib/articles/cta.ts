import type { Article, ArticleCategory, ArticleCtaPreset } from './types';

export interface ResolvedArticleCta {
  title: string;
  body: string;
  href: string;
  label: string;
  eyebrow: string;
}

const PRESETS: Record<ArticleCtaPreset, ResolvedArticleCta> = {
  'think-first': {
    eyebrow: 'Next step',
    title: 'Map the plan before you spend',
    body: 'Think First is our strategy workshop for brands that need clarity on channels, economics, and sequencing before committing budget.',
    href: '/think-first',
    label: 'Explore Think First',
  },
  contact: {
    eyebrow: 'Work with us',
    title: 'Ready to talk it through?',
    body: 'Tell us where you are today and what you are trying to grow. We will point you in the right direction.',
    href: '/#contact',
    label: 'Get in touch',
  },
  seo: {
    eyebrow: 'Service',
    title: 'Need SEO that compounds?',
    body: 'We build long-term organic visibility for Glasgow businesses and trades, with strategy behind every technical and content decision.',
    href: '/seo',
    label: 'Explore SEO',
  },
  ppc: {
    eyebrow: 'Service',
    title: 'Paid media with a defined job',
    body: 'We manage Google and Meta around unit economics, not vanity metrics, so every pound has a reason to exist.',
    href: '/ppc',
    label: 'Explore PPC',
  },
  content: {
    eyebrow: 'Service',
    title: 'Content that earns its place',
    body: 'We produce articles, landing page copy, and campaign assets with a clear role in your funnel, not as isolated production tasks.',
    href: '/content-creation',
    label: 'Explore content',
  },
  geo: {
    eyebrow: 'Service',
    title: 'Visible in search and AI answers',
    body: 'We structure your content and entity signals so Google and AI assistants can find, understand, and cite your brand accurately.',
    href: '/seo',
    label: 'Explore SEO & GEO',
  },
};

const CATEGORY_DEFAULTS: Record<ArticleCategory, ArticleCtaPreset> = {
  Strategy: 'think-first',
  SEO: 'seo',
  PPC: 'ppc',
  Content: 'content',
  GEO: 'geo',
};

function isPreset(value: string): value is ArticleCtaPreset {
  return value in PRESETS;
}

export function resolveArticleCta(article: Article): ResolvedArticleCta {
  const config = article.cta;

  if (config?.title && config?.body && config?.href && config?.label) {
    return {
      eyebrow: config.eyebrow ?? 'Next step',
      title: config.title,
      body: config.body,
      href: config.href,
      label: config.label,
    };
  }

  const presetKey =
    config?.preset && isPreset(config.preset)
      ? config.preset
      : CATEGORY_DEFAULTS[article.category];

  return PRESETS[presetKey];
}

export function getServiceLinkForCategory(category: ArticleCategory): { href: string; label: string } {
  const map: Record<ArticleCategory, { href: string; label: string }> = {
    Strategy: { href: '/think-first', label: 'Think First workshop' },
    SEO: { href: '/seo', label: 'SEO services' },
    PPC: { href: '/ppc', label: 'PPC services' },
    Content: { href: '/content-creation', label: 'Content creation' },
    GEO: { href: '/seo', label: 'SEO & GEO' },
  };
  return map[category];
}
