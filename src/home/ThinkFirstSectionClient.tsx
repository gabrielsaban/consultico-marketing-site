'use client';

import type { JSX, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollGlobe from '@/components/ScrollGlobe';

interface ThinkFirstSectionClientProps {
  children: ReactNode;
}

export default function ThinkFirstSectionClient({
  children,
}: ThinkFirstSectionClientProps): JSX.Element {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="hidden md:block absolute right-[10vw] lg:right-[8vw] xl:right-[10vw] [@media(min-width:1800px)]:right-[25vw] bottom-0 w-[clamp(260px,28vw,420px)] translate-y-[25%]">
        <ScrollGlobe className="w-full text-brand-blue/50 dark:text-brand-blue/30" />
      </div>

      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw] relative z-10">
        <div className="text-left max-w-4xl mx-auto">
          {children}
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/think-first"
              className="inline-flex items-center justify-center rounded-lg bg-blue-primary px-8 py-3 font-helvetica text-[clamp(1rem,1.2vw,1.125rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              aria-label="Explore our Think First strategy workshop"
            >
              Explore our Think First strategy workshop
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
