'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';

// Animation variants for staggered content reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut bezier
    },
  },
};

export default function HeroSection() {
  return (
    <div className="min-h-[82vh] md:min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand logo SVG - positioned near top-left on desktop (hidden on phones; TopBar shows logo) */}
      <motion.div 
        className="absolute top-[3.25rem] left-[7.5vw] hidden md:block"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        <Image
          src="/brand/logo_main.svg"
          alt="Consultico"
          width={420}
          height={120}
          className="block w-[min(36vw,520px)] h-auto"
          priority
        />
      </motion.div>
      
      {/* Social media icons - hidden on phones; moved to TopBar; nudged higher */}
      <motion.div 
        className="absolute top-16 right-[3.75vw] 2xl:right-[7.5vw] hidden md:flex space-x-4 xl:space-x-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        <SocialIcons className="[&>a>img]:w-[clamp(2rem,4.5vmin,2.75rem)] [&>a>img]:h-[clamp(2rem,4.5vmin,2.75rem)]" />
      </motion.div>

      {/* Main Hero Content Grid */}
      <div className="relative w-full pl-[7.5vw] xl:pr-[3.75vw] pt-[16rem] md:pt-[18rem] lg:pt-[12rem] pb-16">
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 xl:gap-[6vw] 2xl:gap-[0vw] md:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Copy */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Main Headline */}
            <h1 className="text-blue-primary font-futura font-[750] text-[clamp(1.5rem,3vw,3.3rem)] 2xl:pr-[6.5vw] leading-[1.2]">
              Marketing done by the first generation born technology
            </h1>

            {/* Body Paragraphs */}
            <div className="space-y-7 2xl:pr-[11vw] pr-[3.5vw]">
              <p className="text-gray-900 font-helvetica text-[clamp(1.4rem,1.7vw,1.8rem)] leading-[1.5]">
                To make your brand excel, we focus on the type of customers you want and exactly how to get there.
              </p>
              <p className="text-gray-900 font-helvetica text-[clamp(1.4rem,1.7vw,1.8rem)] leading-[1.5]">
                Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              className="bg-blue-primary text-white font-helvetica font-medium text-[clamp(1.5rem,1.5vw,1.125rem)] px-30 py-3 mt-8 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get in touch with Consultico"
            >
              Get in touch
            </motion.button>
          </motion.div>

          {/* Right Column - Media Placeholder */}
          <motion.div
            className="flex items-end justify-end xl:pt-[1rem] 2xl:w-full 2xl:max-w-[650px] 2xl:justify-self-end 2xl:pr-[4vw] 2xl:pt-[2rem]"
            variants={itemVariants}
          >
            <div className="w-full aspect-[4/4] rounded-xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
              {/* Placeholder for globe/media - replace with actual globe component/video later */}
              <div className="text-center text-gray-400 font-helvetica">
                <svg
                  className="w-24 h-24 mb-4 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">Globe media placeholder</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
