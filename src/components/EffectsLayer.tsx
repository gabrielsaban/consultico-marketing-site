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
  const [isDark, setIsDark] = useState(false);

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

  useEffect(() => {
    const checkDarkMode = () => {
      // Check class-based dark mode
      if (document.documentElement.classList.contains('dark')) {
        return true;
      }
      
      // Check computed background color (works with DarkReader)
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      // Parse RGB values
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const [r, g, b] = rgb.map(Number);
        // If the background is dark (low RGB values), we're in dark mode
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
      }
      
      return false;
    };
    
    const syncTheme = () => {
      setIsDark(checkDarkMode());
    };
    
    // Check periodically for DarkReader changes
    const interval = setInterval(syncTheme, 500);
    
    // Listen for class changes
    window.addEventListener('themechange', syncTheme);
    
    // Listen for system preference changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', syncTheme);
    } else {
      mq.addListener(syncTheme);
    }
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('themechange', syncTheme);
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', syncTheme);
      } else {
        mq.removeListener(syncTheme);
      }
    };
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
          backgroundColor={isDark ? '#272727' : '#FFFFFF'}
          dotColor={isDark ? '#575757' : '#d1d5db'}
          dotSize={1.7}
          dotSpacing={40}
          dotOpacity={isDark ? 0.25 : 0.6}
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
