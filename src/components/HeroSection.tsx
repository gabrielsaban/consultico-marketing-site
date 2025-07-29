'use client';

import { motion } from 'framer-motion';
import ImageFilledText from './ImageFilledText';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand name - positioned higher and more to the right with better spacing */}
      <motion.div 
        className="absolute top-18 left-24"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-futura">
          <span className="text-blue-primary">Consult</span>
          <span className="text-blue-secondary">ico</span>
        </h1>
      </motion.div>
      
      {/* Hero headline - positioned absolutely for better control */}
      <motion.div 
        className="absolute bottom-80 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.5, 
          duration: 1, 
          ease: "easeOut" 
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* First line container - exactly one line */}
          <div className="text-blue-primary text-5xl md:text-7xl lg:text-8xl font-bold font-futura whitespace-nowrap">
            <span>in a world of </span>
            <ImageFilledText 
              text="noise" 
              className="text-8xl md:text-[10rem] lg:text-[16rem] font-bold font-futura inline-block"
            />
          </div>
          {/* Second line container - exactly one line */}
          <div className="text-blue-primary text-5xl md:text-7xl lg:text-8xl font-bold font-futura whitespace-nowrap">
            we make your brand heard
          </div>
        </div>
      </motion.div>
      
      {/* Call to action - positioned below hero text */}
      <HeroCTA />
      
      {/* Social media icons - positioned absolutely like in the image */}
      <motion.div 
        className="absolute top-24 right-24 flex space-x-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        {/* Instagram */}
        <div className="w-15 h-15 bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
          </svg>
        </div>
        {/* Facebook */}
        <div className="w-15 h-15 bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
          </svg>
        </div>
        {/* LinkedIn */}
        <div className="w-15 h-15 bg-blue-primary rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-200 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
