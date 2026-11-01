'use client';

import { useLayoutEffect } from 'react';
import { clearHomeHash, consumePendingHomeSection, scrollToHomeSection } from '@/lib/homeNavigation';

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

    // Once the page has settled on the section, tidy the address back to "/".
    const tidy = window.setTimeout(clearHomeHash, 1500);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(tidy);
    };
  }, []);

  return null;
}
