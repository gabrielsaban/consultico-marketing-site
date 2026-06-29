'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import ContactHeaderButton from '@/components/ContactHeaderButton';
import { consumeHomeEntryAnimationSkip, scrollToHomeSection } from '@/lib/homeNavigation';

interface HeroSectionProps {
  headline: ReactNode;
}

// Animation variants for staggered content reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.45,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function HeroSection({ headline }: HeroSectionProps) {
  const [skipEntryAnimation] = useState(() => {
    if (typeof window === 'undefined') return false;
    return consumeHomeEntryAnimationSkip();
  });

  return (
    <div className="min-h-[100svh] relative flex items-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-28">
      <div className="absolute inset-0 -z-10" />

      <motion.div
        className="absolute top-[3.25rem] left-4 sm:left-6 md:left-[5vw] lg:left-[7.5vw] hidden md:block"
        initial={skipEntryAnimation ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.35,
          ease: 'easeOut',
        }}
      >
        <Image
          src="/brand/logo_main.svg"
          alt="Consultico digital marketing consultancy logo"
          width={420}
          height={120}
          className="block w-[min(36vw,520px)] [@media(max-height:800px)]:w-[min(32vw,460px)] h-auto"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute top-[3.25rem] right-4 sm:right-6 md:right-[5vw] lg:right-[7.5vw] hidden md:flex"
        initial={skipEntryAnimation ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.35,
          ease: 'easeOut',
        }}
      >
        <ContactHeaderButton />
      </motion.div>

      <Container className="w-full">
        <motion.div
          className="text-center [@media(max-height:800px)]:translate-y-6"
          variants={containerVariants}
          initial={skipEntryAnimation ? false : 'hidden'}
          animate="visible"
        >
          <motion.div className="mb-12" variants={itemVariants}>
            {headline}
          </motion.div>

          <motion.div className="mb-14" variants={itemVariants}>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-primary to-transparent mx-auto w-[30vw]" />
          </motion.div>

          <motion.div className="mb-8" variants={itemVariants}>
            <p className="text-blue-primary opacity-80 font-futura font-medium text-[clamp(1rem,2.25vw,1.9rem)] [@media(max-height:800px)]:text-[clamp(0.95rem,1.85vw,1.5rem)] leading-[1.3]">
              A strategy-led digital marketing agency in Glasgow
            </p>
          </motion.div>

          <motion.div className="mb-10" variants={itemVariants}>
            <p className="text-gray-600 dark:text-gray-300 font-futura text-[clamp(0.75rem,0.9vw,0.85rem)] tracking-[0.15em] opacity-70 uppercase">
              Clarity <span className="mx-2">·</span> Strategy <span className="mx-2">·</span> Growth
            </p>
          </motion.div>

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
