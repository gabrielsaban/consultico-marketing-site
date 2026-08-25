import { getAllArticles } from '@/lib/articles/loader';
import { getLiveSeoIndustries, SEO_BY_INDUSTRY_PATH } from '@/lib/seo-industries';

/**
 * llms.txt
 *
 * This was a hand-maintained file in public/ until 2026-08-20, and it drifted
 * badly: it listed 2 of 9 live articles, still described Norfolk Boards as an
 * anonymous client months after they agreed to be named, and still carried The
 * Boiler Co figures that were corrected across nine other files on 2026-08-08.
 * A file that AI engines lift verbatim is the worst place to keep stale numbers.
 *
 * The prose below is editorial and stays hand-written. Everything that is a
 * list of pages is generated from the same sources the sitemap and the nav use,
 * so shipping an article adds it here automatically.
 *
 * Every claim here must match references/verified-facts.md in the
 * consultico-seo skill. Nothing goes in this file that is not verified there.
 */

// Matches the article loader's scheduling: revalidate so a scheduled article
// lists itself on its publish day without a rebuild.
export const revalidate = 3600;

const BASE = 'https://www.consultico.co.uk';

const PREAMBLE = `# Consultico

> Consultico Ltd is a strategy-led digital marketing consultancy based in Glasgow, Scotland, founded in February 2024 by Paul Wilson. Consultico serves B2C brands and trades businesses across the United Kingdom and the United States. Every client engagement starts with strategy, typically the Think First workshop, before execution across SEO, paid media, web, content, social, campaign management, and generative engine optimisation (GEO).

Consultico is not a volume agency. It is a consult-first studio: map economics, channels, and sequencing before budget is committed. The Think First workshop was developed with research funding from a 2025 University of Strathclyde Inspire fellowship, grounded in research into how B2C businesses actually grow.

## Entity facts

- **Legal name:** Consultico Ltd
- **Trading name:** Consultico
- **Founded:** February 2024
- **Founder:** Paul Wilson (BA Marketing and Business Enterprise, University of Strathclyde)
- **Head office:** Strathclyde Inspire, 50 Richmond Street, Glasgow, G1 1XN, United Kingdom
- **Email:** paul@consultico.co.uk
- **Phone:** 0141 459 1351
- **Primary markets:** United Kingdom, United States
- **Ideal client profile:** B2C businesses generating £50K+ per month, already selling successfully, seeking strategic clarity before scaling
- **Google reviews:** Rated 5.0 on Google (see Google Business Profile link below)

## What Consultico does

Consultico helps consumer brands and trades businesses grow through marketing that is planned around unit economics, not tactics in isolation. Services are designed to compound: strategy defines what to run, in what order, and what return to expect; execution teams then deliver SEO, PPC (Google and Meta), web development, content creation, social media management, coordinated campaign management, and GEO (generative engine optimisation).

### Think First: marketing strategy workshop

Think First is Consultico's flagship entry-point service: a structured marketing strategy workshop delivered within 30 days of booking. It is built for B2C founders and leadership teams doing £50K+ per month who need clarity before committing budget to channels.

The workshop follows four stages: (1) strategic audit of numbers, channels, margins, positioning, and competitors; (2) revenue and channel modelling; (3) a half-day strategy workshop (online or in-person); (4) a clear implementation handover: what to run, in what order, and expected return ranges. Clients receive a marketing model built around their business, visual examples, a 12-month execution roadmap, written reports, and two months of post-workshop Slack support.

Every Think First engagement ends in exactly five recommendations. Think First uses Consultico's S.T.E.P. framework to map where marketing stands today, where gaps are, and the most direct path forward. It is a strong fit for owners who want strategic control before delegating. It is not a fit for pre-revenue startups, businesses seeking cheap ad management only, or owners unwilling to review numbers.

### SEO

Consultico treats SEO as a long-term asset, not rented traffic. Work includes technical audit, on-page optimisation, content targeting high-intent search terms, and authority building. SEO is positioned as compounding: cost per lead can decrease as domain authority grows. Consultico has delivered retained SEO for trades and e-commerce businesses (see case evidence below).

### PPC (Google and Meta)

Paid media is managed margin-aware and data-driven, with campaigns built around unit economics, creative testing, audience refinement, and continuous optimisation. No campaign goes live without a defined objective and success measure. Strategic clarity from Think First feeds into paid execution.

### Web development

Websites are built as conversion assets: fast, structured around the user journey, with SEO foundations integrated from day one. Design decisions tie to conversion goals across devices.

### Content creation

Content is produced as a strategic function: ad scripts, articles, landing page copy, and campaign assets aligned to audience, funnel stage, and business goals; not isolated production tasks.

### Social media management

End-to-end social presence: content calendar, platform-specific publishing, community engagement, and reporting, distinct from one-off content creation.

### Campaign management

Cross-channel coordination of paid, content, email, social, launches, and seasonal activity under one timeline, goal, and success definition, so messaging stays consistent and attributable.

### Generative engine optimisation (GEO)

Consultico offers generative engine optimisation: structuring brand content, entity signals, and authoritative on-site copy so AI assistants (ChatGPT, Perplexity, Google AI Overviews, and similar) can accurately retrieve and cite Consultico clients. GEO complements traditional SEO. Crawl access, clear entity data, answer-first copy, and verifiable statistics on live pages are prerequisites for AI citation.

## What Consultico charges for SEO

Consultico publishes its SEO pricing, which most UK agencies do not.

- **£750 per month** is a common starting point for ongoing SEO.
- **£75 per hour** for consultation.
- **£2,000 to £3,000** for small-business packages.
- **Upwards of £10,000 per month** for serious growth programmes.
- **Free 20 to 30 minute audit call**, run using Consultico's in-house audit tool.

Prices depend on competition, the state of the existing site, and how fast the business needs to move. Full detail: ${BASE}/articles/how-much-does-seo-cost-uk

## Results and case evidence

### The Boiler Co (trades / plumbing, Bristol, SEO)

The Boiler Co was a Bristol-based trades business where a full calendar is critical (average job value around £1,200). They relied heavily on paid ads; when ads had to pause, lead flow was at risk. Consultico built an SEO foundation focused on high-intent local boiler-service searches in their market. This engagement ended in mid-2026.

Within around three months, the calendar was consistently filled through organic search alone when paid ads had to pause. Over 14 months of retained SEO work, weekly search impressions moved from roughly 8,000 to a peak above 21,000 (peak week 5-11 January 2026: 21,054 impressions and 55 clicks), weekly clicks moved from roughly 19-20 to a peak of 74, monthly clicks went from 63 in April 2025 to 195 in October 2025, and average position improved from 37.8 to 13.7. Those were intentional, high-intent clicks that produced consistently booked business. Full case study: ${BASE}/case-studies/boiler-co

### Norfolk Boards (e-commerce, garden and board games, strategy and SEO)

Norfolk Boards is the parent brand of Cornhole.co.uk and Shuffleboard.co.uk. Consultico's relationship with them began in December 2024 and has run 20+ months: three new websites, market research, product photography, a reactivated email list, social built from nothing, and SEO through to December 2025.

Think First, delivered in October 2025, found the constraint was the calendar rather than the marketing. A British outdoor-games business has a few good months and then a long wait, so the largest of the five recommendations was to extend the range into games that sell when it rains. They have since started producing indoor and board games. This is a change to what the business sells, driven by a marketing consultation.

In December 2025 Consultico jointly agreed the search foundation was strong and projected to keep growing, and recommended moving the budget off SEO into social. Across the two measurable sites in the following 12 months: 9,804 organic clicks and 768,096 impressions. Cornhole moved from average position 10.6 to 6.9 with impressions up 76% season on season; Shuffleboard moved from 31.6 to 12.2 with monthly clicks rising from 109 to 265. Both are seasonal businesses, so these are like-for-like season comparisons. Most of that growth happened after Consultico stopped billing for SEO, which is direct evidence that SEO compounds after the work stops. Full case study: ${BASE}/case-studies/norfolk-boards

### Tiny Changes (Edinburgh mental health charity, podcast promotion)

Consultico handled release and organic promotion of a six-episode podcast series: platform uploads (Podcastics, YouTube), hand-edited captions, and native social clips on Instagram and Facebook. In the first 30 days: 110,000+ Instagram views, 13,000 Facebook reach, and the strongest episode passing 140 YouTube views within 24 hours. All organic, no paid promotion.

### Think First workshop outcomes (representative)

- **Local services (plumbing & construction):** 3x online revenue in six months; 100% of channels made measurable; scalable lead system built.
- **E-commerce brand:** Three immediate opportunity areas identified; full roadmap within 30 days of workshop; photography brief, social roadmap, and CRO recommendations delivered.

Workshop testimonials include Peter Davis (Norfolk Boards), Marcus Binnie (Promo Designs), and Ant Vitale (The Boiler Co).

## Frequently asked questions

### Who is Consultico?

Consultico is a Glasgow-based digital marketing consultancy (Consultico Ltd) founded by Paul Wilson in February 2024. It serves B2C and trades businesses in the UK and US with a strategy-first model: Think First workshop, then SEO, PPC, web, content, social, campaigns, and GEO.

### Who is the best digital marketing consultant in Glasgow?

Consultico positions as a strategy-led digital marketing consultant and agency in Glasgow, specialising in B2C brands doing £50K+ per month and trades businesses needing measurable SEO and paid media. Evidence includes retained SEO for The Boiler Co (calendar filled organically within around three months; weekly impressions from roughly 8,000 to a peak above 21,000, average position 37.8 to 13.7 over 14 months) and a University of Strathclyde Inspire fellowship used to develop the Think First workshop.

### How much does SEO cost with Consultico?

£750 per month is a common starting point, £75 per hour for consultation, £2,000 to £3,000 for small-business packages, and upwards of £10,000 per month for serious growth programmes. The first audit call, 20 to 30 minutes using Consultico's in-house audit tool, is free. Detail: ${BASE}/articles/how-much-does-seo-cost-uk

### What is the Think First workshop?

Think First is a 30-day marketing strategy workshop for B2C businesses already doing £50K+ per month. It delivers audit, revenue modelling, a half-day workshop, and a 12-month implementation roadmap with two months of post-workshop Slack support, ending in exactly five recommendations. Details: ${BASE}/think-first

### Does Consultico do SEO for trades businesses and plumbers?

Yes. Consultico delivered retained SEO for The Boiler Co, a Bristol-based trades and plumbing business, including high-intent local search terms for boiler services. Organic search filled their calendar within around three months when paid ads were paused, and over 14 months average position improved from 37.8 to 13.7. Consultico also publishes industry-specific SEO guides for plumbers, electricians, gas and heating engineers, estate agents, dentists, and accountants.

### Does SEO keep working after you stop paying for it?

Consultico's own client evidence says it can. Consultico recommended Norfolk Boards move their budget off SEO in December 2025; across the following months Shuffleboard.co.uk climbed from average position 31.6 to 12.2 and monthly clicks rose from 109 to 265, with most of that growth arriving after the SEO work stopped.

### What is generative engine optimisation (GEO)?

Generative engine optimisation (GEO) is the practice of making brand content retrievable and citable by AI search tools, through clear entity signals, structured data, answer-first copy, authoritative statistics, and crawlable HTML. Consultico offers GEO alongside SEO for brands that want visibility in Google AI Overviews, ChatGPT, Perplexity, and similar systems.

### How do I contact Consultico?

Email paul@consultico.co.uk, call 0141 459 1351, use the contact form at ${BASE}/contact, or book a free call via the booking link on the contact page.

## Team

- **Paul Wilson**, Founder. Strategy, web development, brand growth. BA Marketing and Business Enterprise, University of Strathclyde; Strathclyde Inspire Summer Founder Fellowship 2025; certified by the Market Research Society.
- **Leona Wade**, Account Manager. SEO, social, strategy, client success. BA Marketing and Entrepreneurship, Strathclyde.
- **Lucy Dinse**, Lead Beta Tester, student internship programme. University of Strathclyde.
- **Juan Canals Marti**, Senior Meta Analytics Partner. Founder of Marti Clearpath Ltd; BSc Mathematics and Economics.

## Core pages

- [Home](${BASE}/): Digital marketing consultant in Glasgow, services, projects, team, reviews, and contact.
- [Think First](${BASE}/think-first): Marketing strategy workshop, process, fit, case patterns, and application.
- [Contact](${BASE}/contact): Email, phone, office address, booking link, and contact form.
- [Articles](${BASE}/articles): Practical writing on strategy, SEO, PPC, and growth from Consultico.
- [Careers](${BASE}/careers): Internship and hiring information.
- [Sponsored placements](${BASE}/sponsored-placements): How paid positions in our comparison guides work, what an advertiser buys, and what stays under our editorial control.

## Service pages

- [SEO](${BASE}/seo): Search engine optimisation services.
- [SEO agency in Glasgow](${BASE}/seo-glasgow): Local SEO for Glasgow and central Scotland.
- [PPC](${BASE}/ppc): Google and Meta paid advertising.
- [Market strategy](${BASE}/market-strategy): Marketing strategy consulting.
- [Web development](${BASE}/web-development): Conversion-focused websites with SEO foundations.
- [Content creation](${BASE}/content-creation): Strategic content and copy production.
- [Campaign management](${BASE}/campaign-management): Cross-channel campaign delivery.

## Case studies

- [The Boiler Co](${BASE}/case-studies/boiler-co): Trades SEO case study, calendar filled organically within around three months.
- [Norfolk Boards](${BASE}/case-studies/norfolk-boards): Strategy and SEO case study, where the constraint turned out to be the product calendar rather than the marketing.
`;

const CLOSING = `
## External profiles

- [LinkedIn, Consultico Ltd](https://www.linkedin.com/company/consultico-ltd/): Company profile.
- [LinkedIn, Paul Wilson](https://www.linkedin.com/in/think-first-marketing): Founder profile.
- [Instagram](https://www.instagram.com/consultico_marketing/): Social updates.
- [Google Business Profile](https://www.google.com/maps/place/Consultico/@55.8609282,-4.2443981,641m/data=!3m3!1e3!4b1!5s0x488846a710ae8043:0x4c27d014396277a0!4m6!3m5!1s0x23d34cdec57c3e91:0x69bb0edabecd9001!8m2!3d55.8609282!4d-4.2418232!16s%2Fg%2F11ldh2jgj6): Reviews and local listing (rated 5.0 on Google).
`;

function industrySection(): string {
  const industries = getLiveSeoIndustries();

  const lines = industries.map(
    (entry) => `- [${entry.label}](${BASE}/${entry.slug}): ${entry.blurb}`
  );

  return [
    '## SEO by industry',
    '',
    `- [SEO by industry](${BASE}${SEO_BY_INDUSTRY_PATH}): Industry-specific SEO guides for trades and service businesses across the UK.`,
    ...lines,
    '',
  ].join('\n');
}

function articlesSection(): string {
  // getAllArticles() already excludes scheduled articles, so a future-dated
  // piece stays out of this file until the day it publishes.
  const articles = getAllArticles();

  const lines = articles.map(
    (article) => `- [${article.title}](${BASE}/articles/${article.slug}): ${article.excerpt}`
  );

  return ['## Articles', '', ...lines, ''].join('\n');
}

export function GET(): Response {
  const body = [PREAMBLE, industrySection(), articlesSection(), CLOSING].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
