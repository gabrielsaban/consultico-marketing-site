'use client';

import { usePreloader } from './PreloaderContext';

/**
 * Defers rendering its children until the preloader signals "ready".
 * This ensures viewport-triggered hero animations fire as visitors
 * first see the content rather than playing behind the overlay.
 */
export default function PreloaderGate({ children }: { children: React.ReactNode }) {
  const { ready } = usePreloader();
  if (!ready) return null;
  return <>{children}</>;
}
