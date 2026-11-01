/**
 * The site's navigation, in one place, so the menu and the footer can never
 * disagree about what exists.
 *
 * Loop is the front door. Everything else is still sold and still linked, just
 * more quietly: it sits in the menu's Services group and in the footer, which
 * is the one crawlable index of every service and industry page.
 *
 * LOOP_HREF points at the homepage's Loop section until /loop exists (Deploy 2
 * of the identity plan). Change it here and every link follows.
 */
import { SEO_BY_INDUSTRY_PATH, getIndustryPath, getLiveSeoIndustries } from '@/lib/seo-industries';

export interface NavLink {
  name: string;
  href: string;
}

export const LOOP_HREF = '/#loop';

/** The menu's big items, in order. */
export const PRIMARY_NAV: NavLink[] = [
  { name: 'Meet Loop', href: LOOP_HREF },
  { name: 'Case studies', href: '/case-studies' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/contact' },
];

/** Everything Consultico still sells on its own. */
export const NAV_SERVICES: NavLink[] = [
  { name: 'SEO', href: '/seo' },
  { name: 'GEO', href: '/articles/what-is-generative-engine-optimisation' },
  { name: 'Google Ads', href: '/ppc' },
  { name: 'Websites', href: '/web-development' },
  { name: 'Content', href: '/content-creation' },
  { name: 'Campaigns', href: '/campaign-management' },
  { name: 'Marketing strategy', href: '/market-strategy' },
];

/** The industry and local SEO pages. Kept for search, out of the top level. */
export function getNavIndustries(): NavLink[] {
  return [
    { name: 'SEO in Glasgow', href: '/seo-glasgow' },
    { name: 'SEO by industry', href: SEO_BY_INDUSTRY_PATH },
    ...getLiveSeoIndustries().map((industry) => ({
      name: industry.label,
      href: getIndustryPath(industry),
    })),
  ];
}
