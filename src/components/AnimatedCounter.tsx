'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [displayValue, setDisplayValue] = useState(0);
  
  // Parse the target value
  const getTargetValue = () => {
    if (value.includes('%')) {
      return parseFloat(value.replace('%', ''));
    } else if (value.includes('x')) {
      return parseFloat(value.replace('x', ''));
    } else if (value.includes('£')) {
      return parseFloat(value.replace('£', '').replace('M', '')) * 1000000;
    } else {
      return parseFloat(value.replace(/,/g, ''));
    }
  };

  const targetValue = getTargetValue();

  useEffect(() => {
    if (isInView && !prefersReduced) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetValue * easeOut;
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, targetValue, duration, prefersReduced]);

  const formatValue = (num: number) => {
    if (value.includes('%')) {
      return Math.round(num) + '%';
    } else if (value.includes('x')) {
      return Math.round(num) + 'x';
    } else if (value.includes('£')) {
      return '£' + (num / 1000000).toFixed(1) + 'M';
    } else {
      return Math.round(num).toLocaleString();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-5xl md:text-6xl font-bold text-blue-primary mb-4 font-futura">
        {prefersReduced ? value : formatValue(displayValue)}
      </div>
    </motion.div>
  );
} 