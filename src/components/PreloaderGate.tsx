'use client';

import { usePreloader } from './PreloaderContext';

/**
 * Keeps the page DOM mounted while the preloader is active.
 * This preserves headings and links for crawlers while the overlay
 * still controls the visitor's first visual reveal.
 */
export default function PreloaderGate({ children }: { children: React.ReactNode }) {
  const { ready } = usePreloader();
  return (
    <div className={ready ? 'opacity-100' : 'pointer-events-none opacity-0'}>
      {children}
    </div>
  );
}
