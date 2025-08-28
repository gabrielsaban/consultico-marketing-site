'use client';

import { motion } from 'framer-motion';
import ImageFilledText from './ImageFilledText';
import HeroCTA from './HeroCTA';
import { useEffect, useRef, useState } from 'react';

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
    measure();
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
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand name - positioned higher and more to the right with better spacing */}
      <motion.div 
        className="absolute top-[4.5rem] left-24"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        <h1 className="text-[clamp(5.5rem,9vmin,11rem)] font-bold font-futura">
          <span className="text-blue-primary">Consult</span>
          <span className="text-blue-secondary">ico</span>
        </h1>
      </motion.div>
      
      {/* Hero headline - positioned absolutely for better control */}
      <motion.div 
        className="absolute left-1/2 top-[46%] xl:top-[45%] 2xl:top-[44%] transform -translate-x-1/2 -translate-y-1/2 text-center w-[min(92vw,1400px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.5, 
          duration: 1, 
          ease: "easeOut" 
        }}
      >
        <div className="flex flex-col items-center space-y-[8vmin] xl:space-y-[6vmin] 2xl:space-y-[5vmin]">
          {/* First line container - exactly one line */}
          <div ref={line1Ref} className="text-blue-primary font-bold font-futura whitespace-normal md:whitespace-nowrap leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] xl:text-[clamp(3.25rem,5vw,7.5rem)] 2xl:text-[clamp(3.75rem,4.5vw,8.5rem)]">
            <span>in a world of </span>
            <ImageFilledText 
              text="noise" 
              className="text-[clamp(4rem,10vw,12rem)] xl:text-[clamp(6rem,10vw,14rem)] 2xl:text-[clamp(7rem,10vw,16rem)] font-bold font-futura inline-block"
            />
          </div>
          {/* Second line container - exactly one line */}
          <div ref={line2Ref} className="text-blue-primary font-bold font-futura whitespace-normal md:whitespace-nowrap leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] xl:text-[clamp(3.25rem,5vw,7.5rem)] 2xl:text-[clamp(3.75rem,4.5vw,8.5rem)]" style={{ width: line1Ref.current ? `${line1Ref.current.offsetWidth}px` : undefined, fontSize: line2FontSizePx ? `${line2FontSizePx}px` : undefined }}>
            we make your brand heard
          </div>
        </div>
      </motion.div>
      
      {/* Call to action - positioned below hero text */}
      <HeroCTA targetId="contact" />
      
      {/* Social media icons - positioned absolutely like in the image */}
      <motion.div 
        className="absolute top-24 right-24 flex space-x-4 xl:space-x-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        {/* Instagram */}
        <div className="w-[clamp(3.75rem,6.2vmin,5rem)] h-[clamp(3.75rem,6.2vmin,5rem)] bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
          </svg>
        </div>
        {/* Facebook */}
        <div className="w-[clamp(3.75rem,6.2vmin,5rem)] h-[clamp(3.75rem,6.2vmin,5rem)] bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
          </svg>
        </div>
        {/* LinkedIn */}
        <div className="w-[clamp(3.75rem,6.2vmin,5rem)] h-[clamp(3.75rem,6.2vmin,5rem)] bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
