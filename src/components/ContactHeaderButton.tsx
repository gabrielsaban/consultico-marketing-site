'use client';

import { usePathname, useRouter } from 'next/navigation';

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
    if (pathname !== '/') {
      sessionStorage.setItem('consultico_scroll_target', 'contact');
      router.push('/');
      return;
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Contact us"
        className={`w-10 h-10 rounded-lg bg-brand-blue text-white grid place-items-center shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${className}`}
      >
        <svg
          className="w-5 h-5"
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
      className={`w-14 h-14 [@media(max-height:800px)]:w-12 [@media(max-height:800px)]:h-12 rounded-lg bg-brand-blue text-white grid place-items-center shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${className}`}
    >
      <svg
        className="w-7 h-7 [@media(max-height:800px)]:w-6 [@media(max-height:800px)]:h-6"
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
