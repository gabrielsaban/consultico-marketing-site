import { getIndustryPath } from '@/lib/seo-industries';

export const SEO_FOR_DENTISTS_SLUG = 'seo-for-dentists';
export const SEO_FOR_DENTISTS_PATH = getIndustryPath(SEO_FOR_DENTISTS_SLUG);

/** Visible FAQ copy (section 3 of brief). */
export const SEO_FOR_DENTISTS_FAQS = [
  {
    question: 'How long does SEO take to bring a dental practice more private patients?',
    answer:
      'Most practices see movement in local rankings within two to three months and a meaningful change in consultation enquiries by month three to six. Cosmetic and implant searches often take longer because patients research for weeks, so the earliest gains usually come from a complete Google Business Profile, fresh reviews and clear treatment pages. Timescales depend on your town and how competitive it is.',
  },
  {
    question: 'Is dental SEO worth it when NHS demand is already so high?',
    answer:
      'Demand is high, but it does not automatically reach your chair. The BDA estimates around 13 million people had unmet dental need in 2024, roughly 28 percent of adults (BDA, 2024), and those patients search online before they call. SEO puts your practice in front of them when they choose who to trust, especially for private and cosmetic work where the fee matters to you.',
  },
  {
    question: 'Can SEO content stay within GDC advertising rules?',
    answer:
      'It has to. We build treatment pages and blog content that respect GDC and CQC limits on claims, testimonials and inducements, rather than copying generic agency templates that create compliance risk. We stay factual about treatments, costs and what patients can expect, and flag anything that needs your clinical lead to approve before it goes live.',
  },
  {
    question: 'What is the most important SEO factor for a local dentist?',
    answer:
      'Your Google Business Profile and reviews. For searches like "dentist near me" the map pack sits above the normal results, and a complete profile with consistent name, address and phone details plus a steady stream of recent reviews is what gets you into it and reassures patients comparing practices.',
  },
  {
    question: 'How much does SEO for dentists cost?',
    answer:
      'It depends on how competitive your area is and the state of your current website and profile. We work to your unit economics: one extra implant or Invisalign case can be worth thousands, so we price against your average private treatment value and give you a plain figure and the reasoning before you commit.',
  },
  {
    question: 'Can SEO help a practice get more implant and Invisalign enquiries?',
    answer:
      'Yes. Those are exactly the high-intent, high-research searches SEO is built for. Dedicated treatment pages, honest FAQs, review depth and local pages that answer cost and suitability questions put you in the shortlist while patients are still comparing practices online.',
  },
] as const;

/** FAQ copy for JSON-LD (section 2 of brief). */
export const SEO_FOR_DENTISTS_FAQS_SCHEMA = [
  {
    question: 'How long does SEO take to bring a dental practice more private patients?',
    answer:
      'Most practices see movement in local rankings within two to three months and a meaningful change in consultation enquiries by month three to six. Cosmetic and implant patients often research for weeks before booking, so the earliest gains usually come from a complete Google Business Profile, fresh reviews and clear treatment pages. Timescales depend on your area and how competitive it is.',
  },
  {
    question: 'Is dental SEO worth it when NHS demand is already so high?',
    answer:
      'Demand is high, but it does not automatically reach your practice. The BDA estimates around 13 million people had unmet dental need in 2024, roughly 28 percent of adults (BDA, 2024), and those patients search online before they call. SEO puts you in front of them when they choose who to trust, especially for private and cosmetic treatments where the fee income matters.',
  },
  {
    question: 'Can SEO content stay within GDC advertising rules?',
    answer:
      'It must. Consultico builds treatment pages and content that respect GDC and CQC limits on claims, testimonials and inducements, rather than generic templates that create compliance risk. Copy stays factual about treatments and expectations, and anything that needs clinical sign-off is flagged before publication.',
  },
  {
    question: 'What is the most important SEO factor for a local dentist?',
    answer:
      'Your Google Business Profile and reviews. For local searches like \'dentist near me\' the map pack sits above the normal results, and a complete profile with consistent name, address and phone details plus a steady stream of recent reviews is what gets you into it and reassures patients comparing you to rivals.',
  },
  {
    question: 'How much does SEO for dentists cost?',
    answer:
      'It depends on how competitive your area is and the state of your current website and profile. Consultico works to your unit economics: one extra private or cosmetic case can be worth thousands, so we price against your average treatment value and tell you plainly whether the maths works before you commit.',
  },
  {
    question: 'Can SEO help a practice get more implant and Invisalign enquiries?',
    answer:
      'Yes. Implant and Invisalign searches are high intent and high research. Dedicated treatment pages, honest FAQs, strong reviews and local pages that answer suitability and cost questions put you in the shortlist while patients are still comparing practices online.',
  },
] as const;

export const DENTIST_SEO_PAIN_POINTS = [
  {
    title: 'NHS demand you cannot capture',
    body: 'millions of people need a dentist but cannot access NHS care. The BDA estimates around 13 million had unmet dental need in 2024, roughly 28 percent of adults (BDA, 2024). Without search visibility, that demand goes to whichever practice ranks, not necessarily yours.',
  },
  {
    title: 'Cosmetic journeys that need trust first',
    body: 'implants, Invisalign and other private treatments are high-ticket and long-consideration. Patients research for weeks. Thin treatment pages, vague pricing and few recent reviews lose enquiries to a practice that looks clearer and more credible online.',
  },
  {
    title: 'Marketing that risks GDC rules',
    body: 'generic agencies promise leads but ignore GDC and CQC limits on claims, before-and-after content and inducements. One non-compliant page creates reputational and regulatory risk, so many principals avoid marketing altogether and stay invisible.',
  },
] as const;

export const DENTIST_SEO_COVERAGE = [
  {
    title: 'Google Business Profile and local search',
    body: 'For local searches like "dentist [town]" or "emergency dentist near me", your Google Business Profile is the highest-return thing to fix first. We complete and optimise it, keep your name, address and phone details consistent everywhere they appear, and build a steady review habit, because reviews are the trust test a patient applies before booking a consultation.',
  },
  {
    title: 'Treatment and cosmetic pages (GDC-aware)',
    body: 'We build the pages private patients actually read: implants, Invisalign, hygiene, nervous patients, finance options and the towns you cover. Copy stays factual and within GDC and CQC advertising limits, so you can publish with confidence rather than hoping a generic template does not overclaim.',
  },
  {
    title: 'Content that answers what patients ask',
    body: 'We build content around real searches, from "how much do dental implants cost" to "Invisalign vs braces", so you get found earlier in a long research journey and trusted sooner. Useful content is also what AI search tools like ChatGPT and Google\'s AI Overviews quote when someone asks them to recommend a local dentist.',
  },
  {
    title: 'Honest measurement',
    body: 'We track what matters, consultation enquiries and private cases booked, not just rankings. If a channel is not earning its place, we say so.',
  },
] as const;

export const DENTIST_SEO_PROCESS_STEPS = [
  {
    title: 'A look at your numbers and your market.',
    body: 'Your average private treatment value, the treatments you want to grow, your town and how competitive it is, and where your website, profile and reviews stand today, so any recommendation is grounded in what a new patient is actually worth to you.',
  },
  {
    title: 'Fix the foundations first.',
    body: 'Google Business Profile, the highest-impact website fixes, your core treatment pages and a review habit, the work that moves consultation enquiries fastest.',
  },
  {
    title: 'Build and measure.',
    body: 'Treatment content and authority over time, reported against enquiries and cases booked, not vanity rankings.',
  },
] as const;

export const DENTIST_WORKSHOP_TESTIMONIAL = {
  quote:
    'The team made the process straightforward and effective. Clear thinking, no fluff, and practical next steps.',
  name: 'Marcus Binnie',
  company: 'Promo Designs',
} as const;
