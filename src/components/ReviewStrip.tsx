import Link from 'next/link';
import { CONSULTICO_GBP_URL } from '@/lib/contact';

const featuredReviews = [
  {
    quote:
      'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
    name: 'Ant Vitale',
    company: 'The Boiler Co.',
  },
  {
    quote:
      "Together they've got Easyline ranking on page 1 of Google for multiple keywords. Reliable, efficient, and results-driven.",
    name: 'John',
    company: 'Easy Line Laundry Chutes',
  },
  {
    quote:
      'Paul is always available, delivering fast, effective support. They built a professional website, launched a successful Google Ads campaign, and now handle all my marketing with precision and care.',
    name: 'Graeme',
    company: 'MCD Gas',
  },
];

export default function ReviewStrip() {
  return (
    <section className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <p className="mb-2 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
          Google reviews
        </p>
        <h2 className="mb-3 font-futura text-[clamp(1.35rem,2.2vw,1.75rem)] font-bold text-brand-blue">
          Rated 5.0 on Google
        </h2>
        <p className="mb-8 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
          Verified feedback from clients.{' '}
          <Link href={CONSULTICO_GBP_URL} className="font-medium text-brand-blue hover:underline">
            Read all reviews on Google
          </Link>
        </p>
        <ul className="space-y-4 text-left">
          {featuredReviews.map((review) => (
            <li
              key={`${review.name}-${review.company}`}
              className="rounded-2xl border border-gray-200 bg-brand-silk/50 p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <blockquote className="font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-800 dark:text-gray-200">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className="mt-3 font-helvetica text-[0.875rem] font-medium text-gray-900 dark:text-gray-100">
                {review.name}
                <span className="font-normal text-gray-600 dark:text-gray-400"> · {review.company}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
