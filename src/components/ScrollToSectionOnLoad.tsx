'use client';

import { useLayoutEffect } from 'react';
import { consumePendingHomeSection, scrollToHomeSection } from '@/lib/homeNavigation';

export default function ScrollToSectionOnLoad() {
  useLayoutEffect(() => {
    const targetId = consumePendingHomeSection();
    if (!targetId) return;

    let attempts = 0;
    let frame = 0;

    const restoreScroll = () => {
      attempts += 1;
      const didScroll = scrollToHomeSection(targetId, 'auto');
      if (didScroll) {
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event('scroll'));
          window.dispatchEvent(new Event('resize'));
        });
      }
      if (!didScroll && attempts < 8) {
        frame = requestAnimationFrame(restoreScroll);
      }
    };

    restoreScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
