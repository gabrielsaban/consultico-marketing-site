import type { NicheHeroStatCallout } from '@/components/services/NicheHero';

export interface NichePageHeroContent {
  heading: string;
  subhead: string;
  bullets: string[];
  intro: string;
  statCallout?: NicheHeroStatCallout;
}

export const NICHE_HERO_CONTENT: Record<string, NichePageHeroContent> = {
  'seo-for-plumbers': {
    heading: 'SEO for plumbers that fills the diary - not just the rankings.',
    subhead: 'Strategy-led SEO for plumbing and heating businesses that turns local search into booked jobs.',
    bullets: [
      'Win the map pack for emergency plumber near me',
      'Own boiler-repair and installation searches in your area',
      'Stop renting every lead from paid ads when organic can carry the diary',
    ],
    intro:
      'We build local search visibility around the jobs that matter - emergency callouts, boiler repairs and installs - so enquiries keep coming when ad spend pauses. Most plumbers we work with need a clear map pack, service pages and review signals before anything else.',
  },
  'seo-for-electricians': {
    heading: 'SEO for electricians that wins the jobs worth taking.',
    subhead: 'Local SEO for electricians across the UK - from emergency callouts to EV chargers and rewires.',
    bullets: [
      'Rank for emergency electrician and EICR searches in your patch',
      'Build pages that sell higher-value work, not just callouts',
      'Reduce reliance on paid ads for the same local searches',
    ],
    intro:
      'Electricians compete on speed and trust in local search. We fix your Google Business Profile, service pages and local signals so you show up when someone needs an electrician now - and when they are planning a rewire or EV install.',
  },
  'seo-for-heating-engineers': {
    heading: 'SEO for gas and heating engineers that keeps the diary full.',
    subhead: 'Year-round visibility for boiler repairs, services, installs and gas safety work.',
    bullets: [
      'Own boiler repair and service searches in your area',
      'Stay visible through quieter summer months',
      'Build trust signals that match Gas Safe expectations',
    ],
    intro:
      'Heating engineers need steady enquiry flow through winter peaks and quieter months. We build local SEO around the searches that book boilers, services and safety work - not vanity rankings nobody calls from.',
  },
  'seo-for-dentists': {
    heading: 'SEO for dentists that fills the chair with the right patients.',
    subhead: 'Local search for private, cosmetic and NHS-facing dental practices across the UK.',
    bullets: [
      'Win local searches for the treatments that pay your bills',
      'Build trust before the first appointment',
      'Capture demand from patients who cannot get NHS care',
    ],
    intro:
      'Dental practices live on local trust and treatment mix. We help you rank for the searches that bring private and cosmetic patients - with clear pages, reviews and local signals that match how people choose a dentist.',
    statCallout: {
      stat: '13 million adults in England - 28% of the adult population - had an unmet need for NHS dentistry in 2024',
      attribution: 'British Dental Association, July 2024',
      sourceHref:
        'https://www.bda.org/news-and-opinion/news/13-million-unmet-need-for-nhs-dentistry-breaks-records/',
    },
  },
  'seo-for-estate-agents': {
    heading: 'SEO for estate agents that wins instructions, not just portal traffic.',
    subhead: 'Local visibility for vendor and landlord enquiries when sellers choose their agent on Google.',
    bullets: [
      'Get onto the shortlist when sellers search locally',
      'Build area pages that win instructions, not just views',
      'Turn reviews and local trust into vendor enquiries',
    ],
    intro:
      'Portals bring buyers. Instructions come from vendors who search, compare and shortlist agents on Google. We build the local SEO that puts your agency on that list when fees actually get decided.',
    statCallout: {
      stat: '49% of sellers invite three agents to value their home before choosing one',
      attribution: 'Zoopla/YouGov survey of recent sellers, August 2025',
      sourceHref:
        'https://www.zoopla.co.uk/discover/selling/how-many-estate-agents-should-you-speak-to-before-selling-your-home/',
    },
  },
  'seo-for-accountants': {
    heading: 'SEO for accountants that wins the clients worth keeping.',
    subhead: 'Local and specialist search for accountancy firms - including Making Tax Digital demand.',
    bullets: [
      'Rank for the services and client types you actually want',
      'Capture MTD-related searches before competitors publish',
      'Build authority that supports long-term client value',
    ],
    intro:
      'Accountancy SEO works when it targets the right client economics - not generic traffic. We build local and specialist visibility around the services and search moments that bring retained clients, not one-off queries.',
    statCallout: {
      stat: 'The Making Tax Digital threshold falls from £50,000 to £30,000 in April 2027, and to £20,000 in April 2028',
      attribution: 'HMRC guidance, GOV.UK',
      sourceHref:
        'https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax',
    },
  },
};

export const GLASGOW_HERO_CONTENT: NichePageHeroContent = {
  heading: 'SEO agency in Glasgow that turns search into enquiries.',
  subhead: 'Glasgow-based SEO that gets you into the map pack and the results beneath it.',
  bullets: [
    'Local SEO for Glasgow and central Scotland',
    'Honest expectations tied to enquiries, not vanity rankings',
    'Strategy-first work from Strathclyde Inspire in the city centre',
  ],
  intro:
    'We help Glasgow businesses get found on Google and in AI search tools - with technical foundations, local content and the visibility that brings enquiries. SEO done well compounds, so the cost of winning a customer falls as your visibility grows.',
};
