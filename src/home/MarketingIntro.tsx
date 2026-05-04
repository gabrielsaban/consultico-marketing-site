'use client';

import type { JSX } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/AnimatedText';

export default function MarketingIntro(): JSX.Element {
  const prefersReduced = useReducedMotion();
  const marketingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: marketingRef,
    offset: ["start center", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-brand-silk dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)]" ref={marketingRef}>
      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <div className="text-left max-w-4xl mx-auto">
          <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary mb-8 font-futura">
            Your marketing spend is being wasted.
          </h3>
          <div className="relative pl-8">
            <AnimatedText
              paragraphs={[
                "You're probably already spending on content, your website, and promotion. Maybe you're doing it yourself. Maybe you're working with an agency.",
                "The hard truth is this: if those things aren't working together, you're wasting money. Your marketing can work ten times harder for you - without starting from scratch.",
                "You don't have a budget problem. You don't have an ideas problem. You have a strategy problem.",
                "That's the most common thing stopping consumer brands from reaching the seven- or eight-figure revenue they're looking for.",
              ]}
              className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light tracking-normal"
              highlightWords={[]}
            />
            <motion.div
              className="absolute left-[0rem] top-0 bottom-0 w-0.5 bg-brand-blue opacity-60"
              style={{ scaleY: prefersReduced ? 1 : lineScale, transformOrigin: 'top' }}
            />
          </div>
          <div className="mt-8 flex flex-col items-start gap-5">
            <p className="text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.55] text-gray-900 dark:text-gray-100 font-helvetica">
              A free 30-minute chat with our team could transform your business. Get in touch today.
            </p>
            <motion.a
              href="https://calendar.app.google/qpXRWnCiG3XKi8iG6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a free call&nbsp; →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
