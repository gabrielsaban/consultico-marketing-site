'use client';

import type { JSX } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/AnimatedText';
import Container from '@/components/Container';

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
                Marketing made for you
              </h3>
              <div className="pl-8 relative">
                <AnimatedText
                  paragraphs={[
                    "Marketing works best when it's customised to your business. Our digital marketing consultants build tailored strategies for you.",
                    "To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.",
                    "We use our specialised marketing process to build your business a lead generation framework that doesn't rely on guesswork.",
                  ]}
                  className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light tracking-normal"
                  highlightWords={[]}
                />
                <motion.div
                  className="absolute left-[0rem] top-0 bottom-0 w-0.5 bg-brand-blue opacity-60"
                  style={{ scaleY: prefersReduced ? 1 : lineScale, transformOrigin: 'top' }}
                />
              </div>
            </div>
          </div>
    </section>
  );
}

