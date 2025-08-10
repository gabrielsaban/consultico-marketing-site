'use client';

import { motion, Variants } from 'framer-motion';

export default function HeroCTA({
  text = 'Get in touch',
  width = '200px',
  hoverWidth = '260px',
  className = '',
  position = 'hero',
  targetId,
}: {
  text?: string;
  width?: string;
  hoverWidth?: string;
  className?: string;
  position?: 'hero' | 'stats' | 'team';
  targetId?: string;
}) {
  // Responsive base widths: hero scales with viewport so it feels consistent across screens
  const responsiveWidth = position === 'hero' ? 'clamp(200px, 22vmin, 360px)' : width;
  const responsiveHoverWidth = position === 'hero' ? 'clamp(240px, 26vmin, 420px)' : hoverWidth;

  const btnVariants = {
    rest: { width: responsiveWidth, scale: 1, backgroundColor: '#007BFF' },
    hover: { width: responsiveHoverWidth, scale: 1.05, backgroundColor: '#0260c4' },
  };

  const arrowVariants = {
    rest: { x: -20, opacity: 0 },
    hover: { x: 12,  opacity: 1 },
  };

  const labelVariants = {
    rest: { x: 0 },
    hover: { x: -20 },
  };

  // wrapper variants only need hidden/visible without transition
  const wrapperVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const handleClick = () => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      // positioning same as before
      className={`${
        position === 'hero'
          ? 'absolute bottom-[18vmin] xl:bottom-[16vmin] 2xl:bottom-[14vmin] left-1/2 -translate-x-1/2 flex justify-start'
          : position === 'team'
            ? 'flex justify-end'
            : 'flex justify-center'
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
          text-lg md:text-xl xl:text-2xl
          py-5 px-12 xl:py-6 xl:px-14
          rounded-lg
          overflow-hidden
          whitespace-nowrap
          text-center
          flex items-center justify-center
        "
        variants={btnVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={handleClick}
      >
        <motion.span className="relative z-10" variants={labelVariants}>
          {text}
        </motion.span>

          <motion.span
            className="
            absolute right-6 xl:right-10 top-1/2 -translate-y-1/2
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
