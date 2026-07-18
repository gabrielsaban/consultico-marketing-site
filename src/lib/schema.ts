import { CONSULTICO_GBP_URL, CONSULTICO_PHONE_E164, CONSULTICO_EMAIL, CONSULTICO_ADDRESS } from '@/lib/contact';
import { SEO_GLASGOW_FAQS, SEO_GLASGOW_PATH } from '@/lib/seo-glasgow';
import {
  SEO_BY_INDUSTRY_PATH,
  getIndustryPath,
  getLiveSeoIndustries,
  getSeoIndustryBySlug,
} from '@/lib/seo-industries';
import { SEO_FOR_PLUMBERS_FAQS_SCHEMA } from '@/lib/seo-for-plumbers';
import { SEO_FOR_ESTATE_AGENTS_FAQS_SCHEMA } from '@/lib/seo-for-estate-agents';
import { SEO_FOR_DENTISTS_FAQS_SCHEMA } from '@/lib/seo-for-dentists';
import { SEO_FOR_ACCOUNTANTS_FAQS_SCHEMA } from '@/lib/seo-for-accountants';
import { SEO_FOR_ELECTRICIANS_FAQS_SCHEMA } from '@/lib/seo-for-electricians';
import { SEO_FOR_HEATING_ENGINEERS_FAQS_SCHEMA } from '@/lib/seo-for-heating-engineers';
import { hasDedicatedArticleImage } from '@/lib/articles/display';
import type { Article } from '@/lib/articles/types';
import { SERVICE_PAGES, type ServicePageKey } from '@/lib/seo';

export const SITE_ORIGIN = 'https://www.consultico.co.uk';

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_ORIGIN}/#org`,
      name: 'Consultico',
      legalName: 'Consultico Ltd',
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/brand/logo_main.svg` },
      image: `${SITE_ORIGIN}/og.jpg`,
      email: CONSULTICO_EMAIL,
      telephone: CONSULTICO_PHONE_E164,
      priceRange: '££',
      description:
        'Strategy-led digital marketing consultancy in Glasgow. We start with strategy, then deliver SEO, GEO, paid media, web, content and campaigns for B2C brands and trades businesses across the UK and US.',
      founder: {
        '@type': 'Person',
        '@id': `${SITE_ORIGIN}/#paul-wilson`,
        name: 'Paul Wilson',
        sameAs: ['https://www.linkedin.com/in/think-first-marketing'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONSULTICO_ADDRESS.streetAddress,
        addressLocality: CONSULTICO_ADDRESS.addressLocality,
        addressRegion: CONSULTICO_ADDRESS.addressRegion,
        postalCode: CONSULTICO_ADDRESS.postalCode,
        addressCountry: CONSULTICO_ADDRESS.addressCountry,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '55.8609282', longitude: '-4.2418232' },
      hasMap: CONSULTICO_GBP_URL,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:30',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '11',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
      ],
      sameAs: [
        'https://www.linkedin.com/company/consultico-ltd/',
        'https://www.instagram.com/consultico_marketing/',
        CONSULTICO_GBP_URL,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Consultico',
      inLanguage: 'en-GB',
      publisher: { '@id': `${SITE_ORIGIN}/#org` },
    },
  ],
};

export const thinkFirstPageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Think First', item: `${SITE_ORIGIN}/think-first` },
      ],
    },
    {
      '@type': 'Service',
      name: 'Think First Marketing Strategy Workshop',
      description:
        'A 30-day marketing strategy workshop for B2C brands doing £50K+ per month. Maps channels, economics, and growth before budget is committed to SEO, PPC, or web.',
      provider: { '@id': `${SITE_ORIGIN}/#org` },
      url: `${SITE_ORIGIN}/think-first`,
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
      ],
    },
  ],
};

export function servicePageJsonLd(key: ServicePageKey) {
  const page = SERVICE_PAGES[key];
  const breadcrumbName = page.path === '/careers' ? 'Careers' : page.serviceName;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_ORIGIN}${page.path}#service`,
        name: page.serviceName,
        serviceType: page.serviceType,
        provider: { '@id': `${SITE_ORIGIN}/#org` },
        areaServed: [
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United States' },
        ],
        url: `${SITE_ORIGIN}${page.path}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbName, item: `${SITE_ORIGIN}${page.path}` },
        ],
      },
    ],
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function seoGlasgowPageJsonLd() {
  const pageUrl = `${SITE_ORIGIN}${SEO_GLASGOW_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'SEO Agency in Glasgow',
        serviceType: 'Search engine optimisation',
        description:
          'Glasgow-based SEO agency helping businesses across the city and central Scotland get found on Google and AI search.',
        provider: { '@id': `${SITE_ORIGIN}/#org` },
        areaServed: [
          { '@type': 'City', name: 'Glasgow' },
          { '@type': 'AdministrativeArea', name: 'Scotland' },
        ],
        url: pageUrl,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#local`,
        name: 'Consultico',
        url: SITE_ORIGIN,
        telephone: CONSULTICO_PHONE_E164,
        email: CONSULTICO_EMAIL,
        image: `${SITE_ORIGIN}/og.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONSULTICO_ADDRESS.streetAddress,
          addressLocality: CONSULTICO_ADDRESS.addressLocality,
          addressRegion: CONSULTICO_ADDRESS.addressRegion,
          postalCode: CONSULTICO_ADDRESS.postalCode,
          addressCountry: CONSULTICO_ADDRESS.addressCountry,
        },
        geo: { '@type': 'GeoCoordinates', latitude: '55.8609282', longitude: '-4.2418232' },
        hasMap: CONSULTICO_GBP_URL,
        parentOrganization: { '@id': `${SITE_ORIGIN}/#org` },
        areaServed: [
          { '@type': 'City', name: 'Glasgow' },
          { '@type': 'AdministrativeArea', name: 'Scotland' },
        ],
        sameAs: [CONSULTICO_GBP_URL],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'SEO', item: `${SITE_ORIGIN}/seo` },
          { '@type': 'ListItem', position: 3, name: 'SEO Agency in Glasgow', item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: SEO_GLASGOW_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

const SEO_INDUSTRY_FAQS_SCHEMA: Record<
  string,
  readonly { question: string; answer: string }[]
> = {
  'seo-for-plumbers': SEO_FOR_PLUMBERS_FAQS_SCHEMA,
  'seo-for-estate-agents': SEO_FOR_ESTATE_AGENTS_FAQS_SCHEMA,
  'seo-for-dentists': SEO_FOR_DENTISTS_FAQS_SCHEMA,
  'seo-for-accountants': SEO_FOR_ACCOUNTANTS_FAQS_SCHEMA,
  'seo-for-electricians': SEO_FOR_ELECTRICIANS_FAQS_SCHEMA,
  'seo-for-heating-engineers': SEO_FOR_HEATING_ENGINEERS_FAQS_SCHEMA,
};

const SEO_INDUSTRY_SCHEMA_META: Record<
  string,
  { serviceType: string; audienceType: string; breadcrumbLabel?: string }
> = {
  'seo-for-plumbers': {
    serviceType: 'Search engine optimisation for plumbing and trades businesses',
    audienceType: 'Plumbing and heating businesses',
  },
  'seo-for-estate-agents': {
    serviceType: 'Search engine optimisation for estate and letting agents',
    audienceType: 'Estate and letting agencies',
  },
  'seo-for-dentists': {
    serviceType: 'Search engine optimisation for dental practices',
    audienceType: 'Dental practices',
  },
  'seo-for-accountants': {
    serviceType: 'Search engine optimisation for accountancy firms',
    audienceType: 'Accountancy firms',
  },
  'seo-for-electricians': {
    serviceType: 'Search engine optimisation for electricians and electrical contractors',
    audienceType: 'Electricians and electrical contractors',
  },
  'seo-for-heating-engineers': {
    serviceType: 'Search engine optimisation for gas and heating engineers',
    audienceType: 'Gas and heating engineers',
    breadcrumbLabel: 'SEO for Gas and Heating Engineers',
  },
};

export function seoIndustryPageJsonLd(slug: string) {
  const entry = getSeoIndustryBySlug(slug);
  const meta = SEO_INDUSTRY_SCHEMA_META[slug];
  const faqs = SEO_INDUSTRY_FAQS_SCHEMA[slug];
  if (!entry || !meta || !faqs) {
    throw new Error(`Unknown SEO industry slug for JSON-LD: ${slug}`);
  }

  const pageUrl = `${SITE_ORIGIN}${getIndustryPath(slug)}`;
  const breadcrumbLabel = meta.breadcrumbLabel ?? entry.label;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: entry.label,
        serviceType: meta.serviceType,
        provider: { '@id': `${SITE_ORIGIN}/#org` },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        audience: { '@type': 'Audience', audienceType: meta.audienceType },
        description: entry.blurb,
        url: pageUrl,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'SEO', item: `${SITE_ORIGIN}/seo` },
          { '@type': 'ListItem', position: 3, name: breadcrumbLabel, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export function seoByIndustryPageJsonLd() {
  const pageUrl = `${SITE_ORIGIN}${SEO_BY_INDUSTRY_PATH}`;
  const liveIndustries = getLiveSeoIndustries();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'SEO', item: `${SITE_ORIGIN}/seo` },
          { '@type': 'ListItem', position: 3, name: 'SEO by Industry', item: pageUrl },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        name: 'SEO by Industry',
        url: pageUrl,
        description:
          'Industry-specific SEO guides for trades and service businesses across the UK, from Consultico.',
        publisher: { '@id': `${SITE_ORIGIN}/#org` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: liveIndustries.map((industry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: industry.label,
            url: `${SITE_ORIGIN}${getIndustryPath(industry)}`,
          })),
        },
      },
    ],
  };
}

export function articlePageJsonLd(article: Article) {
  const author = article.author!;
  const published = article.date;
  const modified = article.updated ?? article.date;
  const graph: object[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE_ORIGIN}/articles` },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `${SITE_ORIGIN}/articles/${article.slug}`,
        },
      ],
    },
    {
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: published,
      dateModified: modified,
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        // Derive the @id from the author's name so a future team-member byline
        // gets its own Person entity instead of being bound to Paul's #id.
        // 'Paul Wilson' -> '#paul-wilson', matching the canonical founder node.
        '@id': `${SITE_ORIGIN}/#${author.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')}`,
      },
      publisher: { '@id': `${SITE_ORIGIN}/#org` },
      mainEntityOfPage: `${SITE_ORIGIN}/articles/${article.slug}`,
      image: hasDedicatedArticleImage(article)
        ? `${SITE_ORIGIN}${article.image}`
        : `${SITE_ORIGIN}/articles/${article.slug}/opengraph-image`,
      articleSection: article.category,
    },
  ];

  if (article.itemList?.length) {
    graph.push({
      '@type': 'ItemList',
      name: article.title,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: article.itemList.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    });
  }

  if (article.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
