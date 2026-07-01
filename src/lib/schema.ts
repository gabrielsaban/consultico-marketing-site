import { CONSULTICO_GBP_URL, CONSULTICO_PHONE_E164, CONSULTICO_EMAIL, CONSULTICO_ADDRESS } from '@/lib/contact';
import { SEO_GLASGOW_FAQS, SEO_GLASGOW_PATH } from '@/lib/seo-glasgow';
import { SEO_FOR_PLUMBERS_FAQS_SCHEMA, SEO_FOR_PLUMBERS_PATH } from '@/lib/seo-for-plumbers';
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

export function seoForPlumbersPageJsonLd() {
  const pageUrl = `${SITE_ORIGIN}${SEO_FOR_PLUMBERS_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'SEO for Plumbers',
        serviceType: 'Search engine optimisation for plumbing and trades businesses',
        provider: { '@id': `${SITE_ORIGIN}/#org` },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        audience: { '@type': 'Audience', audienceType: 'Plumbing and heating businesses' },
        description:
          'Strategy-led SEO for plumbers and heating engineers across the UK: Google Business Profile, local search, technical SEO and content that turns searches into booked jobs.',
        url: pageUrl,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'SEO', item: `${SITE_ORIGIN}/seo` },
          { '@type': 'ListItem', position: 3, name: 'SEO for Plumbers', item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: SEO_FOR_PLUMBERS_FAQS_SCHEMA.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
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
        '@id': `${SITE_ORIGIN}/#paul-wilson`,
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
