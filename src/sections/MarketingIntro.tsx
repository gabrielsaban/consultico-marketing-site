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
    <section className="pt-0 pb-14 md:py-6 px-0" ref={marketingRef}>
      <div className="bg-brand-silk rounded-[45px] py-12 md:py-12 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.25)]">
        <div className="relative left-[6.2vw] pr-[13vw]">
          <div className="text-left max-w-[85%]">
            <h3 className="text-[24px] sm:text-[30px] md:text-[40px] md:leading-[48px] font-bold text-blue-primary mb-8 font-futura whitespace-nowrap">
              Marketing made for you.
            </h3>
            <div className="pl-8 relative">
              <AnimatedText
                paragraphs={[
                  "Marketing works best when it's customised to your business. Our digital marketing consultants build tailored strategies for you.",
                  "To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.",
                  "We use our specialised marketing process to build your business a lead generation framework that doesn't rely on guesswork.",
                ]}
                className="text-[1.434vw] leading-[2.2vw] text-gray-800 font-helvetica-light tracking-normal"
                highlightWords={[]}
              />
              <motion.div
                className="hidden lg:block absolute left-[0rem] top-0 bottom-0 w-0.5 bg-brand-blue opacity-60"
                style={{ scaleY: prefersReduced ? 1 : lineScale, transformOrigin: 'top' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


