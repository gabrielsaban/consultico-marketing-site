export const SEO_BY_INDUSTRY_PATH = '/seo-by-industry';

export type SeoIndustryCategory = 'Trades' | 'Professional Services' | 'Healthcare';

export interface SeoIndustryEntry {
  slug: string;
  name: string;
  label: string;
  category: SeoIndustryCategory;
  related: string[];
  live: boolean;
  blurb: string;
}

export const SEO_INDUSTRIES: SeoIndustryEntry[] = [
  {
    slug: 'seo-for-plumbers',
    name: 'Plumbers',
    label: 'SEO for Plumbers',
    category: 'Trades',
    related: ['seo-for-heating-engineers', 'seo-for-electricians'],
    live: true,
    blurb:
      'Local search, Google Business Profile and content that turns emergency and boiler-repair searches into booked jobs.',
  },
  {
    slug: 'seo-for-electricians',
    name: 'Electricians',
    label: 'SEO for Electricians',
    category: 'Trades',
    related: ['seo-for-plumbers', 'seo-for-heating-engineers', 'seo-for-estate-agents'],
    live: true,
    blurb:
      'Strategy-led SEO for electricians across the UK: Google Business Profile, local search, technical SEO and content that turns emergency, EICR, EV charger and rewire searches into booked jobs.',
  },
  {
    slug: 'seo-for-heating-engineers',
    name: 'Heating Engineers',
    label: 'SEO for Gas & Heating Engineers',
    category: 'Trades',
    related: ['seo-for-plumbers', 'seo-for-electricians'],
    live: true,
    blurb:
      'Strategy-led SEO for gas and heating engineers across the UK: Google Business Profile, local search, technical SEO and content that turns boiler repair, service, installation and gas safety searches into booked jobs all year round.',
  },
  {
    slug: 'seo-for-estate-agents',
    name: 'Estate Agents',
    label: 'SEO for Estate Agents',
    category: 'Professional Services',
    related: ['seo-for-estate-agents', 'seo-for-accountants', 'seo-for-dentists'],
    live: true,
    blurb:
      'Strategy-led SEO for estate and letting agents across the UK: Google Business Profile, local search, reviews and content that win more vendor instructions and landlord enquiries.',
  },
  {
    slug: 'seo-for-dentists',
    name: 'Dentists',
    label: 'SEO for Dentists',
    category: 'Healthcare',
    related: ['seo-for-dentists', 'seo-for-estate-agents', 'seo-for-accountants'],
    live: true,
    blurb:
      'Strategy-led SEO for dental practices across the UK: Google Business Profile, local search, reviews and treatment content that attract private, cosmetic and new NHS patients.',
  },
  {
    slug: 'seo-for-accountants',
    name: 'Accountants',
    label: 'SEO for Accountants',
    category: 'Professional Services',
    related: ['seo-for-estate-agents', 'seo-for-accountants', 'seo-for-dentists'],
    live: true,
    blurb:
      'Strategy-led SEO for accountancy firms across the UK: Google Business Profile, local and specialist search, reviews and content that win the right long-term clients and capture Making Tax Digital demand.',
  },
];

export function getIndustryPath(entry: SeoIndustryEntry | string): string {
  const slug = typeof entry === 'string' ? entry : entry.slug;
  return `/${slug}`;
}

export function getLiveSeoIndustries(): SeoIndustryEntry[] {
  return SEO_INDUSTRIES.filter((entry) => entry.live);
}

export function getSeoIndustryBySlug(slug: string): SeoIndustryEntry | undefined {
  return SEO_INDUSTRIES.find((entry) => entry.slug === slug);
}

export function getRelatedLiveIndustries(slug: string, limit = 3): SeoIndustryEntry[] {
  const entry = getSeoIndustryBySlug(slug);
  if (!entry) return [];

  return entry.related
    .map((relatedSlug) => getSeoIndustryBySlug(relatedSlug))
    .filter((related): related is SeoIndustryEntry => !!related && related.live)
    .slice(0, limit);
}

export function getFeaturedSeoIndustries(limit = 3): SeoIndustryEntry[] {
  return getLiveSeoIndustries().slice(0, limit);
}

export function getSeoIndustrySitemapRoutes(): { path: string; priority: number }[] {
  return [
    { path: SEO_BY_INDUSTRY_PATH, priority: 0.75 },
    ...getLiveSeoIndustries().map((entry) => ({
      path: getIndustryPath(entry),
      priority: 0.75,
    })),
  ];
}
