/**
 * The site's navigation, in one place, so the menu and the footer can never
 * disagree about what exists.
 *
 * Loop is the front door. Everything else is still sold and still linked, just
 * more quietly: services sit in the menu's Services group, and the footer is the
 * one crawlable index of every service and industry page. The local and
 * industry SEO pages are footer-only (Paul, 2026-11-26).
 *
 * LOOP_HREF points at the homepage's Loop section until /loop exists (Deploy 2
 * of the identity plan). Change it here and every link follows.
 */
export interface NavLink {
  name: string;
  href: string;
}

export const LOOP_HREF = '/#loop';

/** The menu's big items, in order. */
export const PRIMARY_NAV: NavLink[] = [
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
  // Pricing sits here, not in PRIMARY_NAV (Paul, 2026-11-23): easy to find, not top level.
  { name: 'Pricing', href: '/pricing' },
];
