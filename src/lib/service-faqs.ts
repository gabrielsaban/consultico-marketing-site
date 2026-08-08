import type { ServicePageKey } from '@/lib/seo';

export const SERVICE_FAQS: Record<Exclude<ServicePageKey, 'careers'>, { question: string; answer: string }[]> = {
  seo: [
    {
      question: 'How long does SEO take to work?',
      answer:
        'Meaningful movement often starts within three months for trades and local service businesses, with compounding gains over 12 months and beyond. SEO is a long-term asset: unlike paid ads, organic visibility can keep delivering when ad spend pauses.',
    },
    {
      question: 'Do you do SEO for trades businesses?',
      answer:
        'Yes. Consultico delivered retained SEO for The Boiler Co, a Bristol-based trades business. Within three months their calendar was consistently filled through organic search when paid ads had to pause, with weekly impressions growing from around 8,000 to a peak above 21,000 over more than 14 months of retained work.',
    },
    {
      question: 'What is included in your SEO service?',
      answer:
        'Technical audit, on-page optimisation, content targeting high-intent search terms, and authority building over time. We also offer generative engine optimisation (GEO) so AI assistants can cite your brand accurately in search answers.',
    },
    {
      question: 'Is SEO better than PPC?',
      answer:
        'They solve different problems. PPC delivers visibility quickly; SEO compounds into lower-cost, durable traffic. Most growing businesses run both, sequenced around unit economics rather than in isolation.',
    },
    {
      question: 'Do you work with businesses outside Glasgow?',
      answer:
        'Yes. Consultico is based in Glasgow and serves B2C brands and trades businesses across the UK and United States. Strategy and delivery are built around your market, not just our postcode.',
    },
  ],
  ppc: [
    {
      question: 'Do you manage both Google and Meta ads?',
      answer:
        'Yes. We manage Google Ads and Meta Ads across Facebook and Instagram, and we can build and launch campaigns for you to run yourself if you prefer. Every campaign is set up with proper conversion tracking so the results are measurable.',
    },
    {
      question: 'How much does PPC management cost?',
      answer:
        'It depends on your goals, your market and how much you are spending, so we set the budget after an initial audit rather than quoting blind. You will always know what you are paying for and what return to expect.',
    },
    {
      question: 'Should I invest in PPC or SEO?',
      answer:
        'Often both, but in the right order for your situation. PPC gives you speed, SEO builds a cheaper, compounding channel over time. We will give you an honest recommendation based on your margins and timeline, even if that means spending less on ads than you expected.',
    },
    {
      question: 'How quickly will I see results from paid ads?',
      answer:
        'Faster than SEO. Ads can appear at the top of search within days of launch. Meaningful optimisation takes a few weeks of conversion data, with efficiency improving over the first couple of months as we refine targeting and bidding.',
    },
    {
      question: 'Will you take over my existing account, or start fresh?',
      answer:
        'Either. We often start by auditing your existing account, because there is usually value to recover before rebuilding. If a fresh build is the better option, we will explain why before we do it.',
    },
  ],
  'web-development': [
    {
      question: 'Do you build websites with SEO included?',
      answer:
        'Yes. SEO foundations are built in from day one: clean structure, fast load times, and on-page basics aligned to how your customers search.',
    },
    {
      question: 'How long does a website project take?',
      answer:
        'Timelines depend on scope. A focused service or trades site is typically faster than a multi-section e-commerce build. We scope clearly in the proposal so you know what ships when.',
    },
    {
      question: 'Can you refresh an existing site without starting over?',
      answer:
        'Often, yes. We assess whether a refresh, restructure, or full rebuild will move conversion and search performance fastest for your situation.',
    },
    {
      question: 'Will my site work on mobile?',
      answer:
        'Every build is tested across devices. Mobile experience is part of conversion design, not an afterthought.',
    },
    {
      question: 'Do you write the website copy?',
      answer:
        'We can. Conversion-focused copy is part of our content creation service and is often combined with web projects so message and layout align.',
    },
  ],
  'content-creation': [
    {
      question: 'What types of content do you produce?',
      answer:
        'Ad scripts, articles, landing page copy, campaign assets, social content, and more. Each piece is planned around audience, funnel stage, and business goals.',
    },
    {
      question: 'Is content creation the same as social media management?',
      answer:
        'No. Content creation produces the assets. Social media management is what happens to those assets once they exist: scheduling, community engagement, and reporting.',
    },
    {
      question: 'Do you write SEO articles?',
      answer:
        'Yes. We produce long-form articles informed by keyword research and search intent, written to read like an editor wrote them, not a robot.',
    },
    {
      question: 'How do you plan what to publish?',
      answer:
        'We build editorial calendars around your strategy: what to publish, where it lives, and what job each piece should do in the funnel.',
    },
    {
      question: 'Can content support paid campaigns?',
      answer:
        'Yes. Strong paid performance depends on message match between ads and landing pages. We produce copy and creative briefs aligned to your campaigns.',
    },
  ],
  'market-strategy': [
    {
      question: 'What is the Think First workshop?',
      answer:
        'Think First is Consultico\'s 30-day marketing strategy workshop for B2C brands doing £50K+ per month. It maps channels, economics, and growth before budget goes to SEO, PPC, or web.',
    },
    {
      question: 'Who is strategy consulting for?',
      answer:
        'Founders and leadership teams who want clarity before delegating budget. It suits businesses already selling successfully that need a plan built around their numbers.',
    },
    {
      question: 'What do I get at the end?',
      answer:
        'A marketing model built around your business, visual examples, a 12-month execution roadmap, written reports, and two months of post-workshop Slack support.',
    },
    {
      question: 'Is this the same as hiring an agency retainer?',
      answer:
        'No. Think First is a defined strategy engagement with a clear handover. Execution can follow with Consultico or your in-house team.',
    },
    {
      question: 'Do you use a framework?',
      answer:
        'Yes. Our S.T.E.P. framework maps where marketing stands today, where the gaps are, and the most direct path forward.',
    },
  ],
  'campaign-management': [
    {
      question: 'What does campaign management include?',
      answer:
        'Planning, asset briefing, launch, performance monitoring, and ongoing optimisation across channels with one timeline, goal, and success definition.',
    },
    {
      question: 'Which channels can you coordinate?',
      answer:
        'Paid ads, content, email, social, product launches, and seasonal activity. The mix depends on your strategy and what your economics support.',
    },
    {
      question: 'Do I need Think First before a campaign?',
      answer:
        'Not always, but strategy-first clients get better results. Think First defines what to run, in what order, and what return to expect before spend scales.',
    },
    {
      question: 'How do you measure success?',
      answer:
        'Every campaign has a defined objective and success measure agreed before launch. Reporting ties back to business outcomes, not platform vanity metrics.',
    },
    {
      question: 'Can you manage campaigns we run in-house?',
      answer:
        'We can advise, audit, or take full delivery depending on your team capacity. The model is scoped to what you actually need.',
    },
  ],
};
