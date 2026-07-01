import { getIndustryPath } from '@/lib/seo-industries';

export const SEO_FOR_ELECTRICIANS_SLUG = 'seo-for-electricians';
export const SEO_FOR_ELECTRICIANS_PATH = getIndustryPath(SEO_FOR_ELECTRICIANS_SLUG);

export const BOILER_CO_CASE_STUDY_PATH = '/case-studies/boiler-co';

/** Visible FAQ copy (section 3 of brief). */
export const SEO_FOR_ELECTRICIANS_FAQS = [
  {
    question: 'How long does SEO take to get an electrician more jobs?',
    answer:
      'Most electrical businesses see movement in local rankings within two to three months and a meaningful change in enquiries by month three to six. For a trades client we work with, a plumbing and heating firm, organic filled the calendar within roughly three months when paid ads were paused. Timescales depend on your area\'s competition and the state of your current website and profile.',
  },
  {
    question: 'Is SEO or Google Ads better for electricians?',
    answer:
      'Google Ads buys jobs the day you switch it on but stops when you stop paying, and it favours emergency call-outs. SEO takes longer to build but keeps generating enquiries without a cost per click, including planned work like EICRs and EV chargers. Most electricians want ads for emergencies now and SEO to lower their cost per job over time.',
  },
  {
    question: 'What is the most important SEO factor for a local electrician?',
    answer:
      'Your Google Business Profile. For searches like "electrician near me", the map pack sits above the normal results, and a complete profile with consistent details, your NICEIC or NAPIT registration and steady reviews is what gets you into it. It is the single highest-return thing most electricians can fix first.',
  },
  {
    question: 'Can SEO help win more EICR and EV charger work, not just emergencies?',
    answer:
      'Yes, and that is where the margin is. Private landlords must obtain an EICR at least every five years or face fines of up to £30,000 (GOV.UK, 2020), and EV charger demand is growing fast. Dedicated pages for EICRs, EV charger installation and rewires capture higher-value planned jobs that emergency-only marketing misses.',
  },
  {
    question: 'Do I need a new website for electrician SEO to work?',
    answer:
      'Usually no. Most electricians\' sites can rank far better with the existing pages fixed, clear service and area pages, your certifications shown, faster mobile loading, proper local information. We start with what you have and only suggest a rebuild when the current site is genuinely holding you back.',
  },
  {
    question: 'How much does SEO for electricians cost?',
    answer:
      'It depends on your area\'s competition and how much groundwork your site needs. We work to your unit economics: a full rewire or EV charger install is worth far more than a call-out, so even a handful of extra planned jobs a month pays for the work many times over. You will get a plain figure and the reasoning before you commit.',
  },
] as const;

/** FAQ copy for JSON-LD (section 2 of brief). */
export const SEO_FOR_ELECTRICIANS_FAQS_SCHEMA = [
  {
    question: 'How long does SEO take to get an electrician more jobs?',
    answer:
      'Most electrical businesses see movement in local rankings within two to three months and a meaningful change in enquiries by month three to six. For one trades client we work with, a plumbing and heating firm, organic search filled the calendar within roughly three months when paid ads were paused. Timescales depend on your area\'s competition and the state of your current website and Google Business Profile.',
  },
  {
    question: 'Is SEO or Google Ads better for electricians?',
    answer:
      'Google Ads buys jobs the day you switch it on but stops the moment you stop paying, and it favours emergency call-outs. SEO takes longer to build but keeps generating enquiries without a cost per click, including the planned work like EICRs and EV chargers. Most electricians are best served by ads for emergencies now and SEO to lower their cost per job over time.',
  },
  {
    question: 'What is the most important SEO factor for a local electrician?',
    answer:
      'Your Google Business Profile. For searches like \'electrician near me\' the map pack sits above the normal results, and a complete, active profile with consistent name, address and phone details, your NICEIC or NAPIT registration and steady reviews is what gets you into it. It is the single highest-return thing most electricians can fix first.',
  },
  {
    question: 'Can SEO help win more EICR and EV charger work, not just emergencies?',
    answer:
      'Yes, and that is where the margin is. Private landlords must obtain an EICR at least every five years or face fines of up to 30,000 pounds (GOV.UK, 2020), and EV charger demand is growing fast. Dedicated pages for EICRs, EV charger installation and rewires capture higher-value, planned jobs that emergency-only marketing misses.',
  },
  {
    question: 'Do I need a new website for electrician SEO to work?',
    answer:
      'Usually no. Most electricians\' websites can rank far better with the existing pages fixed: clear service and area pages, your certifications shown, faster loading on mobile, and proper local information. We start with what you have and only recommend a rebuild when the current site is genuinely holding you back.',
  },
  {
    question: 'How much does SEO for electricians cost?',
    answer:
      'It depends on how competitive your area is and how much groundwork your website needs. Consultico works to your unit economics: a full rewire or EV charger install is worth far more than an emergency call-out, so even a handful of extra planned jobs a month pays for the work many times over. We give you a plain figure and the thinking behind it before you commit.',
  },
] as const;

export const ELECTRICIAN_SEO_PAIN_POINTS = [
  {
    title: 'Renting leads from directories',
    body: 'Checkatrade, MyBuilder and Rated People sell the same enquiry to several electricians, so you pay repeatedly for shared, low-margin work instead of owning your local search.',
  },
  {
    title: 'An incomplete Google Business Profile',
    body: 'the map pack sits above the normal results for local searches, and most electricians never finish setting theirs up or showing their NICEIC or NAPIT registration.',
  },
  {
    title: 'Ranking only for emergencies',
    body: 'a site built around call-outs misses the planned, higher-value work, EICRs, rewires, consumer units and EV chargers, that is searched with real buying intent.',
  },
] as const;

export const ELECTRICIAN_SEO_COVERAGE = [
  {
    title: 'Google Business Profile and the map pack',
    body: 'For local electrical searches, your Google Business Profile is the highest-return thing to fix first. We complete and optimise it, keep your name, address and phone details consistent everywhere, show your NICEIC or NAPIT registration, and build a steady review habit, the signals that get you into the three-result map pack where the calls come from.',
  },
  {
    title: 'Service pages for planned, higher-value work',
    body: 'We build clear pages for the jobs worth most: EICRs and landlord electrical safety, EV charger installation, rewires, consumer unit upgrades and fault finding. These are searched with intent, and dedicated pages win them instead of a single vague "services" page that ranks for nothing.',
  },
  {
    title: 'Local and technical SEO',
    body: 'We make sure your site earns its rankings: pages for each service and the towns you cover, your Part P and certifications shown clearly, fast loading on mobile where most emergency searches happen, and clean local information Google can trust.',
  },
  {
    title: 'Content that answers what customers ask',
    body: 'We build content around the real questions customers search, "how much does a rewire cost", "do I need an EICR to rent my house", so you get found earlier and trusted sooner. Useful content is also what AI search tools like ChatGPT and Google\'s AI Overviews quote when people ask them to recommend an electrician.',
  },
  {
    title: 'Honest measurement',
    body: 'We track what matters, enquiries and booked jobs, not just rankings. If something is not earning its place, we say so.',
  },
] as const;

export const ELECTRICIAN_SEO_PROCESS_STEPS = [
  {
    title: 'A look at your numbers and your market.',
    body: 'Your average job value across emergency and planned work, your area\'s competition, and where your site and profile stand today, so any recommendation is grounded in what a job is actually worth to you.',
  },
  {
    title: 'Fix the foundations first.',
    body: 'Google Business Profile, your certifications shown, the highest-impact website fixes and your key service pages, the work that moves enquiries fastest.',
  },
  {
    title: 'Build and measure.',
    body: 'Content and authority over time, weighted towards the higher-value planned work, reported against booked jobs, not vanity metrics.',
  },
] as const;

export const BOILER_CO_TRADES_TESTIMONIAL = {
  quote:
    'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
  name: 'Ant Vitale',
  company: 'The Boiler Co',
} as const;
