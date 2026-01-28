'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ImageFilledTextProps {
  text: string;
  className?: string;
}

export default function ImageFilledText({ text, className = '' }: ImageFilledTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-based parallax movement
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <motion.div
        className="bg-cover bg-no-repeat bg-clip-text text-transparent"
        style={{
          backgroundImage: `url('/pexels-owenbarker-1118341.jpg')`,
          backgroundSize: '150%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '50%',
          backgroundPositionY: backgroundY,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
