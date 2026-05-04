'use client';

import type { JSX } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollGlobe from '@/components/ScrollGlobe';

export default function ThinkFirstSection(): JSX.Element {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Decorative scroll-reactive globe — positioned absolutely, bottom-right, bottom 1/3 clipped by section overflow */}
      <div className="hidden md:block absolute right-[10vw] lg:right-[8vw] xl:right-[10vw] [@media(min-width:1800px)]:right-[25vw] bottom-0 w-[clamp(260px,28vw,420px)] translate-y-[25%]">
        <ScrollGlobe className="w-full text-brand-blue/50 dark:text-brand-blue/30" />
      </div>

      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw] relative z-10">
        <div className="text-left max-w-4xl mx-auto">
          <p className="mb-3 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
            The Think First Workshop
          </p>
          <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary mb-8 font-futura">
            A clear strategy makes everything else easier.
          </h3>
          
          <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light mb-8">
            Your brand, transformed in 30 days. No commitment - just a crystal-clear understanding of how to market and thrive, why it works, and exactly what it&apos;s worth.
          </p>

          <ul className="space-y-4 mb-8 pl-8">
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              ROI projections before you spend
            </li>
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              Visual examples mapped to your brand
            </li>
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              Absolute clarity - guaranteed
            </li>
          </ul>

          <p className="mb-8 max-w-full text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.55] text-gray-600 dark:text-gray-400 font-helvetica italic md:max-w-[70%]">
            We&apos;re committed to making sure you understand your plan as well as we do. If anything isn&apos;t crystal clear, we keep working until it is.
          </p>

          <p className="text-[clamp(0.98rem,1.2vw,1.1rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica font-medium mb-6">
            Made for B2C brands doing £50K+/month and ready to grow deliberately.
          </p>

          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/think-first"
              className="inline-flex items-center justify-center rounded-lg bg-blue-primary px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              aria-label="Explore the Think First workshop"
            >
              Explore the workshop
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
