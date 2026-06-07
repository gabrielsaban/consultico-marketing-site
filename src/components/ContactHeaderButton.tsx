'use client';

import { usePathname, useRouter } from 'next/navigation';
import { navigateToHomeSection } from '@/lib/homeNavigation';

interface ContactHeaderButtonProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export default function ContactHeaderButton({
  variant = 'desktop',
  className = '',
}: ContactHeaderButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    navigateToHomeSection(router, pathname, 'contact');
  };

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Contact us"
        className={`w-[2.125rem] h-[2.125rem] rounded-lg bg-brand-blue text-white grid place-items-center shadow-sm transition-[background-color,transform] duration-200 hover:bg-[#006FE6] hover:scale-110 active:bg-[#0067D6] active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${className}`}
      >
        <svg
          className="w-[1.34rem] h-[1.34rem] fill-transparent"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Contact us"
      className={`w-[clamp(3.05rem,4.4vw,4.35rem)] h-[clamp(3.05rem,4.4vw,4.35rem)] [@media(max-height:800px)]:w-[clamp(2.85rem,4vw,3.7rem)] [@media(max-height:800px)]:h-[clamp(2.85rem,4vw,3.7rem)] rounded-lg bg-brand-blue text-white grid place-items-center shadow-sm transition-[background-color,transform] duration-200 hover:bg-[#006FE6] hover:scale-110 active:bg-[#0067D6] active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${className}`}
    >
      <svg
        className="w-[57%] h-[57%] fill-transparent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" />
      </svg>
    </button>
  );
}
