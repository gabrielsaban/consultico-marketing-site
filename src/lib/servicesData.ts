export interface Service {
  id: string;
  name: string;
  description: string[];
  highlights: string[];
  icon: string;
  futureSlug: string;
  detailHref: string;
  detailCtaLabel: string;
  image?: string;
  imageAlt?: string;
}

export const services: Service[] = [
  {
    id: 'strategy',
    name: 'Marketing Strategy',
    description: [
      'Most businesses spend money on marketing before they genuinely understand what their marketing is doing for them. How does your social media presence actually connect through to your website? Are you tracking which channels are driving revenue and which ones are quietly burning budget with nothing to show for it? These are the questions most business owners cannot answer with real confidence, and that is exactly the problem we are built to solve.',
      'Think First is our flagship strategy workshop - a structured process that maps out your entire marketing landscape before a single pound is committed to a campaign. Using our S.T.E.P. framework, we build a clear picture of where your marketing stands today, where the gaps are, and the most direct path to where you need to be. Every Consultico client relationship starts with our Think First strategy workshop, because without a clear strategy, everything else is guesswork.',
    ],
    highlights: ['tracking which channels are driving revenue', 'Think First', 'S.T.E.P. framework', 'Think First strategy workshop'],
    icon: 'compass',
    futureSlug: 'market-strategy',
    detailHref: '/think-first',
    detailCtaLabel: 'Explore Think First',
    image: '/services/market_strategy.avif',
    imageAlt: 'Marketing strategy workshop planning with Consultico',
  },
  {
    id: 'ppc',
    name: 'PPC',
    description: [
      'We manage Google and Meta accounts around your unit economics - not vanity metrics - so every pound has a defined job. When managed correctly, paid advertising is one of the most powerful growth levers available to a consumer brand, but most brands either run ads without strategy or hand budget to platforms that are not incentivised to spend it efficiently.',
      'We build campaigns around your actual unit economics - testing creative, refining audiences, and optimising continuously until the numbers stack up. We bring the same strategic clarity from Think First into every paid campaign we run: no campaign goes live without a clear understanding of what it is trying to do and how success will be measured.',
    ],
    highlights: ['unit economics', 'Google and Meta', 'how success will be measured'],
    icon: 'target',
    futureSlug: 'ppc',
    detailHref: '/ppc',
    detailCtaLabel: 'Explore PPC',
    image: '/services/ppc.avif',
    imageAlt: 'PPC and paid media management for Glasgow businesses',
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: [
      'Content creation and social media management are two different things, and understanding the distinction matters. Content creation is the process of producing the actual assets - the video scripts, ad copy, long-form articles, product copy, landing page content, and campaign creatives that fuel your marketing across every channel. It is the raw material your entire marketing ecosystem runs on. When it is done well, it earns attention, builds trust, and moves people through a funnel. When it is done poorly, it disappears into the noise.',
      'We produce content with a clear purpose behind every piece. That means starting with your audience, your funnel stage, and your business goals - then building content designed to perform. Whether you need ad scripts that convert, articles that rank and educate, or campaign assets that hold up across every platform, we treat content creation as a strategic function, not just a production task. Everything we produce is built to work as part of a broader system, not sit in isolation.',
    ],
    highlights: ['Content creation', 'actual assets', 'strategic function'],
    icon: 'sparkles',
    futureSlug: 'content-creation',
    detailHref: '/content-creation',
    detailCtaLabel: 'Explore content',
    image: '/services/content_creation.avif',
    imageAlt: 'Strategic content creation for digital marketing campaigns',
  },
  {
    id: 'seo',
    name: 'SEO',
    description: [
      'We build long-term organic visibility - the kind of compounding traffic that keeps working when ad spend pauses. Paid ads put you in front of people immediately - and the moment you stop paying, you disappear. SEO, by contrast, is an investment in a long-term asset that can keep delivering for months and years after the initial effort.',
      'We build SEO strategies that treat your website as the asset it should be: technical audit, on-page optimisation, content for the terms your customers search for, and authority building over time. We also offer generative engine optimisation (GEO) - structuring your content so AI assistants can cite your brand accurately in ChatGPT, Perplexity, and Google AI Overviews.',
    ],
    highlights: ['long-term organic visibility', 'generative engine optimisation (GEO)', 'compounding traffic'],
    icon: 'trending-up',
    futureSlug: 'seo',
    detailHref: '/seo',
    detailCtaLabel: 'Explore SEO',
    image: '/services/seo.avif',
    imageAlt: 'SEO services for Glasgow businesses and trades',
  },
  {
    id: 'web',
    name: 'Web Development',
    description: [
      'We build and refresh websites that need to convert - fast, structured around the user journey, with SEO foundations baked in from day one. Your website is open every hour of every day; it either builds trust and converts or loses people in seconds.',
      'We design and build websites that earn their place in your marketing stack. That means clean, fast-loading builds with every design decision tied to a clear conversion goal, performing across every device and screen size. If your current website is not working as hard as your marketing, that is the problem we are here to fix.',
    ],
    highlights: ['SEO foundations', 'conversion goal', 'fast-loading builds'],
    icon: 'code',
    futureSlug: 'web-development',
    detailHref: '/web-development',
    detailCtaLabel: 'Explore web',
    image: '/services/web_dev.avif',
    imageAlt: 'Web design and development for Glasgow businesses',
  },
  {
    id: 'social',
    name: 'Social Media',
    description: [
      'Social media management is not the same as content creation. Content creation produces the assets - social media management is about what happens to those assets once they exist. A social media manager is the custodian of your brand voice across every platform: planning and scheduling posts, monitoring and responding to comments and messages, tracking what is resonating with your audience, and making sure everything that goes out is consistent with how your brand needs to be seen - every single day.',
      'We manage your social presence end-to-end, so you are not constantly context-switching between running your business and managing your feeds. That means a structured content calendar, platform-specific publishing, community engagement handled properly, and regular reporting on what is and is not working. Your job is to run your business. Our job is to make sure your social presence keeps showing up for it.',
    ],
    highlights: ['Social media management', 'brand voice', 'community engagement'],
    icon: 'share-2',
    futureSlug: 'social-media',
    detailHref: '/social-media',
    detailCtaLabel: 'Explore social media',
    image: '/services/social_media.avif',
    imageAlt: 'Social media management for brand growth',
  },
  {
    id: 'campaign',
    name: 'Campaign Management',
    description: [
      'Most marketing efforts involve a lot of moving parts - paid ads, content, email, social, seasonal campaigns, product launches, and everything else sitting in between. When those parts are not coordinated, the result is inconsistent messaging, duplicated effort, and results that are much harder to attribute than they should be. Campaign management is what ties it all together: a single, coordinated effort that plans, builds, launches, and optimises across every channel with a clear goal, a clear timeline, and a clear picture of what success looks like.',
      'We take the strategic foundation from Think First and turn it into live, coordinated campaign delivery. That means everything from initial planning and asset briefing right through to launch, performance monitoring, and ongoing optimisation. You get a team that owns the campaign from end to end - so nothing falls through the cracks, every pound is working toward the same objective, and your marketing is finally moving in one direction.',
    ],
    highlights: ['Campaign management', 'coordinated effort', 'Think First'],
    icon: 'calendar-check',
    futureSlug: 'campaign-management',
    detailHref: '/campaign-management',
    detailCtaLabel: 'Explore campaigns',
    image: '/services/campaign.avif',
    imageAlt: 'Cross-channel campaign management for growing brands',
  },
];
