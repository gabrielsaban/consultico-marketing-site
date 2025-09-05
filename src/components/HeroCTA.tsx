'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HeroCTA({
  text = 'Get in touch',
  width = '200px',
  hoverWidth = '260px',
  className = '',
  position = 'hero',
  targetId,
  variant = 'primary',
  inline = false,
  mobileOffset,
}: {
  text?: string;
  width?: string;
  hoverWidth?: string;
  className?: string;
  position?: 'hero' | 'stats' | 'team';
  targetId?: string;
  variant?: 'primary' | 'secondary';
  inline?: boolean;
  /** Mobile-only margin top in pixels (applies only for position='hero') */
  mobileOffset?: number;
}) {
  // Responsive base widths: hero scales with viewport so it feels consistent across screens
  const responsiveWidth = position === 'hero' ? 'clamp(200px, 22vmin, 360px)' : width;
  const responsiveHoverWidth = position === 'hero' ? 'clamp(240px, 26vmin, 420px)' : hoverWidth;

  // Measure label to reserve space for arrows dynamically so they never overlap text
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [prBase, setPrBase] = useState<number | undefined>(undefined);
  const [prHover, setPrHover] = useState<number | undefined>(undefined);
  const [widthRestPx, setWidthRestPx] = useState<number | undefined>(undefined);
  const [widthHoverPx, setWidthHoverPx] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      if (!inline) return; // only needed for inline buttons
      const labelWidth = labelRef.current?.offsetWidth ?? 0;
      const basePadLeft = 48;   // px-12 left padding
      const basePadRight = 48;  // px-12 right padding
      const reserve = Math.max(40, Math.round(labelWidth * 0.2)); // breathing room for arrows

      const computedPrBase = basePadRight;            // rest: preserve centering
      const computedPrHover = basePadRight + reserve; // hover: add room on right

      const restWidth = Math.round(labelWidth + basePadLeft + computedPrBase);
      const hoverWidthPx = Math.round(labelWidth + basePadLeft + computedPrHover);

      setPrBase(computedPrBase);
      setPrHover(computedPrHover);
      setWidthRestPx(restWidth);
      setWidthHoverPx(hoverWidthPx);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [inline, text]);

  const arrowEnterX = inline ? 8 : 12;
  const labelHoverX = inline ? 0 : -20;

  const arrowVariants = {
    rest: { x: -20, opacity: 0 },
    hover: { x: arrowEnterX,  opacity: 1 },
  };

  const labelVariants = {
    rest: { x: 0 },
    hover: { x: labelHoverX },
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

  const desktopWrapperClass =
    position === 'hero'
      ? 'hidden md:flex absolute bottom-[20vmin] xl:bottom-[18vmin] 2xl:bottom-[16vmin] left-1/2 -translate-x-1/2 justify-center'
      : position === 'team'
        ? 'hidden md:flex justify-end'
        : 'hidden md:flex justify-center';

  const mobileWrapperClass =
    position === 'hero'
      ? 'md:hidden flex justify-center w-full'
      : 'md:hidden flex justify-center';

  const textColorClass = variant === 'secondary' ? 'text-blue-primary' : 'text-white';
  const borderClass = variant === 'secondary' ? 'border border-gray-300' : '';
  const labelSizeClass = 'text-base md:text-xl xl:text-2xl';

  const btnVariants = {
    rest: {
      width: inline && widthRestPx ? widthRestPx : responsiveWidth,
      scale: 1,
      backgroundColor: variant === 'secondary' ? '#FFFFFF' : '#007BFF',
      ...(inline && prBase ? { paddingRight: prBase } : {}),
    },
    hover: {
      width: inline && widthHoverPx ? widthHoverPx : responsiveHoverWidth,
      scale: 1.05,
      backgroundColor: variant === 'secondary' ? '#FFFFFF' : '#0260c4',
      ...(inline && prHover ? { paddingRight: prHover } : {}),
    },
  };

  const Button = (
      <motion.button
        className={`
          relative
          ${textColorClass} font-futura font-semibold
          ${labelSizeClass}
          py-3 px-8 md:py-5 md:px-12 xl:py-6 xl:px-14
          rounded-lg ${borderClass}
          overflow-hidden
          whitespace-nowrap
          text-center
          flex items-center justify-center
        `}
        variants={btnVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={handleClick}
      >
        <motion.span ref={labelRef} className="relative z-10" variants={labelVariants}>
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
  );

  if (inline) {
    return (
      <motion.div
        className={className}
        variants={wrapperVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
      >
        {Button}
      </motion.div>
    );
  }

  if (position === 'hero') {
    return (
      <>
        {/* Mobile wrapper: position via marginTop only on mobile */}
        <motion.div
          className={`${mobileWrapperClass} ${className}`}
          style={{ marginTop: mobileOffset ?? 8 }}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
        >
          {Button}
        </motion.div>
        {/* Desktop wrapper: absolute centered */}
        <motion.div
          className={`${desktopWrapperClass} ${className}`}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
        >
          {Button}
        </motion.div>
      </>
    );
  }

  // Non-hero positions: single wrapper responsive
  return (
    <motion.div
      className={`${'flex justify-center md:justify-center'} ${className}`}
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
    >
      {Button}
    </motion.div>
  );
}
