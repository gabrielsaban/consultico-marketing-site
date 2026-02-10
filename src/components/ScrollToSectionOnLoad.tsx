'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'consultico_scroll_target';

export default function ScrollToSectionOnLoad() {
  useEffect(() => {
    const targetId = sessionStorage.getItem(STORAGE_KEY);
    if (!targetId) return;
    sessionStorage.removeItem(STORAGE_KEY);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  return null;
}
