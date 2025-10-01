'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from '@/components/AnimatedText';

export default function MarketingIntro(): JSX.Element {
  const prefersReduced = useReducedMotion();
  const marketingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: marketingRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="pt-2 pb-14 md:py-30" ref={marketingRef}>
      <div className="mx-auto px-6 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] relative">
        <div className="text-left md:text-right md:ml-auto md:max-w-[87%]">
          <h3 className="text-[clamp(1.75rem,6vw,2.25rem)] md:text-5xl lg:text-6xl font-bold text-blue-primary mb-8 font-futura whitespace-nowrap">
            Marketing made for you
          </h3>
          <AnimatedText
            paragraphs={[
              "Marketing works best when it’s customised to your business. Our digital marketing consultants build tailored strategies for you.",
              "To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.",
              "We use our specialised marketing process to build your business a lead generation framework that doesn’t rely on guesswork.",
            ]}
            className="text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.5rem] xl:text-[1.65rem] 2xl:text-[1.8rem] text-gray-700 font-helvetica-light tracking-normal"
            highlightWords={["tailored strategies", "done-for-you", "specialised marketing process"]}
          />
        </div>
        <motion.div
          className="hidden lg:block absolute right-0 top-[6.25rem] bottom-1 w-0.5 bg-blue-primary opacity-60"
          style={{ left: '100%', scaleY: prefersReduced ? 1 : lineScale, transformOrigin: 'top' }}
        />
      </div>
    </section>
  );
}


