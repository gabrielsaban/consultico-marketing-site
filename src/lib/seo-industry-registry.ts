import type { SeoIndustryPageData } from '@/lib/seo-industry-types';
import { NICHE_HERO_CONTENT } from '@/lib/niche-hero-content';
import {
  PLUMBER_SEO_COVERAGE,
  PLUMBER_SEO_PAIN_POINTS,
  PLUMBER_SEO_PROCESS_STEPS,
  SEO_FOR_PLUMBERS_FAQS,
  SEO_FOR_PLUMBERS_PATH,
  SEO_FOR_PLUMBERS_SLUG,
} from '@/lib/seo-for-plumbers';
import {
  ELECTRICIAN_SEO_COVERAGE,
  ELECTRICIAN_SEO_PAIN_POINTS,
  ELECTRICIAN_SEO_PROCESS_STEPS,
  SEO_FOR_ELECTRICIANS_FAQS,
  SEO_FOR_ELECTRICIANS_PATH,
  SEO_FOR_ELECTRICIANS_SLUG,
  BOILER_CO_TRADES_TESTIMONIAL,
  BOILER_CO_CASE_STUDY_PATH,
} from '@/lib/seo-for-electricians';
import {
  HEATING_ENGINEER_SEO_COVERAGE,
  HEATING_ENGINEER_SEO_PAIN_POINTS,
  HEATING_ENGINEER_SEO_PROCESS_STEPS,
  SEO_FOR_HEATING_ENGINEERS_FAQS,
  SEO_FOR_HEATING_ENGINEERS_PATH,
  SEO_FOR_HEATING_ENGINEERS_SLUG,
  BOILER_CO_TESTIMONIAL,
} from '@/lib/seo-for-heating-engineers';
import {
  DENTIST_SEO_COVERAGE,
  DENTIST_SEO_PAIN_POINTS,
  DENTIST_SEO_PROCESS_STEPS,
  SEO_FOR_DENTISTS_FAQS,
  SEO_FOR_DENTISTS_PATH,
  SEO_FOR_DENTISTS_SLUG,
  DENTIST_WELLNESS_PROOF,
  DENTIST_WORKSHOP_TESTIMONIAL,
} from '@/lib/seo-for-dentists';
import {
  ESTATE_AGENT_SEO_COVERAGE,
  ESTATE_AGENT_SEO_PAIN_POINTS,
  ESTATE_AGENT_SEO_PROCESS_STEPS,
  SEO_FOR_ESTATE_AGENTS_FAQS,
  SEO_FOR_ESTATE_AGENTS_PATH,
  SEO_FOR_ESTATE_AGENTS_SLUG,
  ESTATE_AGENT_WORKSHOP_TESTIMONIAL,
} from '@/lib/seo-for-estate-agents';
import {
  ACCOUNTANT_SEO_COVERAGE,
  ACCOUNTANT_SEO_PAIN_POINTS,
  ACCOUNTANT_SEO_PROCESS_STEPS,
  SEO_FOR_ACCOUNTANTS_FAQS,
  SEO_FOR_ACCOUNTANTS_PATH,
  SEO_FOR_ACCOUNTANTS_SLUG,
  ACCOUNTANT_PAID_PROOF,
  ACCOUNTANT_WORKSHOP_TESTIMONIAL,
} from '@/lib/seo-for-accountants';

const bodyFromHero = (slug: string) => NICHE_HERO_CONTENT[slug]?.intro ?? '';

export const SEO_INDUSTRY_PAGE_DATA: Record<string, SeoIndustryPageData> = {
  [SEO_FOR_PLUMBERS_SLUG]: {
    slug: SEO_FOR_PLUMBERS_SLUG,
    breadcrumbLabel: 'SEO for Plumbers',
    metadata: {
      title: 'SEO for Plumbers | Get More Jobs from Google | Consultico',
      description:
        'SEO for plumbers that fills the calendar with real jobs, not vanity rankings. Strategy-led, margin-aware, with a documented trades result. UK-wide.',
      path: SEO_FOR_PLUMBERS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_PLUMBERS_SLUG],
    intro: bodyFromHero(SEO_FOR_PLUMBERS_SLUG),
    painHeading: 'Why plumbers lose jobs they should be winning',
    painIntro:
      'When someone\'s boiler fails or a pipe bursts, they don\'t browse; they search, and they call one of the first names they see. If that isn\'t you, the job goes to a competitor who isn\'t necessarily better, just more visible. Three things usually cost plumbers that visibility:',
    painPoints: [...PLUMBER_SEO_PAIN_POINTS],
    painOutro: 'SEO is how you stop renting your leads and start owning the channel that brings them in.',
    coverage: [...PLUMBER_SEO_COVERAGE],
    proof: {
      title: 'Proof it works: The Boiler Co',
      body: 'The Boiler Co is a Bristol plumbing and heating business. When paid ads paused, organic search filled the calendar within roughly three months. Weekly impressions grew from about 8,000 to a peak above 21,000, weekly clicks from about 20 to a peak of 74, and average position from 37.8 to 13.7 across a retained engagement of more than 14 months.',
      quote: BOILER_CO_TRADES_TESTIMONIAL.quote,
      quoteAttribution: `${BOILER_CO_TRADES_TESTIMONIAL.name}, ${BOILER_CO_TRADES_TESTIMONIAL.company}`,
      caseStudyHref: BOILER_CO_CASE_STUDY_PATH,
      caseStudyLabel: 'Read the full Boiler Co case study',
    },
    processSteps: [...PLUMBER_SEO_PROCESS_STEPS],
    marginNote:
      'We\'re margin-aware by default: when a job is worth around £1,200, as it is for one trades business we work with, the maths on a few extra a month is usually straightforward, and if it isn\'t worth it for you, we\'ll tell you.',
    faqs: [...SEO_FOR_PLUMBERS_FAQS],
    uniqueSection: {
      title: 'How plumber SEO differs by search type',
      paragraphs: [
        'Emergency searches need map-pack visibility and fast mobile pages. Planned work - boiler installs, bathroom refits - needs service pages that rank beyond the map pack.',
        'We also link related trades where it helps: many plumbing businesses overlap with heating work. See our SEO for gas and heating engineers if that is part of your offer.',
      ],
      inlineLinks: [
        { label: 'SEO for gas and heating engineers', href: '/seo-for-heating-engineers' },
        { label: 'SEO by industry hub', href: '/seo-by-industry' },
      ],
    },
    cta: {
      title: 'Get more plumbing jobs from Google',
      body: 'Tell us your average job value and the area you cover, and we\'ll tell you honestly whether SEO is worth it for your business, and where the quickest wins are.',
    },
  },
  [SEO_FOR_ELECTRICIANS_SLUG]: {
    slug: SEO_FOR_ELECTRICIANS_SLUG,
    breadcrumbLabel: 'SEO for Electricians',
    metadata: {
      title: 'SEO for Electricians | More Jobs from Google | Consultico',
      description:
        'SEO for electricians across the UK - emergency callouts, EICRs, EV chargers and rewires. Strategy-led, margin-aware, with documented trades results.',
      path: SEO_FOR_ELECTRICIANS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_ELECTRICIANS_SLUG],
    intro: bodyFromHero(SEO_FOR_ELECTRICIANS_SLUG),
    painHeading: 'Why electricians lose jobs they should be winning',
    painIntro:
      'When someone needs an emergency electrician or is planning an EV charger install, they search and call one of the first credible names they see. Three things usually cost electricians that visibility:',
    painPoints: [...ELECTRICIAN_SEO_PAIN_POINTS],
    painOutro: 'SEO is how you show up for both urgent callouts and higher-value planned work.',
    coverage: [...ELECTRICIAN_SEO_COVERAGE],
    proof: {
      title: 'Proof it works: trades SEO in practice',
      body: 'We applied the same local SEO approach to a trades business where planned jobs - not just callouts - matter. Organic visibility grew from roughly 8,000 to a peak above 21,000 weekly impressions, with enquiries continuing when paid ads paused, across more than 14 months of retained work.',
      quote: BOILER_CO_TRADES_TESTIMONIAL.quote,
      quoteAttribution: `${BOILER_CO_TRADES_TESTIMONIAL.name}, ${BOILER_CO_TRADES_TESTIMONIAL.company}`,
      caseStudyHref: BOILER_CO_CASE_STUDY_PATH,
      caseStudyLabel: 'Read the full case study',
    },
    processSteps: [...ELECTRICIAN_SEO_PROCESS_STEPS],
    marginNote:
      'We\'re margin-aware by default: when a rewire or EV charger install is worth far more than a call-out fee, the maths on a few extra jobs a month is usually straightforward - and if it isn\'t worth it for you, we\'ll tell you.',
    faqs: [...SEO_FOR_ELECTRICIANS_FAQS],
    uniqueSection: {
      title: 'Electrician SEO beyond emergency callouts',
      paragraphs: [
        'EV charger and rewire searches behave differently from emergency queries. They need dedicated service pages, not just a strong map pack.',
        'If you also do heating-related electrical work, see our pages for plumbers and heating engineers - many customers search across trades.',
      ],
      inlineLinks: [
        { label: 'SEO for plumbers', href: '/seo-for-plumbers' },
        { label: 'SEO for heating engineers', href: '/seo-for-heating-engineers' },
      ],
    },
    cta: {
      title: 'Get more electrician jobs from Google',
      body: 'Tell us your average job value and the area you cover, and we\'ll tell you honestly whether SEO is worth it for your business.',
    },
  },
  [SEO_FOR_HEATING_ENGINEERS_SLUG]: {
    slug: SEO_FOR_HEATING_ENGINEERS_SLUG,
    breadcrumbLabel: 'SEO for Gas & Heating Engineers',
    metadata: {
      title: 'SEO for Gas & Heating Engineers | More Jobs | Consultico',
      description:
        'SEO for gas and heating engineers across the UK: boiler repairs, servicing, installs and gas safety searches turned into a diary that stays full.',
      path: SEO_FOR_HEATING_ENGINEERS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_HEATING_ENGINEERS_SLUG],
    intro: bodyFromHero(SEO_FOR_HEATING_ENGINEERS_SLUG),
    painHeading: 'Why heating engineers lose jobs they should be winning',
    painIntro:
      'Boiler breakdowns and annual services drive urgent searches. If your profile and site are not visible, those jobs go to whoever ranks first. Three things usually cost heating engineers that visibility:',
    painPoints: [...HEATING_ENGINEER_SEO_PAIN_POINTS],
    painOutro: 'SEO keeps enquiries coming through winter peaks and quieter months.',
    coverage: [...HEATING_ENGINEER_SEO_COVERAGE],
    proof: {
      title: 'Proof it works: The Boiler Co',
      body: 'The Boiler Co needed year-round boiler work, not just breakdown callouts. Organic search filled the diary within roughly three months when paid ads paused, with weekly impressions growing from about 8,000 to a peak above 21,000, across more than 14 months of retained work.',
      quote: BOILER_CO_TESTIMONIAL.quote,
      quoteAttribution: `${BOILER_CO_TESTIMONIAL.name}, ${BOILER_CO_TESTIMONIAL.company}`,
      caseStudyHref: BOILER_CO_CASE_STUDY_PATH,
      caseStudyLabel: 'Read the full Boiler Co case study',
    },
    processSteps: [...HEATING_ENGINEER_SEO_PROCESS_STEPS],
    marginNote:
      'We\'re margin-aware by default: when a new boiler install is worth several thousand pounds, the maths on a few extra jobs a month is usually straightforward - and if it isn\'t worth it for you, we\'ll tell you.',
    faqs: [...SEO_FOR_HEATING_ENGINEERS_FAQS],
    uniqueSection: {
      title: 'Heating engineer SEO through the year',
      paragraphs: [
        'Summer is when most heating businesses should build service and install visibility for the next winter peak. Pages for boiler service, landlord certificates and installs capture demand early.',
        'Gas Safe trust signals matter in search and on-site. We make sure your registration and credentials are visible where customers and Google expect them.',
      ],
      inlineLinks: [
        { label: 'SEO for plumbers', href: '/seo-for-plumbers' },
        { label: 'SEO for electricians', href: '/seo-for-electricians' },
      ],
    },
    cta: {
      title: 'Get more heating jobs from Google',
      body: 'Tell us your average job value and the area you cover, and we\'ll tell you honestly whether SEO is worth it for your business.',
    },
  },
  [SEO_FOR_DENTISTS_SLUG]: {
    slug: SEO_FOR_DENTISTS_SLUG,
    breadcrumbLabel: 'SEO for Dentists',
    metadata: {
      title: 'SEO for Dentists | Get More Private Patients | Consultico',
      description:
        'SEO for dental practices across the UK - private, cosmetic and NHS-facing. Strategy-led local search that fills the chair with the right patients.',
      path: SEO_FOR_DENTISTS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_DENTISTS_SLUG],
    intro: bodyFromHero(SEO_FOR_DENTISTS_SLUG),
    painHeading: 'Why dental practices lose patients they should be winning',
    painIntro:
      'Patients search before they call - especially for private and cosmetic treatment. If your practice is not visible, they book elsewhere. Three things usually cost dentists that visibility:',
    painPoints: [...DENTIST_SEO_PAIN_POINTS],
    coverage: [...DENTIST_SEO_COVERAGE],
    proof: {
      title: DENTIST_WELLNESS_PROOF.title,
      body: DENTIST_WELLNESS_PROOF.body,
    },
    workshopTestimonial: {
      quote: DENTIST_WORKSHOP_TESTIMONIAL.quote,
      attribution: `${DENTIST_WORKSHOP_TESTIMONIAL.name}, ${DENTIST_WORKSHOP_TESTIMONIAL.company}`,
      label: 'Think First workshop testimonial',
    },
    processSteps: [...DENTIST_SEO_PROCESS_STEPS],
    marginNote:
      'We are margin-aware by default. Tell us your average private treatment value and we will tell you honestly whether SEO earns its place for your practice.',
    faqs: [...SEO_FOR_DENTISTS_FAQS],
    uniqueSection: {
      title: 'Dental SEO and NHS waiting-list demand',
      paragraphs: [
        '13 million adults in England - 28% of the adult population - had an unmet need for NHS dentistry in 2024 (British Dental Association, July 2024). Those patients search online before they call.',
        'Private and cosmetic treatment pages need different intent from NHS-facing content. We structure both so you capture the patients that fit your chair time and fee structure.',
      ],
    },
    cta: {
      title: 'Get more dental patients from Google',
      body: 'Tell us your treatment mix and area, and we\'ll tell you honestly whether SEO is worth it for your practice.',
    },
  },
  [SEO_FOR_ESTATE_AGENTS_SLUG]: {
    slug: SEO_FOR_ESTATE_AGENTS_SLUG,
    breadcrumbLabel: 'SEO for Estate Agents',
    metadata: {
      title: 'SEO for Estate Agents | Win More Instructions | Consultico',
      description:
        'SEO for estate and letting agents across the UK: local search, reviews and content that win vendor instructions and landlord enquiries, not portal traffic.',
      path: SEO_FOR_ESTATE_AGENTS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_ESTATE_AGENTS_SLUG],
    intro: bodyFromHero(SEO_FOR_ESTATE_AGENTS_SLUG),
    painHeading: 'Why estate agents lose instructions they should be winning',
    painIntro:
      'Vendors shortlist agents on Google before they invite valuations. If you are not on that list, the instruction goes elsewhere. Three things usually cost agents that visibility:',
    painPoints: [...ESTATE_AGENT_SEO_PAIN_POINTS],
    coverage: [...ESTATE_AGENT_SEO_COVERAGE],
    workshopTestimonial: {
      quote: ESTATE_AGENT_WORKSHOP_TESTIMONIAL.quote,
      attribution: `${ESTATE_AGENT_WORKSHOP_TESTIMONIAL.name}, ${ESTATE_AGENT_WORKSHOP_TESTIMONIAL.company}`,
      label: 'Think First workshop testimonial',
    },
    processSteps: [...ESTATE_AGENT_SEO_PROCESS_STEPS],
    marginNote:
      'We are margin-aware by default. Tell us your average fee per instruction and we will tell you honestly whether SEO earns its place for your agency.',
    faqs: [...SEO_FOR_ESTATE_AGENTS_FAQS],
    uniqueSection: {
      title: 'Estate agent SEO when portals own buyers',
      paragraphs: [
        '49% of sellers invite three agents to value their home before choosing one (Zoopla/YouGov survey of recent sellers, June 2025). That shortlist is increasingly decided on Google, not on Rightmove.',
        'Area pages for vendors and landlords need different content from buyer-facing portal listings. We build the local visibility that wins instructions.',
      ],
      inlineLinks: [
        { label: 'SEO for accountants', href: '/seo-for-accountants' },
        { label: 'Think First strategy workshop', href: '/think-first' },
      ],
    },
    cta: {
      title: 'Win more instructions from Google',
      body: 'Tell us your average fee and patch, and we\'ll tell you honestly whether SEO is worth it for your agency.',
    },
  },
  [SEO_FOR_ACCOUNTANTS_SLUG]: {
    slug: SEO_FOR_ACCOUNTANTS_SLUG,
    breadcrumbLabel: 'SEO for Accountants',
    metadata: {
      title: 'SEO for Accountants | Win Better Clients | Consultico',
      description:
        'SEO for accountancy firms across the UK: local search, specialist service pages and Making Tax Digital demand, aimed at the clients worth keeping.',
      path: SEO_FOR_ACCOUNTANTS_PATH,
    },
    hero: NICHE_HERO_CONTENT[SEO_FOR_ACCOUNTANTS_SLUG],
    intro: bodyFromHero(SEO_FOR_ACCOUNTANTS_SLUG),
    painHeading: 'Why accountancy firms lose clients they should be winning',
    painIntro:
      'Business owners search for an accountant when they start, scale or face MTD deadlines. If you are not visible for those moments, they choose a competitor. Three things usually cost firms that visibility:',
    painPoints: [...ACCOUNTANT_SEO_PAIN_POINTS],
    coverage: [...ACCOUNTANT_SEO_COVERAGE],
    proof: {
      title: ACCOUNTANT_PAID_PROOF.title,
      body: ACCOUNTANT_PAID_PROOF.body,
    },
    workshopTestimonial: {
      quote: ACCOUNTANT_WORKSHOP_TESTIMONIAL.quote,
      attribution: `${ACCOUNTANT_WORKSHOP_TESTIMONIAL.name}, ${ACCOUNTANT_WORKSHOP_TESTIMONIAL.company}`,
      label: 'Think First workshop testimonial',
    },
    processSteps: [...ACCOUNTANT_SEO_PROCESS_STEPS],
    marginNote:
      'We are margin-aware by default. Tell us your average client lifetime value and we will tell you honestly whether SEO earns its place for your firm.',
    faqs: [...SEO_FOR_ACCOUNTANTS_FAQS],
    uniqueSection: {
      title: 'Accountant SEO and Making Tax Digital',
      paragraphs: [
        'Making Tax Digital for Income Tax began in April 2026 for sole traders and landlords with qualifying income over £50,000, and the threshold falls to £30,000 in April 2027 and £20,000 in April 2028 (GOV.UK). Each wave brings people searching for an accountant for the first time.',
        'Clear MTD pages that explain the rules and deadlines capture that demand ahead of firms that have published nothing on it.',
      ],
      inlineLinks: [
        { label: 'SEO for estate agents', href: '/seo-for-estate-agents' },
        { label: 'Think First strategy workshop', href: '/think-first' },
      ],
    },
    cta: {
      title: 'Win the right accountancy clients from Google',
      body: 'Tell us your service mix and area, and we\'ll tell you honestly whether SEO is worth it for your firm.',
    },
  },
};

export function getSeoIndustryPageData(slug: string): SeoIndustryPageData | undefined {
  return SEO_INDUSTRY_PAGE_DATA[slug];
}

export function getAllSeoIndustrySlugs(): string[] {
  return Object.keys(SEO_INDUSTRY_PAGE_DATA);
}
