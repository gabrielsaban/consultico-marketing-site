'use client';

import type { JSX } from 'react';
import { motion } from 'framer-motion';

export default function ThinkFirstSection(): JSX.Element {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
      <div className="px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]">
        <div className="text-left max-w-4xl mx-auto">
          <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-blue-primary mb-8 font-futura">
            Is your strategy clear?
          </h3>
          
          <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light mb-8">
            Before ads, agencies, or retainers, we help B2C brands understand what will work, why it will work, and what it&apos;s worth.
          </p>

          <ul className="space-y-4 mb-8 pl-8">
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              ROI projections before you spend
            </li>
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              A strategy tailored to your business model
            </li>
            <li className="text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica-light relative before:content-['•'] before:absolute before:left-[-1.5rem] before:text-brand-blue before:font-bold">
              A clear path to your implementation
            </li>
          </ul>

          <p className="text-[clamp(0.875rem,1.1vw,1rem)] leading-[1.5] text-gray-600 dark:text-gray-400 font-helvetica italic mb-6">
            (For B2C brands already doing £x+/month and ready to scale deliberately)
          </p>

          <motion.button
            className="bg-blue-primary text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            aria-label="See how it works"
          >
            Get clarity before you invest
          </motion.button>
        </div>
      </div>
    </section>
  );
}
