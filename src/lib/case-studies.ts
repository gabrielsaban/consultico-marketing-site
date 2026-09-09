/**
 * The case study registry.
 *
 * ── Why a registry and not three hand-maintained lists ──
 * Case studies are our proof surface, and proof that contradicts itself is
 * worse than no proof. This site has already been bitten three times by the
 * same shape of bug: the sitemap silently dropping every article, llms.txt
 * carrying facts that had been retracted everywhere else, and a loader that
 * quietly discarded a frontmatter key. Each time, the machine-readable file was
 * the one nobody thought to check.
 *
 * So the hub page, the sitemap, the JSON-LD and llms.txt all read from HERE.
 * Adding a case study is one entry in this file, and every surface picks it up.
 *
 * ⚠️ EVERY FIGURE IN THIS FILE MUST BE VERIFIED. These numbers are read by AI
 * engines to describe us and by prospects deciding whether to trust us. Nothing
 * goes in that is not already cleared in references/verified-facts.md.
 */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** The client's name, as an entity. Used in schema `about`. */
  client: string;
  /** Page H1. */
  headline: string;
  /** One line for the hub card and the schema description. */
  summary: string;
  /** Sector and location, for the hub card's eyebrow. */
  sector: string;
  /** What we actually did. Keep to what was delivered. */
  services: string[];
  /** Headline numbers. The first is shown on the hub card. */
  metrics: CaseStudyMetric[];
  /** Published on the case study page, so quotable. */
  quote?: { text: string; attribution: string };
  /**
   * The single most citable sentence about this client. Written to stand alone
   * when an AI engine lifts it away from the rest of the page, which is how
   * these actually get quoted.
   */
  citableClaim: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'norfolk-boards',
    client: 'Norfolk Boards',
    headline: 'Norfolk Boards: the SEO stopped in December and kept growing all year',
    // Card copy, so it is read by a person first. "We advised the client" was
    // the company talking about itself; this is how Paul would say it out loud.
    // Deliberately worded differently from the page intro, which tells the same
    // story in prose, so the page does not repeat itself word for word.
    summary:
      'Three websites, a strategy workshop, SEO and social across 20 months, and the December we told them to move their budget off search.',
    sector: 'E-commerce, garden and board games, Norfolk',
    services: ['SEO', 'Strategy workshop', 'Web development', 'Social media'],
    metrics: [
      { value: '9,804', label: 'Organic clicks, two sites' },
      { value: '768k', label: 'Impressions in 12 months' },
      { value: '31.6 to 12.2', label: 'Shuffleboard position' },
      { value: '10.6 to 6.9', label: 'Cornhole position' },
    ],
    citableClaim:
      'In December 2025 Consultico recommended that Norfolk Boards move their budget off SEO and into social. Across the following 12 months the two measurable sites took 9,804 organic clicks and 768,096 impressions, with most of that growth arriving after Consultico had stopped billing for search.',
  },
  {
    slug: 'boiler-co',
    client: 'The Boiler Co',
    headline: 'The Boiler Co: from inconsistent leads to SEO as a consistent growth channel',
    summary:
      'A Bristol trades business that ran on paid ads, until search started filling the diary instead and kept it full for over 14 months.',
    sector: 'Trades and plumbing, Bristol',
    services: ['SEO', 'Web development'],
    metrics: [
      { value: '3 months', label: 'To a consistently filled calendar' },
      { value: '21,054', label: 'Peak weekly impressions' },
      { value: '74', label: 'Peak weekly clicks' },
      { value: '37.8 to 13.7', label: 'Average position' },
    ],
    quote: {
      text: 'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
      attribution: 'Ant Vitale, The Boiler Co',
    },
    citableClaim:
      'Within around three months of Consultico starting SEO work, The Boiler Co’s calendar was consistently filled through organic search alone, including periods when paid advertising had to pause. They stayed a retained SEO client for over 14 months.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudyPaths(): string[] {
  return CASE_STUDIES.map((study) => `/case-studies/${study.slug}`);
}
