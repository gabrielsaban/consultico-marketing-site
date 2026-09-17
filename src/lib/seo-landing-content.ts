import { CONSULTICO_GBP_URL } from '@/lib/contact';
import { ppcPageGoogleReviews } from '@/lib/google-reviews';

/** Locked copy for the discovery landing page (Final Figma page). */

export const SEO_LANDING_HERO = {
  setupLine1: 'When people',
  punchLine: 'Get discovered.',
  primaryCta: { label: 'Get in touch', href: '#get-in-touch' },
  secondaryCta: { label: 'Learn more', href: '#channels' },
  blueBand:
    'Your buyer searches, asks AI, checks the map, and scrolls your feed. Be there every time.',
  /** Frame 10 → Frame 8 rotate states (auto-cycle with synced phone graphic). */
  rotateStates: [
    {
      id: 'google',
      before: 'Search on ',
      accent: 'Google',
      graphic: 'google' as const,
    },
    {
      id: 'ai',
      before: 'Use ',
      accent: 'AI for advice',
      graphic: 'ai' as const,
    },
    {
      id: 'maps',
      before: 'Discover on ',
      accent: 'Maps',
      graphic: 'maps' as const,
    },
    {
      id: 'instagram',
      before: 'Explore ',
      accent: 'Instagram',
      graphic: 'instagram' as const,
    },
  ],
} as const;

export type SeoHeroGraphic = (typeof SEO_LANDING_HERO.rotateStates)[number]['graphic'];

export const SEO_LANDING_STATS = [
  { value: '300+', label: 'Pages optimised', icon: 'pages' as const },
  { value: '900%', label: 'AI citations', icon: 'ai' as const },
  { value: '4x', label: 'Weekly search impressions', icon: 'impressions' as const },
  { value: '400+', label: 'Page-one rankings', icon: 'rankings' as const },
] as const;

/** Farzin Data-page long teasers for channel detail modals. */
export const SEO_LANDING_CHANNELS = [
  {
    id: 'seo',
    eyebrow: 'SEO',
    heading: 'Google brings buyers straight to you',
    body: 'Google learns exactly what you do and where. The people who find you are already searching to buy. See the tried and tested way to get visible online.',
    ctaLabel: 'See how SEO works',
    detailHeading: 'Google sends you buyers',
    detailBody:
      'Someone types your service and your town into Google. We build your site so Google understands exactly who you are and what you do. Your page becomes the one that answers them, so the enquiries arrive from people already looking to buy.',
    media: '/seo-landing/media-seo.png',
    personAlt: 'Person checking search results on their phone',
  },
  {
    id: 'geo',
    eyebrow: 'GEO',
    heading: 'Become the answer AI gives',
    body: 'Buyers ask AI who to use before they ask anyone else. Your business becomes the answer it gives back.',
    ctaLabel: 'See how GEO works',
    detailHeading: 'Get recommended by the AI',
    detailBody:
      'More people now ask AI for a recommendation instead of scrolling Google, and they trust the answer they get. We shape how AI reads and describes your business, so when someone asks who to use, your name is the one it gives back.',
    media: '/seo-landing/media-geo.png',
    personAlt: 'Person using a phone for an AI recommendation',
  },
  {
    id: 'maps',
    eyebrow: 'Maps',
    heading: 'Own the map in your area',
    body: 'Your listing moves into the Maps top three. That is where nearby buyers choose, and they call straight from it.',
    ctaLabel: 'See how local works',
    detailHeading: 'Own the map in your area',
    detailBody:
      'When someone needs a job done nearby, they open Maps and pick from the top three. We keep your details consistent, your profile active, and your reviews coming, so Google puts you in that shortlist and the calls come straight through.',
    media: '/seo-landing/media-maps.png',
    personAlt: 'Person checking a map on their phone',
  },
  {
    id: 'instagram',
    eyebrow: 'Instagram',
    heading: 'Social proof finishes the job',
    body: 'Your work becomes live proof. Buyers check before they enquire, and so does AI. Both find a reason to pick you.',
    ctaLabel: 'See how social works',
    detailHeading: 'Your social feeds the rest',
    detailBody:
      'People check your profile before they enquire, and so does AI. Live proof of your work builds the trust that closes the sale, gives AI more to quote about you, and pushes the branded searches that lift everything else you have built.',
    media: '/seo-landing/media-instagram.png',
    personAlt: 'Person browsing a social feed on their phone',
  },
] as const;

export type SeoChannelId = (typeof SEO_LANDING_CHANNELS)[number]['id'];

const fullByCompany = {
  boiler: ppcPageGoogleReviews.find((r) => r.company.includes('Boiler'))!,
  ellc: ppcPageGoogleReviews.find((r) => r.company.includes('Easy Line'))!,
  mcd: ppcPageGoogleReviews.find((r) => r.company.includes('MCD'))!,
};

/** Card teasers match homepage ReviewStrip excerpts; modals use full GBP text. */
export const SEO_LANDING_STORIES = [
  {
    id: 'boiler-co',
    name: 'The Boiler Co',
    sector: 'Heating and plumbing',
    teaser:
      'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
    quote: fullByCompany.boiler.quote,
    reviewer: fullByCompany.boiler.name,
    logo: '/seo-landing/logo-boiler-co.png',
    logoBg: '#A8E6CF',
  },
  {
    id: 'ellc',
    name: 'ELLC',
    sector: 'Building products',
    teaser:
      "Together they've got Easyline ranking on page 1 of Google for multiple keywords. Reliable, efficient, and results-driven.",
    quote: fullByCompany.ellc.quote,
    reviewer: fullByCompany.ellc.name,
    logo: '/seo-landing/logo-ellc.png',
    logoBg: '#F5C7A9',
  },
  {
    id: 'mcd-gas',
    name: 'MCD Gas',
    sector: 'Gas engineering',
    teaser:
      'Paul is always available, delivering fast, effective support. They built a professional website, launched a successful Google Ads campaign, and now handle all my marketing with precision and care.',
    quote: fullByCompany.mcd.quote,
    reviewer: fullByCompany.mcd.name,
    logo: '/seo-landing/logo-mcd.png',
    logoBg: '#111111',
  },
] as const;

export const SEO_LANDING_GBP_URL = CONSULTICO_GBP_URL;

export const SEO_LANDING_QUOTE =
  'Strategy-led specialists, so you can get back to running the business you built.';

export const SEO_LANDING_CONTACT = {
  heading: 'Get in touch',
  submitLabel: 'Submit',
  whatsappLabel: 'Chat on WhatsApp',
} as const;
