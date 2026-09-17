'use client';

import Image from 'next/image';
import { useState } from 'react';
import Container from '@/components/Container';
import SeoLandingModal from '@/components/seo-landing/SeoLandingModal';
import { SEO_LANDING_CHANNELS, type SeoChannelId } from '@/lib/seo-landing-content';

export default function SeoDiscoveryChannels() {
  const [openId, setOpenId] = useState<SeoChannelId | null>(null);
  const active = SEO_LANDING_CHANNELS.find((channel) => channel.id === openId) ?? null;

  return (
    <section
      id="channels"
      className="relative scroll-mt-28 overflow-hidden bg-white py-14 dark:bg-gray-950 md:py-20"
      aria-labelledby="seo-channels-heading"
    >
      <div
        className="pointer-events-none absolute -left-[18rem] top-[8%] h-[42rem] w-[42rem] rounded-full border-[48px] border-[#E8F3FE] opacity-70 dark:border-brand-blue/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[20rem] bottom-[-10%] h-[48rem] w-[48rem] rounded-full border-[56px] border-[#E8F3FE] opacity-80 dark:border-brand-blue/10"
        aria-hidden="true"
      />

      <Container>
        <h2 id="seo-channels-heading" className="sr-only">
          How we get you discovered
        </h2>
        <div className="relative mx-auto grid max-w-[64rem] grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-20 md:gap-y-16">
          {SEO_LANDING_CHANNELS.map((channel) => (
            <article key={channel.id} id={channel.id} className="flex flex-col">
              <div className="relative mb-5 aspect-[310/250] w-full overflow-hidden">
                <Image
                  src={channel.media}
                  alt={channel.personAlt}
                  fill
                  className="object-contain object-left-bottom"
                  sizes="(max-width: 768px) 100vw, 32rem"
                />
              </div>
              <h3
                className={`${channel.id === 'seo' ? 'max-w-[22ch]' : 'max-w-[16ch]'} font-helvetica text-[clamp(1.5rem,2.2vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#0556B3]`}
              >
                {channel.heading}
              </h3>
              <p className="mt-3 inline-flex w-fit rounded-full bg-[#E8F3FE] px-3 py-1 font-helvetica text-[0.875rem] text-[#212426] dark:bg-brand-blue/20 dark:text-gray-100">
                {channel.eyebrow}
              </p>
              <p className="mt-4 max-w-[34ch] font-helvetica text-[1rem] leading-[1.4] tracking-[-0.02em] text-[#212426] dark:text-gray-200">
                {channel.body}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(channel.id)}
                className="mt-6 inline-flex h-10 w-full max-w-[19.375rem] items-center justify-center rounded-xl border border-brand-blue font-helvetica text-[1rem] text-brand-blue transition-colors hover:bg-brand-blue hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {channel.ctaLabel}
              </button>
            </article>
          ))}
        </div>
      </Container>

      <SeoLandingModal open={Boolean(active)} onClose={() => setOpenId(null)} title={active?.detailHeading ?? ''}>
        {active ? <p>{active.detailBody}</p> : null}
      </SeoLandingModal>
    </section>
  );
}
