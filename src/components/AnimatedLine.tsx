'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="w-60 h-0.5 bg-blue-primary mx-auto mb-4"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ transformOrigin: "center" }}
    />
  );
} 