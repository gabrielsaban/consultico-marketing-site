'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '@/components/Container';
import { SEO_LANDING_HERO, type SeoHeroGraphic } from '@/lib/seo-landing-content';

const ROTATE_MS = 2200;
const TRANSITION_MS = 0.55;
const EASE = [0.4, 0, 0.2, 1] as const;

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-full w-full max-w-[23rem]">
      <div className="absolute inset-x-[4%] top-0 bottom-0 rounded-[2.8rem] border-[3px] border-[#D6D6D6] bg-white" />
      <div className="absolute inset-x-[7%] top-[3%] bottom-[4%] overflow-hidden rounded-[2.3rem] border-[3px] border-[#D6D6D6] bg-white">
        {children}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/80 to-white" />
      </div>
      <div className="absolute right-0 top-[28%] h-16 w-1 rounded-r bg-[#D6D6D6]" />
      <div className="absolute left-0 top-[36%] h-10 w-1 rounded-l bg-[#D6D6D6]" />
      <div className="absolute left-0 top-[48%] h-10 w-1 rounded-l bg-[#D6D6D6]" />
    </div>
  );
}

function GoogleScreen() {
  return (
    <div className="flex h-full flex-col px-5 pt-6">
      <div className="relative mb-4 flex items-center justify-between">
        <span className="mx-auto font-helvetica text-[1.1rem] font-bold tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </span>
        <span className="absolute right-1 top-0 h-7 w-7 rounded-full bg-[#E8E8E8]" />
      </div>
      <div className="mb-5 flex h-9 items-center gap-2 rounded-full border border-[#E1E1E1] px-3.5">
        <span className="h-3.5 w-3.5 rounded-full border border-[#B0B0B0]" />
        <span className="h-2.5 flex-1 rounded bg-[#E8F3FE]" />
      </div>
      <ResultRow accent />
      <ResultRow />
      <ResultRow />
    </div>
  );
}

function ResultRow({ accent = false }: { accent?: boolean }) {
  const bar = accent ? 'bg-[#AED6FF]' : 'bg-[#E5E5E5]';
  const circle = accent ? 'bg-[#AED6FF]' : 'bg-[#E5E5E5]';
  return (
    <div className="mb-3.5 flex gap-2.5">
      <span className={`mt-0.5 h-5 w-5 shrink-0 rounded-full ${circle}`} />
      <div className="flex-1 space-y-2">
        <div className={`h-4 w-3/4 rounded ${bar}`} />
        <div className={`h-1.5 w-full rounded ${bar}`} />
        <div className={`h-1.5 w-5/6 rounded ${bar}`} />
      </div>
    </div>
  );
}

function AiScreen() {
  return (
    <div className="flex h-full flex-col gap-3 px-5 pt-7">
      <div className="ml-auto w-[78%] rounded-2xl rounded-tr-md bg-[#D5D5D5] px-3.5 py-3">
        <div className="mb-1.5 h-1.5 w-full rounded bg-white/60" />
        <div className="mb-1.5 h-1.5 w-4/5 rounded bg-white/60" />
        <div className="h-1.5 w-1/2 rounded bg-white/60" />
      </div>
      <div className="w-[85%] rounded-2xl rounded-tl-md bg-[#AED6FF] px-3.5 py-3">
        <div className="mb-1.5 h-1.5 w-full rounded bg-white/70" />
        <div className="mb-1.5 h-1.5 w-full rounded bg-white/70" />
        <div className="mb-2.5 h-1.5 w-2/5 rounded bg-white/70" />
        <div className="h-3 w-full rounded bg-white/90" />
      </div>
      <div className="ml-auto w-[70%] rounded-2xl rounded-tr-md bg-[#D5D5D5] px-3.5 py-2.5">
        <div className="h-1.5 w-full rounded bg-white/60" />
      </div>
    </div>
  );
}

function MapsScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-[#E8F3FE]">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(#c5d8ef 1px, transparent 1px), linear-gradient(90deg, #c5d8ef 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute left-[18%] top-[22%] h-20 w-24 rounded-2xl bg-[#B8D4A8]/80" />
      <div className="absolute right-[12%] top-[40%] h-14 w-28 rounded-2xl bg-[#B8D4A8]/60" />
      <div className="absolute bottom-[30%] left-[28%] h-11 w-32 rounded-full bg-white/80 shadow-sm" />
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2">
        <div className="relative h-14 w-9">
          <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-[#EA4335] shadow" />
          <div
            className="absolute bottom-0 left-1/2 h-6 w-3.5 -translate-x-1/2 bg-[#EA4335]"
            style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
          />
        </div>
      </div>
    </div>
  );
}

function HeroPhoneGraphic({
  kind,
  reduceMotion,
}: {
  kind: SeoHeroGraphic;
  reduceMotion: boolean;
}) {
  const screens: Record<SeoHeroGraphic, React.ReactNode> = {
    google: <GoogleScreen />,
    ai: <AiScreen />,
    maps: <MapsScreen />,
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: TRANSITION_MS, ease: EASE };

  return (
    <PhoneChrome>
      <AnimatePresence mode="wait">
        <motion.div
          key={kind}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={transition}
        >
          {screens[kind]}
        </motion.div>
      </AnimatePresence>
    </PhoneChrome>
  );
}

export default function SeoDiscoveryHero() {
  const { punchLine, primaryCta, secondaryCta, blueBand, rotateStates } = SEO_LANDING_HERO;
  const [index, setIndex] = useState(0);
  const [animateTrack, setAnimateTrack] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const active = rotateStates[index % rotateStates.length];
  const textSlides = [...rotateStates, rotateStates[0]];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      const visible = !document.hidden;
      setPageVisible(visible);
      setAnimateTrack(false);
      setIndex(0);

      if (visible) {
        window.requestAnimationFrame(() => setAnimateTrack(true));
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || !pageVisible) return;
    const timer = window.setInterval(() => {
      setAnimateTrack(true);
      setIndex((current) => (current >= rotateStates.length ? 1 : current + 1));
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [pageVisible, reduceMotion, rotateStates.length]);

  const resetLoop = () => {
    if (index !== rotateStates.length) return;
    setAnimateTrack(false);
    setIndex(0);
  };

  return (
    <section
      className="relative overflow-hidden bg-white pb-12 pt-[7.5rem] dark:bg-gray-950 md:pb-16 md:pt-14 lg:pt-10"
      aria-labelledby="seo-landing-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(#D0D0D0 1.1px, transparent 1.1px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 78%)',
        }}
      />

      <Container>
        <div className="relative mx-auto flex max-w-[48rem] flex-col items-center text-center">
          <div className="relative mb-7 h-[min(62vw,28rem)] w-[min(58vw,23rem)] md:mb-8 md:h-[28rem] md:w-[23rem]">
            <HeroPhoneGraphic kind={active.graphic} reduceMotion={reduceMotion} />
          </div>

          <div
            className="relative w-full max-w-[23rem] overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.div
              className="flex"
              animate={{ x: `${-index * 100}%` }}
              onAnimationComplete={resetLoop}
              transition={
                reduceMotion || !animateTrack
                  ? { duration: 0 }
                  : { duration: TRANSITION_MS, ease: EASE }
              }
            >
              {textSlides.map((state, i) => (
                <p
                  key={`${state.id}-${i}`}
                  aria-hidden={i !== index}
                  className="w-full shrink-0 font-helvetica text-[clamp(1.5rem,2.8vw,2rem)] font-bold tracking-[-0.02em] text-[#212426] dark:text-gray-100"
                >
                  {state.before}
                  <span className="text-[#4285F4]">{state.accent}</span>
                </p>
              ))}
            </motion.div>
          </div>

          <h1
            id="seo-landing-hero-heading"
            className="mt-3 font-helvetica text-[clamp(2.75rem,6.5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#212426] dark:text-white md:mt-3.5"
          >
            {punchLine}
          </h1>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5 md:mt-9">
            <Link
              href={primaryCta.href}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-10 font-helvetica text-[1.05rem] font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex h-14 items-center justify-center rounded-xl border border-brand-blue bg-white px-10 font-helvetica text-[1.05rem] font-medium text-brand-blue transition-colors hover:bg-brand-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:bg-transparent dark:hover:bg-brand-blue/10"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-[71.25rem] overflow-hidden rounded-[1.5rem] bg-brand-blue px-6 py-10 text-center shadow-[0_18px_40px_rgba(0,123,255,0.22)] md:mt-16 md:px-16 md:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0, transparent 42%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.18) 0, transparent 40%), radial-gradient(circle at 50% 100%, rgba(0,0,0,0.12) 0, transparent 45%)',
            }}
          />
          <p className="relative mx-auto max-w-[47rem] font-helvetica text-[clamp(1.2rem,2.4vw,2.05rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
            {blueBand}
          </p>
          <div className="relative mx-auto mt-8 flex max-w-[32rem] items-center justify-center rounded-full bg-white/95 px-5 py-3 shadow-sm">
            <Image
              src="/seo-landing/channel-icons.png"
              alt="Safari, Chrome, Instagram, AI, Facebook, ChatGPT, Maps and more"
              width={437}
              height={32}
              className="h-7 w-auto max-w-full object-contain md:h-8"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
