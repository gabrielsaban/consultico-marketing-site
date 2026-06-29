export interface GoogleReviewExcerpt {
  quote: string;
  name: string;
  company: string;
}

/** Short excerpts from verified Google reviews (full text in ReviewsCarousel). */
export const seoPageGoogleReviews: GoogleReviewExcerpt[] = [
  {
    quote:
      "Together they've got Easyline ranking on page 1 of Google for multiple keywords. Reliable, efficient, and results-driven.",
    name: 'John',
    company: 'Easy Line Laundry Chutes',
  },
  {
    quote: 'Paul was genuine, knowledgeable, and always willing to explain things clearly.',
    name: 'Ant Vitale',
    company: 'The Boiler Co.',
  },
  {
    quote:
      "Consultico are a pleasure to work with. They made the whole process straightforward and effective. I couldn't recommend them more highly.",
    name: 'Marcus Binnie',
    company: 'Promo Designs',
  },
  {
    quote:
      'Paul is always available, delivering fast, effective support. They built a professional website, launched a successful Google Ads campaign, and now handle all my marketing with precision and care.',
    name: 'Graeme',
    company: 'MCD Gas',
  },
];

/** Full verbatim GBP text for the PPC page (order: Graeme, John, Marcus, Ant). */
export const ppcPageGoogleReviews: GoogleReviewExcerpt[] = [
  {
    quote:
      "I've worked with Consultico for four months and couldn't be happier. Paul is always available, delivering fast, effective support. They built a professional website, launched a successful Google Ads campaign, and now handle all my marketing with precision and care. Highly recommended for anyone needing quality marketing and web development.",
    name: 'Graeme',
    company: 'MCD Gas',
  },
  {
    quote:
      "I've worked with Marcus for 2 years and now with Paul. Together they've got Easyline ranking on page 1 of Google for multiple keywords. Both are quick to respond and always open to new ideas, regularly meeting to plan next steps. Reliable, efficient, and results-driven. I'm confident they'll continue delivering great SEO and digital marketing support.",
    name: 'John',
    company: 'Easy Line Laundry Chutes',
  },
  {
    quote:
      "Consultico are a pleasure to work with. The team is incredibly friendly, knowledgeable, and always willing to go the extra mile. They made the whole process straightforward and effective. I couldn't recommend them more highly.",
    name: 'Marcus Binnie',
    company: 'Promo Designs',
  },
  {
    quote:
      "I can't thank Consultico enough. My business had hit a slump, busy with existing clients but getting no new ones. After dealing with pushy agencies and expensive quotes, I almost lost hope. Then I found Paul, who was genuine, knowledgeable, and always willing to explain things clearly.",
    name: 'Ant Vitale',
    company: 'The Boiler Co.',
  },
];
