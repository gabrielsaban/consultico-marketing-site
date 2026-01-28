'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SocialIcons from '@/components/SocialIcons';
import Container from '@/components/Container';
import ImageFilledText from '@/components/ImageFilledText';

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
    <div className="min-h-screen relative flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand logo SVG - positioned near top-left on desktop (hidden on phones; TopBar shows logo) */}
      <motion.div 
        className="absolute top-[3.25rem] left-4 sm:left-6 md:left-[5vw] lg:left-[7.5vw] hidden md:block"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.5, 
          duration: 0.2, 
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
        className="absolute top-16 right-4 sm:right-6 md:right-[5vw] lg:right-[7.5vw] hidden md:flex space-x-4 xl:space-x-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.5, 
          duration: 0.2, 
          ease: "easeOut" 
        }}
      >
        <SocialIcons className="[&>a>img]:w-[clamp(2rem,4.5vmin,2.75rem)] [&>a>img]:h-[clamp(2rem,4.5vmin,2.75rem)]" />
      </motion.div>

      {/* Main Hero Content - Centered Slogan */}
      <Container className="w-full">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Slogan */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {/* Line 1: "in a world of noise" */}
              <div className="flex flex-wrap items-baseline justify-center gap-3 md:gap-4">
                <h1 className="text-blue-primary font-futura font-[750] text-[clamp(2rem,5vw,4.5rem)] leading-[1.1]">
                  in a world of
                </h1>
                <ImageFilledText 
                  text="noise" 
                  className="font-futura font-[750] text-[clamp(4rem,10vw,12rem)] leading-[1]"
                />
              </div>
              
              {/* Line 2: "we make your brand heard" */}
              <h2 className="text-blue-primary font-futura font-[750] text-[clamp(2rem,5vw,4.5rem)] leading-[1.1]">
                we make your brand heard
              </h2>
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="h-[1px] bg-blue-primary mx-auto w-[25vw]"  />
          </motion.div>

          {/* Supporting Line - Strategy Focus */}
          <motion.div className="mb-8" variants={itemVariants}>
            <p className="text-blue-primary opacity-80 font-futura font-medium text-[clamp(1rem,2.25vw,1.9rem)] leading-[1.3]">
              A Strategy-Led Digital Marketing Studio
            </p>
          </motion.div>

          {/* Philosophy Micro Line */}
          <motion.div className="mb-10" variants={itemVariants}>
            <p className="text-gray-600 font-futura text-[clamp(0.75rem,0.9vw,0.85rem)] tracking-[0.15em] opacity-70 uppercase">
               No Templates <span className="mx-2">·</span> No Guesswork <span className="mx-2">·</span> No Gut-Feel Marketing
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              className="bg-blue-primary text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Get in touch with Consultico"
            >
              Get in touch
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
