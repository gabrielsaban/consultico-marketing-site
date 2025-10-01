'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DynamicLenisProvider = dynamic(() => import('@/components/LenisProvider'), { ssr: false });
const DynamicCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const DynamicDots = dynamic(() => import('@/components/InteractiveBackground'), { ssr: false });

interface EffectsLayerProps {
  children: React.ReactNode;
}

export default function EffectsLayer({ children }: EffectsLayerProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    } else {
      // Safari
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  const content = reducedMotion ? (
    children
  ) : (
    <DynamicLenisProvider>{children}</DynamicLenisProvider>
  );

  return (
    <>
      {!reducedMotion && (
        <DynamicDots
          dotColor="#3B82F6"
          dotSize={1.3}
          dotSpacing={40}
          dotOpacity={0.3}
          mouseInfluence={0.2}
          breathingSpeed={0.0015}
          breathingIntensity={0.2}
        />
      )}
      {!reducedMotion && <DynamicCursor size={8} color="#3B82F6" />}
      {content}
    </>
  );
}


