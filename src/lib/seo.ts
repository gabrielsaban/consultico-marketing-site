import type { Metadata } from 'next';

const BASE = 'https://www.consultico.co.uk';

export function pageMeta({
  title,
  description,
  path,
  ogImage = '/og.jpg',
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${BASE}${path}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${BASE}${ogImage}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Consultico',
      locale: 'en_GB',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const SERVICE_PAGES = {
  seo: {
    title: 'SEO Services in Glasgow',
    description:
      'Strategy-led SEO for Glasgow and UK businesses: technical audits, on-page, content and authority building that compounds. Proven with trades clients.',
    path: '/seo',
    serviceName: 'SEO Services',
    serviceType: 'Search engine optimisation',
  },
  ppc: {
    title: 'PPC & Google Ads Management in Glasgow | Consultico',
    description:
      'Honest, margin-aware Google and Meta Ads management from a Glasgow consultancy. We start with your numbers and tell you when paid ads are worth it.',
    path: '/ppc',
    serviceName: 'PPC & Google Ads Management',
    serviceType: 'Pay-per-click advertising management',
  },
  'web-development': {
    title: 'Web Design & Development in Glasgow',
    description:
      'Fast, conversion-focused websites with SEO built in from day one, built as growth assets for B2C brands and trades businesses across the UK.',
    path: '/web-development',
    serviceName: 'Web Design & Development',
    serviceType: 'Web design and development',
  },
  'content-creation': {
    title: 'Content Creation & Strategy',
    description:
      'Strategic content, ad scripts, landing-page copy and articles aligned to your funnel and audience, produced as a growth function, not isolated tasks.',
    path: '/content-creation',
    serviceName: 'Content Creation & Strategy',
    serviceType: 'Content marketing',
  },
  'market-strategy': {
    title: 'Marketing Strategy Consulting, Glasgow',
    description:
      'Marketing strategy built around your numbers: economics, channels and sequencing before budget. The thinking that defines what to run and in what order.',
    path: '/market-strategy',
    serviceName: 'Marketing Strategy Consulting',
    serviceType: 'Marketing strategy consulting',
  },
  'campaign-management': {
    title: 'Campaign Management',
    description:
      'Cross-channel campaign coordination across paid, content, social, email and launches under one timeline, goal and success measure.',
    path: '/campaign-management',
    serviceName: 'Campaign Management',
    serviceType: 'Marketing campaign management',
  },
  careers: {
    title: 'Careers at Consultico',
    description:
      'Join Consultico: internships and roles in a strategy-led Glasgow marketing consultancy. See current opportunities and our student programme.',
    path: '/careers',
    serviceName: 'Careers at Consultico',
    serviceType: 'Employment',
  },
} as const;

export type ServicePageKey = keyof typeof SERVICE_PAGES;

export function servicePageMeta(key: ServicePageKey): Metadata {
  const page = SERVICE_PAGES[key];
  return pageMeta({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}
