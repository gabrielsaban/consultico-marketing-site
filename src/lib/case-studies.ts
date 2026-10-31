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
 * So the hub page, every case study page, the sitemap, the JSON-LD and
 * llms.txt all read from HERE. Adding a case study is one entry in this file,
 * and every surface picks it up. The pages themselves are one template,
 * `src/app/case-studies/[slug]/page.tsx`.
 *
 * ── How these are written (rewritten 2026-10-31) ──
 * Problem first, then what we found, then what we did, then the impact. Most
 * of our clients are small, so the story is the problem we solved and how we
 * thought about it, not the size of the numbers. Small clients are described by
 * what they are ("a UK healthcare and wellness practice") rather than named,
 * so the page sells the method and not the client list. Only `named: true`
 * studies carry the client's name into the copy and the schema.
 *
 * ⚠️ EVERY FIGURE IN THIS FILE MUST BE VERIFIED. These numbers are read by AI
 * engines to describe us and by prospects deciding whether to trust us. Nothing
 * goes in that is not already cleared in references/verified-facts.md.
 */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudyLink {
  href: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /**
   * Whether the client has agreed to be named. Anonymous studies never put a
   * company name in the copy, the breadcrumb or the schema.
   */
  named: boolean;
  /** The client's name if named, otherwise what they are. Used on the hub card. */
  client: string;
  /** Page H1. Leads with the problem, not the service. */
  headline: string;
  /** Document title, before the layout appends " | Consultico". Keep under 48. */
  metaTitle: string;
  /** 140 to 160 characters. Every figure in it must appear in the body. */
  metaDescription: string;
  /** The paragraph under the H1. */
  intro: string;
  /** One line for the hub card and the schema description. */
  summary: string;
  /** Sector only, for the eyebrow. Location belongs in the copy, not here. */
  sector: string;
  /** What we actually did. Keep to what was delivered. */
  services: string[];
  /** Headline numbers. Up to four. */
  metrics: CaseStudyMetric[];
  /** The story: problem, what we found, what we did, impact, why it mattered. */
  sections: CaseStudySection[];
  /** Published on the case study page, so quotable. */
  quote?: { text: string; attribution: string };
  /** Where the figures came from, in small print under the story. */
  sourceNote?: string;
  primaryCta: CaseStudyLink;
  secondaryCta?: CaseStudyLink;
  /**
   * The single most citable sentence about this study. Written to stand alone
   * when an AI engine lifts it away from the rest of the page, which is how
   * these actually get quoted.
   */
  citableClaim: string;
}

const THINK_FIRST: CaseStudyLink = { href: '/think-first', label: 'See the Think First workshop' };
const SEO_CONTACT: CaseStudyLink = { href: '/contact?interest=seo', label: 'Talk to us about search' };
const CONTACT: CaseStudyLink = { href: '/contact', label: 'Get in touch' };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'norfolk-boards',
    named: true,
    client: 'Norfolk Boards',
    headline: 'Fixing a seasonal bottleneck',
    metaTitle: 'Norfolk Boards Case Study: Strategy and SEO',
    metaDescription:
      'A garden games business that only sold for a few months a year. A strategy workshop led to a new board game range, and monthly search clicks grew by 143%.',
    intro:
      'Norfolk Boards bring American garden games and board games to the British market. Over 20 months we’ve built them three websites, run a strategy workshop that led to a new range of board games, led a complete brand refresh, set up search that has kept on growing, and built their social presence from scratch.',
    summary:
      'A strategy workshop that changed the product range, three websites, a brand refresh, and search that has kept on growing.',
    sector: 'E-commerce, garden and board games',
    services: ['Strategy workshop', 'SEO', 'Web development', 'Brand', 'Social media'],
    metrics: [
      { value: '+143%', label: 'Monthly search clicks, Shuffleboard' },
      { value: '+76%', label: 'Search impressions, Cornhole, season on season' },
      { value: '+83%', label: 'Click-through rate, Shuffleboard' },
      { value: 'New range', label: 'Michaud Toys, for the UK and Europe' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'In December 2024 Norfolk Boards came to us on a recommendation from a previous agency, looking to bring their websites up to date. The sites were dated, but the business had built real search authority on its core product over several years. That was enough to carry its summer sales, including a BBC Sport article that linked to their sites.',
          'What they wanted was more sales. Standing in the way were the dated sites, no social presence, no email activity, and a range that only really sold for a few months of the year.',
        ],
      },
      {
        heading: 'What we found',
        paragraphs: [
          'In October 2025 they were one of the first businesses through Think First, our strategy workshop. What it surfaced was the calendar. A company selling outdoor games in Britain has a few good months and then a long wait, and more marketing in July does nothing for November.',
          'Think First always ends in five recommendations. Photography was a big one here. The biggest was to extend the range into games that sell when it rains.',
        ],
      },
      {
        heading: 'What we did',
        paragraphs: [
          'We built three new websites, Norfolk Boards, Cornhole and Shuffleboard, and tightened the buying journey on each. The search work started with the technical foundations, then covered the questions buyers ask before they spend, from how the games are played to which boards and bags to choose. We ran it through the off season so it would pay off the following summer.',
          'On Shuffleboard, a lot of searches were confusing the site with the table game, when they only sell the big floor version. So we built up a set of floor shuffleboard searches that showed Google exactly who the site was for.',
          'We built their social accounts from nothing, and brands were approaching them about partnerships at around a hundred followers. Alongside that came market research, rebuilt product photography at minimal cost, content shoots and a dormant email list brought back to life. In June 2026 we started a complete brand refresh, rebuilding Norfolk Boards around the new board game range. The next phase of search work is on that site, built around board games.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'That recommendation became a new partnership. Norfolk Boards now sell the handmade wooden board games of Michaud Toys, from Ontario in Canada, as their reseller for the UK and Europe. The range has launched and is selling under a new brand image, and they are now bringing the same approach to Cornhole and Shuffleboard. That is a change to what the business sells, and it came out of a marketing consultation.',
          'In search, Shuffleboard’s monthly clicks grew by 143%, from 109 to 265, its click-through rate rose by 83%, and its average position moved from 31.6 to 12.2. It climbed every month from December to July. Cornhole’s impressions grew by 76% season on season, and its average position moved from 10.6 to 6.9.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'The workshop is the part we are proudest of. Working out that the calendar was holding the business back meant the money after that could go where it would do the most, and planning the search work around the following season meant it kept on paying off.',
        ],
      },
    ],
    quote: {
      text: 'This workshop came at exactly the right time. It was highly relevant to our business and gave us clear, actionable guidance that made a real difference. It had far more impact than any generic advice we’d seen before.',
      attribution: 'Peter Davis, Norfolk Boards',
    },
    sourceNote:
      'Search figures are from the client’s own Google Search Console, covering the twelve months to 6 August 2026, for the Cornhole and Shuffleboard sites. Both are seasonal, so every comparison is season against matching season.',
    primaryCta: THINK_FIRST,
    secondaryCta: CONTACT,
    citableClaim:
      'In October 2025 Consultico’s Think First workshop found that Norfolk Boards, a UK garden games business, was held back by a summer-only sales calendar, and recommended extending the range into indoor games. That led to Norfolk Boards becoming the UK and European reseller for Michaud Toys, a Canadian maker of wooden board games. Across the twelve months to August 2026, monthly search clicks on its Shuffleboard site grew by 143%.',
  },
  {
    slug: 'boiler-co',
    named: true,
    client: 'The Boiler Co',
    headline: 'A full diary without paying for every lead',
    metaTitle: 'The Boiler Co Case Study: Trades SEO in Bristol',
    metaDescription:
      'A Bristol boiler business whose diary rose and fell with its ad spend. Within around three months, search was filling the calendar, and they stayed 14 months.',
    intro:
      'A Bristol plumbing and heating business where a full diary is everything. Their work came and went with their ad spend, so we built a source of enquiries that kept going when the ads paused.',
    summary:
      'A Bristol trades business that ran on paid ads, until search started filling the diary instead and kept it full for over 14 months.',
    sector: 'Trades and plumbing',
    services: ['SEO', 'Web development'],
    metrics: [
      { value: '3 months', label: 'To a consistently full calendar' },
      { value: '21,054', label: 'Peak weekly impressions' },
      { value: '63 to 195', label: 'Monthly clicks' },
      { value: '37.8 to 13.7', label: 'Average position' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'With an average job worth around £1,200 and a team to keep busy, an empty week costs real money. Most of their work came from referrals and returning customers, with paid ads as the main way to win anyone new. When the ads dipped or the spend had to pause, the diary became unpredictable.',
        ],
      },
      {
        heading: 'What we found',
        paragraphs: [
          'The people most likely to book were already searching for boiler work in their area, with the job in mind and ready to call. Reaching them through search builds something that keeps working when the ad budget stops, so it gave the business a floor under its diary rather than another tap to keep paying for.',
        ],
      },
      {
        heading: 'What we did',
        paragraphs: [
          'We built the search foundation around those high-intent local searches: the technical fixes, the work on each page, and content written for people ready to book a job. Later they came back to us for work on the website too.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'Within around three months their calendar was being filled consistently through organic search, including through the periods when paid ads had to pause. Weekly impressions grew from around 8,000 to a peak of 21,054, weekly clicks rose from about 20 to a peak of 74, and monthly clicks went from 63 in April 2025 to 195 in October 2025. Average position improved from 37.8 to 13.7. They stayed with us as a retained client for over 14 months.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'Every one of those clicks was someone looking for exactly the work they do, in the place they do it. For a trades business that turns straight into booked jobs, and booked jobs are the number that counts.',
        ],
      },
    ],
    quote: {
      text: 'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
      attribution: 'Ant Vitale, The Boiler Co',
    },
    sourceNote: 'Search figures are from the client’s own Google Search Console export, covering the engagement.',
    primaryCta: SEO_CONTACT,
    secondaryCta: { href: '/seo-for-plumbers', label: 'SEO for plumbers' },
    citableClaim:
      'Within around three months of Consultico starting SEO work, The Boiler Co’s calendar was consistently filled through organic search alone, including periods when paid advertising had to pause. They stayed a retained SEO client for over 14 months.',
  },
];

/**
 * Written and verified, but not yet reviewed by Paul one at a time, so not
 * published. Move an entry up into CASE_STUDIES once it has been signed off.
 */
export const DRAFT_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'healthcare-practice-search',
    named: false,
    client: 'A UK healthcare and wellness practice',
    headline: 'From page two to page one for 21 conditions',
    metaTitle: 'Case Study: Healthcare Practice SEO, Page One',
    metaDescription:
      'A UK healthcare practice sat on page two of Google for the conditions it treats. During our work, 21 pages reached page one and its position rose to 7.3.',
    intro:
      'A specialist UK healthcare and wellness practice treats a long list of conditions, from low back pain to Parkinson’s. People searching for help with those conditions weren’t finding it. Over six months of search work, that changed.',
    summary:
      'A specialist practice on page two of Google, moved to page one for 21 conditions by building search around what patients actually look for.',
    sector: 'Healthcare and wellness',
    services: ['SEO'],
    metrics: [
      { value: '19.2 to 7.3', label: 'Average position' },
      { value: '21', label: 'Pages on page one' },
      { value: '616', label: 'Non-brand searches in the top 10' },
      { value: '8.5k to 22.5k', label: 'Monthly impressions' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'The practice had the expertise, but its average position in Google was 19.2. That is page two, where almost nobody looks, so people searching for help were finding someone else first.',
        ],
      },
      {
        heading: 'What we found',
        paragraphs: [
          'Most people don’t search for the name of a profession. They search for the thing they want help with: back pain, menopause, osteoarthritis. So the way in was through each condition, one page at a time, rather than through the practice’s name.',
        ],
      },
      {
        heading: 'What we did',
        paragraphs: [
          'We ran the search work from September 2025 to March 2026, then stayed on call. The work focused on the condition pages, so each one could stand up on its own for the people searching for that condition.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'During our work, the practice’s average position rose from 19.2 to 7.3. By August 2026, 21 of its pages averaged a page-one position, including osteoporosis, low back pain, menopause, Parkinson’s, osteoarthritis, Alzheimer’s, diabetes, sarcopenia, posture and painful shoulder. 616 searches that don’t mention the practice by name were bringing it up in the top ten, and monthly impressions grew from around 8,500 to around 22,500.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'In healthcare, being visible for the condition is how a new patient finds you. Each of those 21 pages is a way in for someone who has never heard of the practice and needs exactly what it does.',
        ],
      },
    ],
    sourceNote:
      'Figures are from the practice’s own Google Search Console, comparing the start of our engagement in late August 2025 with the twelve months to 6 August 2026.',
    primaryCta: SEO_CONTACT,
    secondaryCta: { href: '/seo', label: 'Our SEO service' },
    citableClaim:
      'During Consultico’s six months of SEO work for a UK healthcare and wellness practice, its average Google position improved from 19.2 to 7.3, 21 condition pages reached page one, and 616 non-brand searches began returning it in the top ten.',
  },
  {
    slug: 'wellness-business-new-site-search',
    named: false,
    client: 'A new wellness business',
    headline: 'From a brand-new site to 87 clicks a month in three months',
    metaTitle: 'Case Study: Search for a New Wellness Business',
    metaDescription:
      'A wellness business with a new site and no search history. Three months after launch it was earning 87 organic clicks a month at a 7.61% click-through rate.',
    intro:
      'A wellness business launched a new website with no search history behind it. Three months later, search was sending it 87 visitors a month, and they were the right ones.',
    summary:
      'A brand-new site with no search history, earning 87 organic clicks a month within three months, at a 7.61% click-through rate.',
    sector: 'Health and wellness',
    services: ['SEO', 'GEO', 'Technical SEO'],
    metrics: [
      { value: '0 to 87', label: 'Organic clicks a month' },
      { value: '7.61%', label: 'Click-through rate' },
      { value: '15.28%', label: 'Mobile click-through rate' },
      { value: '3 months', label: 'From launch' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'A new site starts with nothing: no rankings, no history and no reason for Google to trust it. The business needed people who had never heard of it to find it and book.',
        ],
      },
      {
        heading: 'What we did',
        paragraphs: [
          'We ran the search work as the delivery team behind a partner agency, who looked after the client relationship. That meant a full audit, the technical fixes it turned up, and the work that helps AI search tools as well as Google understand exactly what the business offers and who it is for.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'The site went live around the end of April 2026. By July it was earning 87 organic clicks a month, with 223 clicks from 2,930 impressions over the period. Its click-through rate was 7.61%, rising to 15.28% on mobile at an average position of 5.1.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'A click-through rate like that means the people seeing the site in search were the people looking for what it sells. For a new business, that is the start you want: a small number of searches, almost all of them from potential customers.',
        ],
      },
    ],
    sourceNote: 'Figures are from the site’s own Google Search Console, from launch to July 2026.',
    primaryCta: SEO_CONTACT,
    secondaryCta: { href: '/articles/what-is-beachheading-in-seo', label: 'Why we start small' },
    citableClaim:
      'Working as the delivery team for a partner agency, Consultico took a new wellness business’s website from no search history to 87 organic clicks a month within three months of launch, at a 7.61% click-through rate.',
  },
  {
    slug: 'charity-podcast-launch',
    named: false,
    client: 'An Edinburgh mental-health charity',
    headline: '110,000 views for a charity podcast, with nothing spent on ads',
    metaTitle: 'Case Study: Launching a Charity Podcast',
    metaDescription:
      'An Edinburgh mental-health charity launched a six-episode podcast with no paid promotion. In the first 30 days it reached 110,000+ Instagram views, all organic.',
    intro:
      'An Edinburgh mental-health charity had made a six-episode podcast series and needed people to hear it, without spending on promotion. We handled the launch.',
    summary:
      'A six-episode charity podcast launched with no paid promotion, reaching 110,000+ Instagram views in its first 30 days.',
    sector: 'Charity',
    services: ['Content', 'Social media'],
    metrics: [
      { value: '110k+', label: 'Instagram views, first 30 days' },
      { value: '13,000', label: 'Facebook reach' },
      { value: '£0', label: 'Spent on promotion' },
    ],
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'A podcast is a lot of work to make and very easy to release into silence. The charity wanted the series to reach the people it was made for, and paying for that reach wasn’t an option.',
        ],
      },
      {
        heading: 'What we did',
        paragraphs: [
          'We handled the release and the organic promotion. That meant getting each episode onto the podcast platforms and YouTube, hand-editing the captions, and cutting short clips made for Instagram and Facebook, so each one worked on its own in the feed rather than as an advert for something elsewhere.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'In the first 30 days the series passed 110,000 views on Instagram and reached 13,000 people on Facebook. All of it was organic, with nothing spent on promotion.',
        ],
      },
      {
        heading: 'Why it mattered',
        paragraphs: [
          'For a charity, every pound not spent on ads goes back into the work. Making the content native to each platform is what let it travel without a budget behind it.',
        ],
      },
    ],
    primaryCta: { href: '/content-creation', label: 'See our content work' },
    secondaryCta: CONTACT,
    citableClaim:
      'Consultico launched a six-episode podcast series for an Edinburgh mental-health charity with no paid promotion, reaching more than 110,000 Instagram views and 13,000 people on Facebook in the first 30 days.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudyPaths(): string[] {
  return CASE_STUDIES.map((study) => `/case-studies/${study.slug}`);
}
