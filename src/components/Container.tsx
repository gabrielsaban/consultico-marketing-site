import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  /** Additional Tailwind classes */
  className?: string;
  /** Override max-width (default: 1400px) */
  maxWidth?: '1280px' | '1400px' | '1600px' | 'none';
  /** Disable horizontal padding (rare use case) */
  noPadding?: boolean;
}

/**
 * Container Component
 * 
 * Provides consistent max-width and responsive padding across all sections.
 * Mobile-first: 16px → 24px → fluid VW-based → capped at max-width
 * 
 * @see DESIGN_STANDARDS.md - Container Pattern
 */
export default function Container({
  children,
  className = '',
  maxWidth = '1600px',
  noPadding = false,
}: ContainerProps) {
  // Mobile-first padding:
  // 320px: 16px (px-4)
  // 640px+: 24px (sm:px-6)
  // 768px+: 5vw (md:px-[5vw]) - 38px @ 768px
  // 1024px+: 7.5vw (lg:px-[7.5vw]) - 77px @ 1024px
  // Capped by max-width on ultrawide displays
  const paddingClass = noPadding ? '' : 'px-4 sm:px-6 md:px-[5vw] lg:px-[7.5vw]';
  
  return (
    <div
      className={`mx-auto ${paddingClass} ${className}`}
      style={{ maxWidth: maxWidth === 'none' ? undefined : maxWidth }}
    >
      {children}
    </div>
  );
}
