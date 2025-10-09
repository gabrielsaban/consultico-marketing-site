'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageFilledText from './ImageFilledText';
import HeroCTA from './HeroCTA';
import { useEffect, useRef, useState } from 'react';
import SocialIcons from '@/components/SocialIcons';

type DocumentWithFonts = Document & { fonts?: { ready?: Promise<void> } };

export default function HeroSection() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const [line2FontSizePx, setLine2FontSizePx] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      let l1 = 0;
      if (line1Ref.current) {
        // measure natural width of first line (without wrapping changes)
        const el1 = line1Ref.current;
        const prev1 = el1.style.width;
        el1.style.width = 'auto';
        l1 = el1.offsetWidth;
        el1.style.width = prev1;
      }
      if (line2Ref.current && l1 > 0) {
        // measure natural width of the second line text without constraints
        const naturalWidth = (() => {
          const el = line2Ref.current!;
          const prevWidth = el.style.width;
          el.style.width = 'auto';
          const w = el.scrollWidth;
          el.style.width = prevWidth;
          return w;
        })();
        if (naturalWidth > 0) {
          const computed = window.getComputedStyle(line2Ref.current);
          const baseFontSize = parseFloat(computed.fontSize || '0');
          const ratio = l1 / naturalWidth;
          // Clamp ratio to avoid extreme stretching
          const clampedRatio = Math.max(0.9, Math.min(1.3, ratio));
          setLine2FontSizePx(baseFontSize * clampedRatio);
        }
      }
    };
    const ready = (document as DocumentWithFonts).fonts?.ready;
    if (ready) {
      ready.then(() => measure());
    } else {
      measure();
    }
    const ro = new ResizeObserver(measure);
    if (line1Ref.current) ro.observe(line1Ref.current);
    if (line2Ref.current) ro.observe(line2Ref.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  return (
    <div className="min-h-[82vh] md:min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand logo SVG - positioned near top-right on desktop (hidden on phones; TopBar shows logo) */}
      <motion.div 
        className="absolute top-[3.25rem] left-24 hidden md:block"
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
          className="block w-[min(36vw,420px)] h-auto"
          priority
        />
      </motion.div>
      
      {/* Hero headline - positioned absolutely for better control */}
      <motion.div 
        className="absolute left-1/2 top-[22vh] md:top-[46%] xl:top-[45%] 2xl:top-[44%] transform -translate-x-1/2 md:-translate-y-1/2 text-center w-[min(92vw,1400px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.5, 
          duration: 1, 
          ease: "easeOut" 
        }}
      >
        <div className="flex flex-col items-center space-y-0.5 sm:space-y-[8vmin] xl:space-y-[6vmin] 2xl:space-y-[5vmin]">
          {/* Line 1: in a world of (smaller on mobile) */}
          <div className="text-blue-primary font-bold font-futura leading-[0] text-[clamp(2.8rem,6.5vw,2.8rem)] md:hidden">
            in a world of
          </div>
          {/* Line 2: noise (larger, full width on mobile) */}
          <div className="md:hidden">
            <ImageFilledText 
              text="noise" 
              className="text-[clamp(6.8rem,16vw,4.8rem)] font-bold font-futura"
            />
          </div>
          {/* Line 3: we make your brand heard (one line on mobile) */}
          <div className="text-blue-primary font-bold font-futura leading-[0.5] text-[clamp(1.8rem,4.3vw,2.3rem)] tracking-[-0.01em] md:hidden">
            we make your brand
          </div>
          <div className="text-blue-primary font-bold font-futura leading-[1.6] text-[clamp(1.8rem,4.3vw,2.3rem)] tracking-[-0.01em] md:hidden">
            heard
          </div>

          {/* Desktop/tablet original two-line layout */}
          <div ref={line1Ref} className="hidden md:block text-blue-primary font-bold font-futura whitespace-normal md:whitespace-nowrap leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] xl:text-[clamp(3.25rem,5vw,7.5rem)] 2xl:text-[clamp(3.75rem,4.5vw,8.5rem)]">
            <span>in a world of </span>
            <ImageFilledText 
              text="noise" 
              className="text-[clamp(4rem,10vw,12rem)] xl:text-[clamp(6rem,10vw,14rem)] 2xl:text-[clamp(7rem,10vw,16rem)] font-bold font-futura inline-block"
            />
          </div>
          <div ref={line2Ref} className="hidden md:block text-blue-primary font-bold font-futura whitespace-normal md:whitespace-nowrap leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] xl:text-[clamp(3.25rem,5vw,7.5rem)] 2xl:text-[clamp(3.75rem,4.5vw,8.5rem)]" style={{ width: line1Ref.current ? `${line1Ref.current.offsetWidth}px` : undefined, fontSize: line2FontSizePx ? `${line2FontSizePx}px` : undefined }}>
            we make your brand heard
          </div>
        </div>
      </motion.div>
      
      {/* Call to action - positioned below hero text: mobile inside stack, desktop absolute */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2" style={{ top: 'calc(22vh + 36vh)' }}>
        <HeroCTA targetId="contact" position="hero" inline />
      </div>
      <div className="hidden md:block">
        <HeroCTA targetId="contact" />
      </div>
      
      {/* Social media icons - hidden on phones; moved to TopBar; nudged higher */}
      <motion.div 
        className="absolute top-16 right-24 hidden md:flex space-x-4 xl:space-x-6"
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
    </div>
  );
}
