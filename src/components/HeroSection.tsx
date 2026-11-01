'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import HeroOrbit from '@/components/HeroOrbit';
import ContactHeaderButton from '@/components/ContactHeaderButton';
import { consumeHomeEntryAnimationSkip, scrollToHomeSection } from '@/lib/homeNavigation';

// Animation variants for staggered content reveal.
//
// ⚠️ NOTHING IN THE HERO MAY START AT opacity: 0 ABOVE THE FOLD. Chrome refuses
// to treat an opacity:0 element as an LCP candidate, and framer-motion writes
// its `hidden` variant into the SERVER-RENDERED HTML. So an opacity:0 hero does
// not become eligible for LCP until React has hydrated and the animation has
// run, which chains the metric to hydration cost rather than to paint.
//
// That is what happened here. The container shipped as style="opacity:0" and
// mobile LCP tracked hydration all the way out: 2.5s in July, 6.7s on 08-09,
// 8.5s on 09-09, climbing every time another client component was added to the
// homepage (PostHog and the newsletter strip both landed on 09-08). Lighthouse
// put 93% of an 8.5s LCP in Render Delay with the hero h2 as the element.
//
// The container therefore only orchestrates the stagger now, and the slogan
// block (which CONTAINS the LCP element) animates transform only. A transformed
// element still paints, so it is an LCP candidate from first paint.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.45,
    },
  },
};

// For the slogan block ONLY. Movement without opacity, so the headings are
// painted and LCP-eligible immediately. Do not add opacity to this.
const sloganVariants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut bezier
    },
  },
};

// For everything BELOW the slogan. These are not LCP candidates, so they keep
// the original fade.
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut bezier
    },
  },
};

export default function HeroSection() {
  const [skipEntryAnimation] = useState(() => {
    if (typeof window === 'undefined') return false;
    return consumeHomeEntryAnimationSkip();
  });

  return (
    <div className="min-h-[100svh] relative flex items-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand logo SVG - positioned near top-left on desktop (hidden on phones; TopBar shows logo) */}
      <motion.div 
        className="absolute top-[3.25rem] left-4 sm:left-6 md:left-[5vw] lg:left-[7.5vw] hidden md:block"
        initial={skipEntryAnimation ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.15, 
          duration: 0.35, 
          ease: "easeOut" 
        }}
      >
        <Image
          src="/brand/logo_main.svg"
          alt="Consultico"
          width={420}
          height={120}
          className="block h-auto w-[min(36vw,520px)] [@media(max-height:800px)]:w-[min(32vw,460px)]"
          style={{ maxWidth: 'min(36vw, 520px)', height: 'auto' }}
          priority
        />
      </motion.div>
      
      {/* Header contact button - hidden on phones; TopBar shows compact contact shortcut */}
      <motion.div 
        className="absolute top-[3.25rem] right-4 sm:right-6 md:right-[5vw] lg:right-[7.5vw] hidden md:flex"
        initial={skipEntryAnimation ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.15, 
          duration: 0.35, 
          ease: "easeOut" 
        }}
      >
        <ContactHeaderButton />
      </motion.div>

      {/* Main hero. Loop is the front door (identity plan, 2026-10-31): the
          slogan as the H1 and one plain sentence under it. The "Loop, by
          Consultico" pill came out on 2026-11-01 (Paul): the logo above and
          the Loop ring beside already say it. Who sits behind Loop is explained further down the
          page, so the hero stays about the reader. */}
      <Container className="w-full">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] [@media(max-height:800px)]:translate-y-6"
          variants={containerVariants}
          initial={skipEntryAnimation ? false : 'hidden'}
          animate="visible"
        >
          <div className="text-left">
            {/* Holds the LCP element, so it uses sloganVariants (no opacity). */}
            <motion.h1
              className="font-futura font-[750] leading-[1.04] tracking-[-0.02em] text-[clamp(2.4rem,4.3vw,4.6rem)] [@media(max-height:800px)]:text-[clamp(2.2rem,3.9vw,4rem)] lg:[&>span]:whitespace-nowrap"
              variants={sloganVariants}
            >
              <span className="block text-[#1B2A4A] dark:text-white">Sharper every week.</span>
              <span className="block text-blue-primary">Further every year.</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-[34rem] font-helvetica-light text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.6] text-gray-700 dark:text-gray-200"
              variants={itemVariants}
            >
              An extra part of your marketing team that takes a fresh look every week and helps you do more of what works.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" variants={itemVariants}>
              <motion.button
                type="button"
                className="bg-blue-primary text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  scrollToHomeSection('contact');
                }}
              >
                Apply now
              </motion.button>
              <button
                type="button"
                className="font-helvetica font-medium text-[clamp(0.95rem,1.1vw,1.05rem)] text-blue-primary underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
                onClick={() => {
                  scrollToHomeSection('loop');
                }}
              >
                Meet Loop <span aria-hidden="true">↓</span>
              </button>
            </motion.div>
          </div>

          {/* No entry variant: the ring draws itself in (see HeroOrbit), so it
              doesn't also slide up from below. */}
          <div className="hidden lg:block">
            <HeroOrbit />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
