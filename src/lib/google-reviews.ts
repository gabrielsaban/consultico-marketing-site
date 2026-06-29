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
