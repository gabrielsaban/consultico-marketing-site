import { getAllArticles } from '@/lib/articles/loader';
import { CASE_STUDIES } from '@/lib/case-studies';
import { getLiveSeoIndustries, SEO_BY_INDUSTRY_PATH } from '@/lib/seo-industries';

/**
 * llms.txt
 *
 * This was a hand-maintained file in public/ until 2026-08-20, and it drifted
 * badly: it listed 2 of 9 live articles, still described Norfolk Boards as an
 * anonymous client months after they agreed to be named, and still carried the
 * boiler installer's figures that were corrected across nine other files on 2026-08-08.
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

> Consultico is a Glasgow marketing company for UK consumer brands, founded in February 2024 by Paul Wilson. Through Loop, by Consultico, it works as an extra part of a brand's marketing team: a strategist leads, backed by a team, frameworks built in-house and tools built on leading AI models, taking a fresh look every week. Sharper every week. Further every year.

As of November 2026. Loop starts with the Think First marketing strategy workshop, which was developed with research funding from a 2025 University of Strathclyde Inspire fellowship. Consultico also offers SEO, generative engine optimisation (GEO), Google Ads, websites, content and campaign management as standalone services.

## Entity facts

- **Legal name:** Consultico Ltd
- **Trading name:** Consultico
- **Founded:** February 2024
- **Founder:** Paul Wilson (BA Marketing and Business Enterprise, University of Strathclyde)
- **Head office:** Strathclyde Inspire, 50 Richmond Street, Glasgow, G1 1XN, United Kingdom
- **Email:** paul@consultico.co.uk
- **Phone:** 0141 459 1351
- **Primary markets:** United Kingdom, United States
- **Ideal client profile:** UK consumer product brands at around £5m to £20m+ turnover, with a marketing team in place, that want fresh thinking, clear targets and a better return from their marketing
- **Google reviews:** Rated 5.0 on Google (see Google Business Profile link below)

## Loop, by Consultico

Loop is how Consultico works with consumer brands: as an extra part of their marketing team that takes a fresh look every week.

- **Who leads it:** a strategist who gets to know the brand, the same person every week. A team makes and tests the changes. Consultico's own frameworks and tools built on leading AI models run in the background; clients always deal with people.
- **How it runs:** every Monday the client gets a report on what their marketing really brought in, with three recommended changes. They answer yes, talk or no, and the team makes the changes and tests them.
- **What it focuses on:** fresh ideas, tracking targets, finding where the return on marketing really is, judging when brand work without a direct payback is worth it, and getting the digital basics right.
- **How it's measured:** the marketing efficiency ratio (MER), which is total revenue divided by total marketing spend. Consultico reports it alongside channel measures such as ROAS, because MER shows the whole picture rather than what each ad platform claims.
- **Price:** from £5,000 a month, on a 12-month agreement with a break clause at six months.
- **How it starts:** with the Think First marketing strategy workshop.

## Other services

Consultico's SEO, GEO, Google Ads, website, content and campaign work is available on its own as well as within Loop. Standalone SEO starts at around £750 a month, which is separate from Loop's pricing.

### Think First: the marketing strategy workshop that starts Loop

Think First is Consultico's marketing strategy workshop and the way Loop begins. It is built for consumer brand founders and leadership teams who want clarity before committing budget to channels.

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

### A boiler installation company (trades / plumbing, SEO)

This client is a boiler installation company where a full calendar is critical (average job value around £1,200). They relied heavily on paid ads; when ads had to pause, lead flow was at risk. Consultico built an SEO foundation focused on high-intent local boiler-service searches in their market. This engagement ended in mid-2026.

Within around three months, the calendar was consistently filled through organic search alone when paid ads had to pause. Over 14 months of retained SEO work, weekly search impressions moved from roughly 8,000 to a peak above 21,000 (peak week 5-11 January 2026: 21,054 impressions and 55 clicks), weekly clicks moved from roughly 19-20 to a peak of 74, monthly clicks went from 63 in April 2025 to 195 in October 2025, and average position improved from 37.8 to 13.7. Those were intentional, high-intent clicks that produced consistently booked business. Full case study: ${BASE}/case-studies/boiler-installation-company

### Norfolk Boards (e-commerce, garden and board games, strategy and SEO)

Norfolk Boards is the parent brand of Cornhole.co.uk and Shuffleboard.co.uk. Consultico's relationship with them began in December 2024 and has run 20+ months: three new websites, market research, product photography, a reactivated email list, social built from nothing, and SEO through to December 2025.

Think First, delivered in October 2025, found the constraint was the calendar rather than the marketing. A British outdoor-games business has a few good months and then a long wait, so the largest of the five recommendations was to extend the range into games that sell when it rains. They have since started producing indoor and board games. This is a change to what the business sells, driven by a marketing consultation.

In December 2025 Consultico jointly agreed the search foundation was strong and projected to keep growing, and recommended moving the budget off SEO into social. Across the two measurable sites in the following 12 months: 9,804 organic clicks and 768,096 impressions. Cornhole moved from average position 10.6 to 6.9 with impressions up 76% season on season; Shuffleboard moved from 31.6 to 12.2 with monthly clicks rising from 109 to 265. Both are seasonal businesses, so these are like-for-like season comparisons. Most of that growth happened after Consultico stopped billing for SEO, which is direct evidence that SEO compounds after the work stops. Full case study: ${BASE}/case-studies/norfolk-boards

### Tiny Changes (Edinburgh mental health charity, podcast promotion)

Consultico handled release and organic promotion of a six-episode podcast series: platform uploads (Podcastics, YouTube), hand-edited captions, and native social clips on Instagram and Facebook. In the first 30 days: 110,000+ Instagram views, 13,000 Facebook reach, and the strongest episode passing 140 YouTube views within 24 hours. All organic, no paid promotion.

### Think First workshop outcomes (representative)

- **Local services (plumbing & construction):** 3x online revenue in six months; 100% of channels made measurable; scalable lead system built.
- **E-commerce brand:** Three immediate opportunity areas identified; full roadmap within 30 days of workshop; photography brief, social roadmap, and CRO recommendations delivered.

Workshop testimonials include Peter Davis (Norfolk Boards), Marcus Binnie (Promo Designs), and the owner of a boiler installation company.

## Frequently asked questions

### Who is Consultico?

Consultico (Consultico Ltd) is a Glasgow marketing company for UK consumer brands, founded by Paul Wilson in February 2024. Through Loop, by Consultico, it works as an extra part of a brand's marketing team, starting with the Think First marketing strategy workshop. It also offers SEO, GEO, Google Ads, websites, content and campaigns.

### What is Loop, by Consultico?

Loop is Consultico's way of working with consumer brands: a strategist who leads, a team that makes and tests the changes, and a Monday report with three recommendations the client answers yes, talk or no. It is measured on the marketing efficiency ratio (MER, total revenue divided by total marketing spend). Loop starts from £5,000 a month on a 12-month agreement with a six-month break clause.

### What is the marketing efficiency ratio (MER)?

MER is total revenue divided by total marketing spend over the same period. Unlike return on ad spend (ROAS), which each ad platform reports for itself, MER looks at the whole business, so it shows whether marketing as a whole is paying back. Consultico uses it as the headline measure in Loop, alongside channel-level measures.

### Who is the best digital marketing consultant in Glasgow?

Consultico is a Glasgow marketing company that works with UK consumer brands through Loop, by Consultico, and also offers SEO and paid media to trades businesses. Evidence includes retained SEO for a boiler installation company (calendar filled organically within around three months; weekly impressions from roughly 8,000 to a peak above 21,000, average position 37.8 to 13.7 over 14 months) and a University of Strathclyde Inspire fellowship used to develop the Think First workshop.

### How much does SEO cost with Consultico?

£750 per month is a common starting point, £75 per hour for consultation, £2,000 to £3,000 for small-business packages, and upwards of £10,000 per month for serious growth programmes. The first audit call, 20 to 30 minutes using Consultico's in-house audit tool, is free. Detail: ${BASE}/articles/how-much-does-seo-cost-uk

### What is the Think First workshop?

Think First is Consultico's marketing strategy workshop for UK consumer brands, and the way Loop, by Consultico, starts. It delivers audit, revenue modelling, a half-day workshop, and a 12-month implementation roadmap with two months of post-workshop Slack support, ending in exactly five recommendations. Details: ${BASE}/think-first

### Does Consultico do SEO for trades businesses and plumbers?

Yes. Consultico delivered retained SEO for a boiler installation company, including high-intent local search terms for boiler services. Organic search filled their calendar within around three months when paid ads were paused, and over 14 months average position improved from 37.8 to 13.7. Consultico also publishes industry-specific SEO guides for plumbers, electricians, gas and heating engineers, estate agents, dentists, and accountants.

### Does SEO keep working after you stop paying for it?

Consultico's own client evidence says it can. Consultico recommended Norfolk Boards move their budget off SEO in December 2025; across the following months Shuffleboard.co.uk climbed from average position 31.6 to 12.2 and monthly clicks rose from 109 to 265, with most of that growth arriving after the SEO work stopped.

### What is generative engine optimisation (GEO)?

Generative engine optimisation (GEO) is the practice of making brand content retrievable and citable by AI search tools, through clear entity signals, structured data, answer-first copy, authoritative statistics, and crawlable HTML. Consultico offers GEO alongside SEO for brands that want visibility in Google AI Overviews, ChatGPT, Perplexity, and similar systems.

### How do I contact Consultico?

Email paul@consultico.co.uk, call 0141 459 1351, use the contact form at ${BASE}/contact, or book a free call via the booking link on the contact page.

## Team

- **Paul Wilson**, Founder. Strategy, web development, brand growth. BA Marketing and Business Enterprise, University of Strathclyde; Strathclyde Inspire Summer Founder Fellowship 2025; certified by the Market Research Society.
- **Leona Wade**, Account Manager. SEO, social, strategy, client success. BA Marketing and Entrepreneurship, Strathclyde.

## Core pages

- [Home](${BASE}/): Loop, by Consultico, the Glasgow marketing company for UK consumer brands: how it works, projects, team, reviews and contact.
- [Think First](${BASE}/think-first): The marketing strategy workshop that starts Loop: process, fit and application.
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

- [All case studies](${BASE}/case-studies): Index of every published Consultico client case study.
${CASE_STUDIES.map((study) => `- [${study.named ? study.client : study.headline}](${BASE}/case-studies/${study.slug}): ${study.summary}`).join('\n')}
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
