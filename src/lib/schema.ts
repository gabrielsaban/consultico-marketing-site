export const SITE_ORIGIN = 'https://www.consultico.co.uk';

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_ORIGIN}/#org`,
      name: 'Consultico',
      legalName: 'Consultico Ltd',
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/brand/logo_main.svg`,
      image: `${SITE_ORIGIN}/og.jpg`,
      email: 'paul@consultico.co.uk',
      // TODO: replace placeholder phone with the real public number in E.164 format before shipping.
      telephone: '+44XXXXXXXXXX',
      founder: { '@type': 'Person', name: 'Paul Wilson' },
      address: {
        '@type': 'PostalAddress',
        name: 'Strathclyde Inspire',
        streetAddress: '50 Richmond Street',
        addressLocality: 'Glasgow',
        postalCode: 'G1 1XN',
        addressCountry: 'GB',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
      ],
      sameAs: [
        'https://www.linkedin.com/company/consultico-ltd/',
        'https://www.instagram.com/consultico_marketing/',
        'https://share.google/gwHkpHQMmiEI8IEUG',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Consultico',
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
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Think First',
          item: `${SITE_ORIGIN}/think-first`,
        },
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
