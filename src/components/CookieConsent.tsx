'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  denyAnalyticsConsent,
  getStoredConsent,
  grantAnalyticsConsent,
  type ConsentChoice,
} from '@/lib/tracking';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === 'unset');
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    if (choice === 'granted') {
      grantAnalyticsConsent();
    } else {
      denyAnalyticsConsent();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-gray-200 bg-white/95 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95 md:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="font-helvetica text-[0.9rem] leading-[1.55] text-gray-700 dark:text-gray-300">
          We use cookies for analytics to understand how visitors use our site.{' '}
          <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleChoice('denied')}
            className="rounded-lg border border-gray-300 px-4 py-2 font-helvetica text-[0.875rem] font-medium text-gray-800 transition-colors hover:border-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => handleChoice('granted')}
            className="rounded-lg bg-brand-blue px-4 py-2 font-helvetica text-[0.875rem] font-medium text-white transition-colors hover:bg-[#006FE6]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
