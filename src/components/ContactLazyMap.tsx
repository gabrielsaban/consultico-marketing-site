'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const mapShellClassName =
  'w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.08)]';

const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
  loading: () => <div className={`${mapShellClassName} bg-white/70 dark:bg-gray-900/70`} aria-hidden="true" />,
});

export default function ContactLazyMap() {
  const [shouldRender, setShouldRender] = useState(false);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = mountRef.current;
    if (!target || shouldRender) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={mountRef}>
      {shouldRender ? (
        <ContactMap />
      ) : (
        <div className={`${mapShellClassName} bg-white/70 dark:bg-gray-900/70`} aria-hidden="true" />
      )}
    </div>
  );
}
