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
        'https://www.google.com/maps/place/Consultico/@55.8609282,-4.2443981,641m/data=!3m3!1e3!4b1!5s0x488846a710ae8043:0x4c27d014396277a0!4m6!3m5!1s0x23d34cdec57c3e91:0x69bb0edabecd9001!8m2!3d55.8609282!4d-4.2418232!16s%2Fg%2F11ldh2jgj6',
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
