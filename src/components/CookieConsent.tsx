'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clearTrackerStorage, onConsentSettingsOpen, setConsent, useConsent } from '@/lib/consent';
import { usePreloader } from '@/components/PreloaderContext';

/**
 * The cookie banner.
 *
 * ── Two buttons, same weight ──
 * Accept and Decline are the same size, sit side by side and take one click
 * each. The ICO's position is that refusing must be as easy as agreeing; a
 * loud Accept next to a grey text link is the pattern they enforce against.
 *
 * ── Not a modal ──
 * It does not block the page or trap focus. Nothing is tracked while it sits
 * there unanswered, so there is no reason to force an answer before someone
 * can read what they came for.
 *
 * ── Hidden on client reports ──
 * /r/ is the private report area. A client opening their report should not be
 * asked about our marketing analytics, and with no answer nothing tracks them
 * there anyway.
 */
export default function CookieConsent() {
  const consent = useConsent();
  const pathname = usePathname();
  const { ready } = usePreloader();
  // Set when someone reopens the banner from the footer to change their answer.
  const [reopened, setReopened] = useState(false);

  useEffect(() => onConsentSettingsOpen(() => setReopened(true)), []);

  // A "no" is enforced on every load, not just at the moment it is given: see
  // the note on clearTrackerStorage for why once is not enough.
  useEffect(() => {
    if (consent === 'denied') clearTrackerStorage();
  }, [consent]);

  const onReport = pathname?.startsWith('/r/') ?? false;
  const unanswered = consent === 'unset';
  const visible = ready && !onReport && (unanswered || reopened);

  if (!visible) return null;

  const choose = (value: 'granted' | 'denied') => {
    setReopened(false);
    setConsent(value);
  };

  const current =
    consent === 'granted'
      ? 'You have accepted analytics.'
      : consent === 'denied'
        ? 'You have declined analytics.'
        : null;

  const buttonBase =
    'flex-1 rounded-full px-5 py-2.5 font-helvetica text-[0.9rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';

  return (
    <section
      role="region"
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-[26rem] rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_50px_-12px_rgba(20,20,20,0.35)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0 md:left-[5.25rem] dark:border-white/15 dark:bg-gray-900"
    >
      <h2 className="font-futura text-[1.15rem] font-bold leading-tight text-brand-black dark:text-white">
        Can we count your visit?
      </h2>
      <p className="mt-2 font-helvetica-light text-[0.9rem] leading-[1.55] text-gray-700 dark:text-gray-300">
        We&rsquo;d like to use analytics cookies to see which pages get read and to replay
        visits so we can fix what&rsquo;s confusing. Nothing is tracked unless you accept.{' '}
        <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
          Privacy policy
        </Link>
      </p>
      {reopened && current ? (
        <p className="mt-2 font-helvetica text-[0.85rem] text-gray-900 dark:text-gray-100">{current}</p>
      ) : null}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className={`${buttonBase} border border-brand-black text-brand-black hover:bg-brand-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-black`}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className={`${buttonBase} border border-brand-blue bg-brand-blue text-white hover:bg-brand-black hover:border-brand-black dark:hover:bg-white dark:hover:border-white dark:hover:text-brand-black`}
        >
          Accept
        </button>
      </div>
    </section>
  );
}
