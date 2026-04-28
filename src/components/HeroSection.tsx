'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/Container';
import ImageFilledText from '@/components/ImageFilledText';
import ContactHeaderButton from '@/components/ContactHeaderButton';

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
      ease: [0.4, 0, 0.2, 1] as const, // easeOut bezier
    },
  },
};

export default function HeroSection() {
  return (
    <div className="min-h-[100svh] relative flex items-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand logo SVG - positioned near top-left on desktop (hidden on phones; TopBar shows logo) */}
      <motion.div 
        className="absolute top-[3.25rem] left-4 sm:left-6 md:left-[5vw] lg:left-[7.5vw] hidden md:block"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.15, 
          duration: 0.35, 
          ease: "easeOut" 
        }}
      >
        <Image
          src="/brand/logo_main.svg"
          alt="Consultico"
          width={420}
          height={120}
          className="block w-[min(36vw,520px)] [@media(max-height:800px)]:w-[min(32vw,460px)] h-auto"
          priority
        />
      </motion.div>
      
      {/* Header contact button - hidden on phones; TopBar shows compact contact shortcut */}
      <motion.div 
        className="absolute top-[3.75rem] right-4 sm:right-6 md:right-[5vw] lg:right-[7.5vw] hidden md:flex [@media(max-height:800px)]:top-[3.5rem]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.15, 
          duration: 0.35, 
          ease: "easeOut" 
        }}
      >
        <ContactHeaderButton />
      </motion.div>

      {/* Main Hero Content - Centered Slogan */}
      <Container className="w-full">
        <motion.div
          className="text-center [@media(max-height:800px)]:translate-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Slogan */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {/* Line 1: "in a world of noise" */}
              <div className="flex flex-wrap items-baseline justify-center gap-3 md:gap-4">
                <h1 className="text-blue-primary font-futura font-[750] text-[clamp(1.65rem,4.55vmin,3.35rem)] [@media(max-height:800px)]:text-[clamp(1.9rem,5.3vmin,3.9rem)] 2xl:text-[clamp(2rem,3.9vw,4rem)] leading-[1.1]">
                  in a world of
                </h1>
                <ImageFilledText 
                  text="noise" 
                  className="font-futura font-[750] text-[clamp(3rem,8.75vmin,7.5rem)] [@media(max-height:800px)]:text-[clamp(3.5rem,10.15vmin,8.7rem)] 2xl:text-[clamp(3.75rem,7.75vw,9.75rem)] leading-[1]"
                />
              </div>
              
              {/* Line 2: "we make your brand heard" */}
              <h2 className="text-blue-primary font-futura font-[750] text-[clamp(1.65rem,4.55vmin,3.35rem)] [@media(max-height:800px)]:text-[clamp(1.9rem,5.3vmin,3.9rem)] 2xl:text-[clamp(2rem,3.9vw,4rem)] leading-[1.1]">
                we make your brand heard
              </h2>
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div className="mb-14" variants={itemVariants}>
            <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-primary to-transparent mx-auto w-[30vw]"  />
          </motion.div>

          {/* Supporting Line - Strategy Focus */}
          <motion.div className="mb-8" variants={itemVariants}>
            <p className="text-blue-primary opacity-80 font-futura font-medium text-[clamp(1rem,2.25vw,1.9rem)] [@media(max-height:800px)]:text-[clamp(0.95rem,1.85vw,1.5rem)] leading-[1.3]">
              A Strategy-Led Digital Marketing Studio
            </p>
          </motion.div>

          {/* Philosophy Micro Line */}
          <motion.div className="mb-10" variants={itemVariants}>
            <p className="text-gray-600 dark:text-gray-300 font-futura text-[clamp(0.75rem,0.9vw,0.85rem)] tracking-[0.15em] opacity-70 uppercase">
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
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
