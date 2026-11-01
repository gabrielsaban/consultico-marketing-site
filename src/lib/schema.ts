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
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';

export const SITE_ORIGIN = 'https://www.consultico.co.uk';

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      // ProfessionalService is already a LocalBusiness subtype, so listing both
      // was redundant. The Google Business Profile drives the local pack, not
      // this type.
      '@type': 'ProfessionalService',
      '@id': `${SITE_ORIGIN}/#org`,
      name: 'Consultico',
      legalName: 'Consultico Ltd',
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/brand/logo_main.svg` },
      image: `${SITE_ORIGIN}/og.jpg`,
      email: CONSULTICO_EMAIL,
      telephone: CONSULTICO_PHONE_E164,
      // Loop starts at £5,000 a month, so '££' undersold it.
      priceRange: '£££',
      // The identity line, agreed 2026-10-31 (verified-facts.md). Loop is
      // described as how we work, never as new, and nothing here promises a
      // result: AI engines repeat this sentence word for word.
      description:
        "Consultico is a Glasgow marketing company for UK consumer brands. Through Loop, it works as an extra part of a brand's marketing team: a strategist leads, backed by a team, frameworks built in-house and tools built on leading AI models, taking a fresh look every week.",
      slogan: 'Sharper every week. Further every year.',
      knowsAbout: [
        'Marketing strategy',
        'Marketing efficiency ratio (MER)',
        'Marketing measurement',
        'Marketing budget allocation',
        'Consumer brand marketing',
        'Direct-to-consumer (D2C) marketing',
        'Search engine optimisation (SEO)',
        'Generative engine optimisation (GEO)',
        'Paid search advertising',
        'Website design and development',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Consultico services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              '@id': `${SITE_ORIGIN}/#loop`,
              name: 'Loop, by Consultico',
              description:
                "An extra part of a consumer brand's marketing team. A strategist leads, a team makes and tests the changes, and every Monday the client gets three recommendations to answer yes, talk or no.",
              provider: { '@id': `${SITE_ORIGIN}/#org` },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'How Loop starts',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Think First marketing strategy workshop',
                      url: `${SITE_ORIGIN}/think-first`,
                    },
                  },
                ],
              },
            },
            // A minimum monthly price on a 12-month agreement. No start date,
            // so nothing reads as "coming soon".
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: 5000,
              priceCurrency: 'GBP',
              unitCode: 'MON',
              billingDuration: 'P12M',
            },
          },
          {
            '@type': 'OfferCatalog',
            name: 'Other services',
            itemListElement: [
              { name: 'SEO', url: `${SITE_ORIGIN}/seo` },
              { name: 'GEO (generative engine optimisation)', url: `${SITE_ORIGIN}/articles/what-is-generative-engine-optimisation` },
              { name: 'Google Ads', url: `${SITE_ORIGIN}/ppc` },
              { name: 'Websites', url: `${SITE_ORIGIN}/web-development` },
              { name: 'Content', url: `${SITE_ORIGIN}/content-creation` },
              { name: 'Campaigns', url: `${SITE_ORIGIN}/campaign-management` },
            ].map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.name,
                url: service.url,
                provider: { '@id': `${SITE_ORIGIN}/#org` },
              },
            })),
          },
        ],
      },
      founder: {
        '@type': 'Person',
        '@id': `${SITE_ORIGIN}/#paul-wilson`,
        name: 'Paul Wilson',
        // Never "CMO": verified-facts.md rules it out until a role says so.
        jobTitle: 'Founder',
        image: `${SITE_ORIGIN}/team/paul-wilson-headshot.jpg`,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Strathclyde' },
        knowsAbout: ['Marketing strategy', 'Search engine optimisation (SEO)', 'Website development'],
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
        reviewCount: '14',
        bestRating: '5',
        worstRating: '1',
      },
      areaServed: [
        { '@type': 'City', name: 'Glasgow' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
      ],
      sameAs: [
        'https://www.linkedin.com/company/consultico-ltd/',
        'https://www.instagram.com/consultico_marketing/',
        'https://www.facebook.com/profile.php?id=61562303216944',
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
      serviceType: 'Marketing workshop',
      description:
        'The marketing strategy workshop that starts Loop, by Consultico. For UK consumer brands, delivered in person in Glasgow or online. Maps channels, economics and growth before budget is committed.',
      isRelatedTo: { '@id': `${SITE_ORIGIN}/#loop` },
      provider: { '@id': `${SITE_ORIGIN}/#org` },
      url: `${SITE_ORIGIN}/think-first`,
      areaServed: [
        { '@type': 'City', name: 'Glasgow' },
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
      // A second LocalBusiness used to sit here, with the same name and address
      // under its own @id, which told engines there were two Consulticos. The
      // Service above already names #org as its provider, so that's the link.
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
        image: `${SITE_ORIGIN}${author.image}`,
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

const CASE_STUDIES_PATH = '/case-studies';

/**
 * Schema for a single case study.
 *
 * ── Why Article and not something more specific ──
 * schema.org has no CaseStudy type, and inventing one gets ignored. Article is
 * understood everywhere and carries the two things that matter here: `about`,
 * which names the CLIENT as its own Organization entity, and `publisher`, which
 * ties the claim back to us. Without `about` the client is just a string in a
 * heading, and an engine has no reason to connect the result to the company.
 *
 * ⚠️ This exists because of a measured problem, not a hunch. Asked whether
 * Consultico is any good, an AI engine reached for our founding date, called us
 * unproven and told the reader to request case studies. Neither case study
 * appeared in the seven sources it used. Being reachable was the first fix;
 * being a resolvable entity is the second.
 */
export function caseStudyPageJsonLd(study: CaseStudy) {
  const url = `${SITE_ORIGIN}${CASE_STUDIES_PATH}/${study.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: study.headline,
        description: study.summary,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@id': `${SITE_ORIGIN}/#paul-wilson` },
        publisher: { '@id': `${SITE_ORIGIN}/#org` },
        // Only a client who has agreed to be named becomes an entity. An
        // anonymous one ("a UK healthcare and wellness practice") is not a name,
        // and marking it up as one would hand an engine a fake organisation.
        ...(study.named ? { about: { '@type': 'Organization', name: study.client } } : {}),
        mentions: study.services.map((service) => ({
          '@type': 'Service',
          name: service,
          provider: { '@id': `${SITE_ORIGIN}/#org` },
        })),
        // The claim as a standalone sentence. If an engine lifts one line off
        // this page, this is the line worth having it lift.
        abstract: study.citableClaim,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case studies',
            item: `${SITE_ORIGIN}${CASE_STUDIES_PATH}`,
          },
          { '@type': 'ListItem', position: 3, name: study.named ? study.client : study.headline, item: url },
        ],
      },
    ],
  };
}

/** Schema for the case studies hub: a list an engine can actually enumerate. */
export function caseStudiesPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_ORIGIN}${CASE_STUDIES_PATH}#page`,
        name: 'Consultico case studies',
        description:
          'Published client results from Consultico, a Glasgow marketing company for UK consumer brands.',
        url: `${SITE_ORIGIN}${CASE_STUDIES_PATH}`,
        publisher: { '@id': `${SITE_ORIGIN}/#org` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: CASE_STUDIES.length,
          itemListElement: CASE_STUDIES.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: study.named ? `${study.client}: ${study.summary}` : study.summary,
            url: `${SITE_ORIGIN}${CASE_STUDIES_PATH}/${study.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case studies',
            item: `${SITE_ORIGIN}${CASE_STUDIES_PATH}`,
          },
        ],
      },
    ],
  };
}
