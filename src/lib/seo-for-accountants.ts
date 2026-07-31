import { getIndustryPath } from '@/lib/seo-industries';

export const SEO_FOR_ACCOUNTANTS_SLUG = 'seo-for-accountants';
export const SEO_FOR_ACCOUNTANTS_PATH = getIndustryPath(SEO_FOR_ACCOUNTANTS_SLUG);

/** Visible FAQ copy (section 3 of brief). */
export const SEO_FOR_ACCOUNTANTS_FAQS = [
  {
    question: 'How long does SEO take to bring an accountancy firm new clients?',
    answer:
      'Most firms see movement in local rankings within two to three months and a meaningful change in enquiries by month three to six. Accountancy is a considered, trust-led purchase, so prospects often research for a while before booking. The earliest gains usually come from a complete Google Business Profile, fresh reviews and clear proof of your qualifications.',
  },
  {
    question: 'Is SEO or Google Ads better for accountants?',
    answer:
      'Google Ads buys enquiries the day you switch it on but stops when you pause the budget, and accountancy keywords can be expensive. SEO takes longer to build but keeps generating enquiries without a cost per click. Most firms want targeted ads around deadlines and SEO to lower their cost per client over the long term.',
  },
  {
    question: 'Should an accountancy firm target local or specialist SEO?',
    answer:
      'Both, but specialism wins. Generic "accountant near me" traffic is crowded and price-driven, while pages for a clear niche, such as contractor accountant, limited company or landlord accounting, attract better-fit clients who value expertise over the cheapest quote. We help you rank locally and own the specialisms worth most to you.',
  },
  {
    question: 'Can SEO help accountants win clients from Making Tax Digital?',
    answer:
      'Yes. Making Tax Digital for Income Tax began in April 2026 for sole traders and landlords with qualifying income over £50,000, and the threshold falls to £30,000 in April 2027 and £20,000 in April 2028 (GOV.UK). Each wave brings people looking for an accountant for the first time. Clear MTD pages that explain the rules and deadlines capture that demand ahead of firms that have published nothing on it.',
  },
  {
    question: 'How much does SEO for accountants cost?',
    answer:
      'It depends on how competitive your area and specialisms are and the state of your current site. We work to your unit economics: a retained client can be worth thousands a year for several years, so we price against your average client lifetime value and give you a plain figure and the reasoning before you commit.',
  },
  {
    question: 'Why do prospects check an accountant online even after a referral?',
    answer:
      'Because accountant is not a protected title in the UK, so trust has to be earned. A referred prospect almost always searches your firm before calling, checking your reviews, qualifications and website. If those confirm the referral you win the client, and if they are thin or missing you can lose a warm lead you never knew you had.',
  },
] as const;

/** FAQ copy for JSON-LD (section 2 of brief). */
export const SEO_FOR_ACCOUNTANTS_FAQS_SCHEMA = [
  {
    question: 'How long does SEO take to bring an accountancy firm new clients?',
    answer:
      'Most firms see movement in local rankings within two to three months and a meaningful change in enquiries by month three to six. Accountancy is a considered, trust-led purchase, so prospects often research for a while before booking a consultation. The earliest gains usually come from a complete Google Business Profile, fresh reviews and clear proof of your qualifications.',
  },
  {
    question: 'Is SEO or Google Ads better for accountants?',
    answer:
      'Google Ads buys enquiries the day you switch it on but stops when you pause the budget, and accountancy keywords can be expensive. SEO takes longer to build but keeps generating enquiries without a cost per click. Most firms are best served by targeted ads around deadlines and SEO to lower their cost per client over the long term.',
  },
  {
    question: 'Should an accountancy firm target local or specialist SEO?',
    answer:
      'Both, but specialism wins. Generic \'accountant near me\' traffic is crowded and price-driven, while pages for a clear niche, such as contractor accountant, limited company or landlord accounting, attract better-fit clients who value expertise over the cheapest quote. We help you rank locally and own the specialisms that are worth most to you.',
  },
  {
    question: 'Can SEO help accountants win clients from Making Tax Digital?',
    answer:
      'Yes. Making Tax Digital for Income Tax began in April 2026 for sole traders and landlords with qualifying income over £50,000, and the threshold falls to £30,000 in April 2027 and £20,000 in April 2028 (GOV.UK). Each wave brings people looking for an accountant for the first time. Clear MTD pages that explain the rules and deadlines capture that demand ahead of firms that have published nothing on it.',
  },
  {
    question: 'How much does SEO for accountants cost?',
    answer:
      'It depends on how competitive your area and specialisms are and the state of your current website. Consultico works to your unit economics: a retained client can be worth thousands a year for several years, so we price against your average client lifetime value and tell you plainly whether the maths works before you commit.',
  },
  {
    question: 'Why do prospects check an accountant online even after a referral?',
    answer:
      'Because accountant is not a protected title in the UK, so trust has to be earned. A referred prospect almost always searches your firm before calling, checking your reviews, your qualifications and your website. If those confirm the referral you win the client, and if they are thin or missing you can lose a warm lead you never knew you had.',
  },
] as const;

export const ACCOUNTANT_SEO_PAIN_POINTS = [
  {
    title: 'A referral that dies on Google',
    body: 'a prospect who was told to call you searches you first, and a website with no recent reviews or clear credentials quietly ends a warm lead before you hear about it.',
  },
  {
    title: 'Drowning in generic search',
    body: 'competing only for "accountant near me" pits you against national online-only firms on price, instead of owning specialisms like contractor, limited company or landlord accounting where better clients look.',
  },
  {
    title: 'Silence on what clients are worried about',
    body: 'with Making Tax Digital, IR35 and Self Assessment deadlines driving searches, a firm that has published nothing loses that traffic to one that has.',
  },
] as const;

export const ACCOUNTANT_SEO_COVERAGE = [
  {
    title: 'Google Business Profile, reviews and credentials',
    body: 'For local searches like "accountants [town]", your Google Business Profile is the highest-return thing to fix first. We complete and optimise it, keep your details consistent everywhere, and build a steady review habit, then make sure your qualifications, ICAEW, ACCA, AAT or CIMA, are clear on your site, because a prospect checking a referral needs both the reviews and the credentials to say yes.',
  },
  {
    title: 'Specialist and service pages',
    body: 'We build the pages that win better-fit clients: clear pages for your specialisms and services, such as limited company accounting, contractor and IR35, Self Assessment, landlord and property, VAT and payroll. Niche pages attract clients who value expertise over the cheapest quote.',
  },
  {
    title: 'Content that answers what clients ask',
    body: 'We build content around the real questions clients search, from "do I need an accountant for a limited company" to "Making Tax Digital explained", so you get found earlier and trusted sooner. Useful content is also what AI search tools like ChatGPT and Google\'s AI Overviews quote when someone asks them to recommend an accountant.',
  },
  {
    title: 'Honest measurement',
    body: 'We track what matters, consultation enquiries and clients won, not just rankings. If a channel is not earning its place, we say so.',
  },
] as const;

export const ACCOUNTANT_SEO_PROCESS_STEPS = [
  {
    title: 'A look at your numbers and your market.',
    body: 'Your average client lifetime value, the specialisms and clients you want more of, your area\'s competition, and where your website, profile and reviews stand today, so any recommendation is grounded in what a client is actually worth to you.',
  },
  {
    title: 'Fix the foundations first.',
    body: 'Google Business Profile, reviews, clear credentials, the highest-impact website fixes and your priority specialist pages, the work that moves enquiries fastest.',
  },
  {
    title: 'Build and measure.',
    body: 'Specialist content and authority over time, reported against clients won, not vanity rankings.',
  },
] as const;

export const ACCOUNTANT_WORKSHOP_TESTIMONIAL = {
  quote:
    'The team made the process straightforward and effective. Clear thinking, no fluff, and practical next steps.',
  name: 'Marcus Binnie',
  company: 'Promo Designs',
} as const;
