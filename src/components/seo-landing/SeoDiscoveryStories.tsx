'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/Container';
import SeoLandingModal from '@/components/seo-landing/SeoLandingModal';
import { SEO_LANDING_GBP_URL, SEO_LANDING_STORIES } from '@/lib/seo-landing-content';

export default function SeoDiscoveryStories() {
  const [openId, setOpenId] = useState<(typeof SEO_LANDING_STORIES)[number]['id'] | null>(null);
  const active = SEO_LANDING_STORIES.find((story) => story.id === openId) ?? null;

  return (
    <section className="bg-white py-14 dark:bg-gray-950 md:py-20" aria-labelledby="seo-stories-heading">
      <Container>
        <div className="mx-auto max-w-[62rem] text-center">
          <p className="font-helvetica text-[4rem] leading-none text-[#0556B3]" aria-hidden="true">
            ”
          </p>
          <h2
            id="seo-stories-heading"
            className="mt-[-0.5rem] font-helvetica text-[clamp(1.75rem,3vw,2.35rem)] font-bold tracking-[-0.03em] text-[#212426] dark:text-white"
          >
            Success Stories
          </h2>
          <p className="mt-2 font-helvetica text-[0.95rem] text-gray-600 dark:text-gray-400">
            Rated 5.0 on Google · verified client reviews
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[62rem] grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {SEO_LANDING_STORIES.map((story) => (
            <li key={story.id} className="relative pt-8">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-[#E8F3FE] dark:bg-gray-900">
                <div
                  className="absolute left-5 top-0 z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-sm dark:border-gray-950"
                  style={{ backgroundColor: story.logoBg }}
                >
                  <Image
                    src={story.logo}
                    alt={`${story.name} logo`}
                    width={72}
                    height={72}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="px-5 pb-4 pt-10 text-left">
                  <h3 className="font-helvetica text-[1.25rem] font-bold tracking-[-0.03em] text-[#0556B3]">
                    {story.name}
                  </h3>
                  <p className="mt-1 font-helvetica text-[1rem] text-[#212426] dark:text-gray-300">{story.sector}</p>
                </div>
                <div className="flex flex-1 flex-col rounded-b-[1.25rem] bg-[#F7F7F7] px-5 pb-5 pt-6 dark:bg-gray-800">
                  <p className="flex-1 font-helvetica text-[1rem] leading-[1.4] text-[#212426] dark:text-gray-200">
                    “{story.teaser}”
                  </p>
                  <p className="mt-3 font-helvetica text-[0.875rem] text-gray-600 dark:text-gray-400">
                    {story.reviewer}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenId(story.id)}
                    className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-xl border border-[#4D4D4D] font-helvetica text-[1rem] text-[#4D4D4D] transition-colors hover:border-brand-blue hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:border-gray-400 dark:text-gray-200"
                  >
                    More details
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <SeoLandingModal
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        title={active ? `${active.name}` : ''}
        footer={
          <Link
            href={SEO_LANDING_GBP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex font-helvetica text-[0.95rem] font-medium text-brand-blue hover:underline"
          >
            Read reviews on Google
          </Link>
        }
      >
        {active ? (
          <>
            <blockquote className="font-helvetica text-[1.05rem] leading-[1.6]">
              “{active.quote}”
            </blockquote>
            <p className="mt-4 font-helvetica text-[0.95rem] text-gray-600 dark:text-gray-400">
              {active.reviewer} · {active.name}
            </p>
          </>
        ) : null}
      </SeoLandingModal>
    </section>
  );
}
