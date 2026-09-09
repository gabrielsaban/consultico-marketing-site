'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import ImageFilledText from '@/components/ImageFilledText';
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

      {/* Main Hero Content - Centered Slogan */}
      <Container className="w-full">
        <motion.div
          className="text-center [@media(max-height:800px)]:translate-y-6"
          variants={containerVariants}
          initial={skipEntryAnimation ? false : 'hidden'}
          animate="visible"
        >
          {/* Slogan. Holds the LCP element, so it uses sloganVariants (no opacity). */}
          <motion.div className="mb-12" variants={sloganVariants}>
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {/* Line 1: "in a world of noise" */}
              <div className="flex flex-wrap items-baseline justify-center gap-3 md:gap-4">
                <h1 className="text-blue-primary font-futura font-[750] text-[clamp(1.65rem,4.55vmin,3.35rem)] [@media(max-height:800px)]:text-[clamp(1.9rem,5.3vmin,3.9rem)] 2xl:text-[clamp(2rem,3.9vw,4rem)] leading-[1.1]">
                  in a world of
                </h1>
                <ImageFilledText 
                  text="noise" 
                  className="font-futura font-[750] text-[clamp(3rem,8.75vmin,7.5rem)] [@media(max-height:800px)]:text-[clamp(3.5rem,10.15vmin,8.7rem)] 2xl:text-[clamp(3.75rem,7.75vw,9.75rem)] leading-[1]"
                />
              </div>
              
              {/* Line 2: "we make your brand heard" */}
              <h2 className="text-blue-primary font-futura font-[750] text-[clamp(1.65rem,4.55vmin,3.35rem)] [@media(max-height:800px)]:text-[clamp(1.9rem,5.3vmin,3.9rem)] 2xl:text-[clamp(2rem,3.9vw,4rem)] leading-[1.1]">
                we make your brand heard
              </h2>
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div className="mb-14" variants={itemVariants}>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-primary to-transparent mx-auto w-[30vw]"  />
          </motion.div>

          {/* Supporting Line - Strategy Focus */}
          <motion.div className="mb-8" variants={itemVariants}>
            <p className="text-blue-primary opacity-80 font-futura font-medium text-[clamp(1rem,2.25vw,1.9rem)] [@media(max-height:800px)]:text-[clamp(0.95rem,1.85vw,1.5rem)] leading-[1.3]">
              A Strategy-Led Digital Marketing Studio
            </p>
          </motion.div>

          {/* Philosophy Micro Line */}
          <motion.div className="mb-10" variants={itemVariants}>
            <p className="text-gray-600 dark:text-gray-300 font-futura text-[clamp(0.75rem,0.9vw,0.85rem)] tracking-[0.15em] opacity-70 uppercase">
               Clarity <span className="mx-2">·</span> Strategy <span className="mx-2">·</span> Growth
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              className="bg-blue-primary text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get in touch with Consultico"
              onClick={() => {
                scrollToHomeSection('contact');
              }}
            >
              Get in touch
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
