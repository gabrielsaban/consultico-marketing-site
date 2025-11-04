'use client';

import type { JSX } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from '@/components/AnimatedCounter';
import AnimatedLine from '@/components/AnimatedLine';
import HeroCTA from '@/components/HeroCTA';

export default function StatsCta(): JSX.Element {
  const prefersReduced = useReducedMotion();
  const statsSectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: statsProgress } = useScroll({
    target: statsSectionRef,
    offset: ["start 110%", "start 40%"],
  });
  const springConfig = { stiffness: 80, damping: 24, mass: 0.8 } as const;
  const statsY = useSpring(useTransform(statsProgress, [0, 1], ["40vh", "0vh"]), springConfig);
  const statsOpacity = useSpring(useTransform(statsProgress, [0, 1], [0, 1]), springConfig);
  const ctaY = useSpring(useTransform(statsProgress, [0, 1], ["50vh", "0vh"]), springConfig);
  const ctaOpacity = useSpring(useTransform(statsProgress, [0.15, 1], [0, 1]), springConfig);

  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] xl:max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px]">
        <div className="text-center mb-16">
          <div ref={statsSectionRef}>
            <motion.div
              style={{ y: prefersReduced ? 0 : statsY, opacity: prefersReduced ? 1 : statsOpacity }}
              className="
                grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4
                items-start 
                justify-items-center
                gap-6 sm:gap-8 lg:gap-12 xl:gap-16
                mb-16
                mx-auto
              "
            >
              {[
                { value: '1134%',    label: 'Visibility Increase',       note: 'Using SEO for search engine results.' },
                { value: '2000%', label: 'More Daily Traffic',         note: 'For our SEO clients, curated over 2 years.' },
                { value: '50x',      label: 'Return on Ad Spend',         note: 'Bringing new life to PPC client lead generation.' },
                { value: '£1.2M',    label: "Increase in Clients’ Work", note: "Increase in our clients’ quotes resulting from our work." },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="w-full max-w-[320px] text-center transition-transform duration-300 p-4 rounded-lg hover:scale-105 motion-reduce:hover:scale-100"
                >
                  <AnimatedCounter value={stat.value} duration={2} />
                  <div className="text-lg sm:text-xl text-gray-600 font-helvetica mb-4 sm:mb-6">
                    {stat.label}
                  </div>
                  <div className="my-2 sm:my-3">
                    <AnimatedLine />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-helvetica-light">
                    {stat.note}
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div style={{ y: prefersReduced ? 0 : ctaY, opacity: prefersReduced ? 1 : ctaOpacity }} className="flex justify-center w-full">
              <HeroCTA text="Browse Services" width="230px" hoverWidth="280px" position="stats" targetId="services" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


