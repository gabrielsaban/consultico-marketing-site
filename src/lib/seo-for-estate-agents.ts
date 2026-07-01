import { getIndustryPath } from '@/lib/seo-industries';

export const SEO_FOR_ESTATE_AGENTS_SLUG = 'seo-for-estate-agents';
export const SEO_FOR_ESTATE_AGENTS_PATH = getIndustryPath(SEO_FOR_ESTATE_AGENTS_SLUG);

/** Visible FAQ copy (section 3 of brief). */
export const SEO_FOR_ESTATE_AGENTS_FAQS = [
  {
    question: 'How long does SEO take to bring an estate agent more instructions?',
    answer:
      'Most agencies see movement in local rankings within two to three months and a meaningful change in valuation enquiries by month three to six. Vendors research and shortlist agents online before booking, so the earliest gains usually come from a complete Google Business Profile and fresh reviews. Timescales depend on how competitive your patch is.',
  },
  {
    question: 'Is SEO worth it when Rightmove and Zoopla already have the buyers?',
    answer:
      'The portals win buyers, but they do not win you instructions. Over 80 percent of portal time is on Rightmove (Rightmove, 2024), yet vendors choose their agent on Google, and almost half of sellers invite three agents to value before deciding (Zoopla, 2025). SEO gets you onto that shortlist, where your fee income actually comes from.',
  },
  {
    question: 'Should estate agents do SEO or pay for more portal advertising?',
    answer:
      'Portal upgrades raise a listing\'s visibility to buyers but do nothing for how vendors judge you. SEO builds the direct brand presence, reviews and local pages that win instructions without paying per listing. Most agents keep strong portal coverage for stock and invest in SEO to lower their cost per instruction over time.',
  },
  {
    question: 'What is the most important SEO factor for a local estate agent?',
    answer:
      'Your Google Business Profile and reviews. For searches like "estate agents near me" the map pack sits above the normal results, and a complete profile with consistent details and a steady stream of recent reviews is what gets you into it and reassures vendors comparing you to rivals.',
  },
  {
    question: 'How much does SEO for estate agents cost?',
    answer:
      'It depends on how competitive your area is and the state of your current site and profile. We work to your unit economics: one extra instruction can be worth thousands in fees, so we price against your average fee per instruction and give you a plain figure and the reasoning before you commit.',
  },
  {
    question: 'Can SEO help a lettings agency attract more landlords?',
    answer:
      'Yes. Landlords search terms like "letting agents [town]" and "property management [town]" and compare fees, reviews and local knowledge before switching. Dedicated lettings and landlord pages, plus a strong review profile, put you in front of them at the point they are deciding who manages their property.',
  },
] as const;

/** FAQ copy for JSON-LD (section 2 of brief). */
export const SEO_FOR_ESTATE_AGENTS_FAQS_SCHEMA = [
  {
    question: 'How long does SEO take to bring an estate agent more instructions?',
    answer:
      'Most agencies see movement in local rankings within two to three months and a meaningful change in valuation enquiries by month three to six. Vendors typically research and shortlist agents online before booking a valuation, so the earliest gains usually come from a complete Google Business Profile and fresh reviews. Timescales depend on your patch and how competitive it is.',
  },
  {
    question: 'Is SEO worth it when Rightmove and Zoopla already have the buyers?',
    answer:
      'The portals win buyers, but they do not win you instructions. Over 80 percent of portal time is on Rightmove (Rightmove, 2024), yet vendors choose their agent on Google, and almost half of sellers invite three agents to value before deciding (Zoopla, 2025). SEO gets you onto that shortlist, which is where your fee income actually comes from.',
  },
  {
    question: 'Should estate agents do SEO or pay for more portal advertising?',
    answer:
      'Portal upgrades raise a listing\'s visibility to buyers but do nothing for how vendors judge you. SEO builds the direct brand presence, reviews and local pages that win instructions without paying per listing. Most agents are best served by keeping strong portal coverage for stock and investing in SEO to lower their cost per instruction over time.',
  },
  {
    question: 'What is the most important SEO factor for a local estate agent?',
    answer:
      'Your Google Business Profile and reviews. For searches like \'estate agents near me\' the map pack sits above the normal results, and a complete profile with consistent name, address and phone details and a steady stream of recent reviews is what gets you into it and reassures vendors comparing you to rivals.',
  },
  {
    question: 'How much does SEO for estate agents cost?',
    answer:
      'It depends on how competitive your area is and the state of your current website and profile. Consultico works to your unit economics: one extra instruction can be worth thousands in fees, so we price against your average fee per instruction and tell you plainly whether the maths works before you commit.',
  },
  {
    question: 'Can SEO help a lettings agency attract more landlords?',
    answer:
      'Yes. Landlords search terms like \'letting agents [town]\' and \'property management [town]\' and compare fees, reviews and local knowledge before switching. Dedicated lettings and landlord pages, plus a strong review profile, put you in front of them at the point they are deciding who manages their property.',
  },
] as const;

export const ESTATE_AGENT_SEO_PAIN_POINTS = [
  {
    title: 'Renting the portals, owning nothing',
    body: 'Rightmove and Zoopla supply buyers, but they do not build your name with vendors. Over 80 percent of all portal time sits on Rightmove alone (Rightmove, 2024), so your brand is always competing on someone else\'s platform.',
  },
  {
    title: 'Losing the shortlist on Google',
    body: 'vendors research and compare agents before the valuation, and a thin website with few recent reviews quietly drops you off the list before you get the chance to pitch.',
  },
  {
    title: 'Looking like every other board on the street',
    body: 'fixed-fee and hybrid agents have pushed vendors to question commission, so an agent who cannot show local track record online ends up judged on price alone.',
  },
] as const;

export const ESTATE_AGENT_SEO_COVERAGE = [
  {
    title: 'Google Business Profile and local search',
    body: 'For local searches like "estate agents [town]", your Google Business Profile is the highest-return thing to fix first. We complete and optimise it, keep your name, address and phone details consistent everywhere they appear, and build a steady review habit, because reviews are the trust test a vendor applies before booking a valuation.',
  },
  {
    title: 'Local area and lettings pages',
    body: 'We build the pages that show you genuinely know your patch: sales and lettings pages, the towns and postcodes you cover, and landlord and property management pages for lettings growth. Clear, fast, mobile-friendly pages that answer what a vendor or landlord wants to know before they pick up the phone.',
  },
  {
    title: 'Content that answers what vendors and landlords ask',
    body: 'We build content around the real questions sellers search, from "how much is my house worth" to "sole or multi agency", so you get found earlier and trusted sooner. Useful content is also what AI search tools like ChatGPT and Google\'s AI Overviews quote when someone asks them to recommend a local agent.',
  },
  {
    title: 'Honest measurement',
    body: 'We track what matters, valuation enquiries and instructions won, not just rankings. If a channel is not earning its place, we say so.',
  },
] as const;

export const ESTATE_AGENT_SEO_PROCESS_STEPS = [
  {
    title: 'A look at your numbers and your market.',
    body: 'Your average fee per instruction, your patch and how competitive it is, and where your website, profile and reviews stand today, so any recommendation is grounded in what an instruction is actually worth to you.',
  },
  {
    title: 'Fix the foundations first.',
    body: 'Google Business Profile, the highest-impact website fixes, your local and lettings pages, and a review habit, the work that moves valuation enquiries fastest.',
  },
  {
    title: 'Build and measure.',
    body: 'Local content and authority over time, reported against valuations booked and instructions won, not vanity rankings.',
  },
] as const;

export const ESTATE_AGENT_WORKSHOP_TESTIMONIAL = {
  quote:
    'The team made the process straightforward and effective. Clear thinking, no fluff, and practical next steps.',
  name: 'Marcus Binnie',
  company: 'Promo Designs',
} as const;
