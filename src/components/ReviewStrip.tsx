'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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

const ROTATE_MS = 7000;

function GoldStars({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="h-5 w-5"
          fill="#FBBC04"
        >
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.23l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewStrip() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % featuredReviews.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <p className="mb-2 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
          Google reviews
        </p>

        <div className="mb-3 flex justify-center">
          <GoldStars label="Rated 5 out of 5 on Google" />
        </div>

        <h2 className="mb-3 font-futura text-[clamp(1.35rem,2.2vw,1.75rem)] font-bold text-brand-blue">
          Rated 5.0 on Google
        </h2>
        <p className="mb-8 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
          Verified feedback from clients.{' '}
          <Link href={CONSULTICO_GBP_URL} className="font-medium text-brand-blue hover:underline">
            Read all reviews on Google
          </Link>
        </p>

        {/*
          Every review is rendered, always. Only opacity changes as they rotate.
          A carousel that mounts one slide at a time would hide the other reviews
          from crawlers entirely, which is the problem this codebase already had
          with the project modal.
        */}
        <div
          className="grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {featuredReviews.map((review, index) => (
            <figure
              key={`${review.name}-${review.company}`}
              className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                index === active ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-hidden={index === active ? undefined : true}
            >
              <blockquote className="font-helvetica-light text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-helvetica text-[0.875rem] font-medium text-gray-900 dark:text-gray-100">
                {review.name}
                <span className="font-normal text-gray-600 dark:text-gray-400"> · {review.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-2">
          {featuredReviews.map((review, index) => (
            <button
              key={`dot-${review.name}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show review from ${review.name}`}
              aria-current={index === active ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                index === active ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25 hover:bg-brand-blue/45'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
