'use client';

import { motion, Variants } from 'framer-motion';

export default function HeroCTA({
  text = 'Get in touch',
  width = '200px',
  hoverWidth = '260px',
  className = '',
  position = 'hero',
}: {
  text?: string;
  width?: string;
  hoverWidth?: string;
  className?: string;
  position?: 'hero' | 'stats';
}) {
  // hover/stretch variants remain unchanged
  const btnVariants = {
    rest: { width, scale: 1, backgroundColor: '#007BFF' },
    hover: { width: hoverWidth, scale: 1.05, backgroundColor: '#0260c4' },
  };

  const arrowVariants = {
    rest: { x: -20, opacity: 0 },
    hover: { x: 0,   opacity: 1 },
  };

  // wrapper variants only need hidden/visible without transition
  const wrapperVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      // positioning same as before
      className={`${
        position === 'hero'
          ? 'absolute bottom-40 left-7/9 -translate-x-1/2 flex justify-start'
          : 'flex justify-end'
      } ${className}`}
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      // pull the transition out here
      transition={{
        delay:    1.5,
        duration: 0.4,
        ease:     'easeOut',
      }}
    >
      <motion.button
        className="
          relative
          text-white font-futura font-semibold
          text-xl
          py-5 px-10
          rounded-lg
          overflow-hidden
          whitespace-nowrap
          text-left
        "
        variants={btnVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <span className="relative z-10">{text}</span>

        <motion.span
          className="
            absolute right-6 top-1/2 transform -translate-y-1/2
            text-2xl
          "
          variants={arrowVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          &raquo;&raquo;
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
