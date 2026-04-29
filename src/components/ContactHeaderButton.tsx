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
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    </button>
  );
}
