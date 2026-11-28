'use client';

import { useEffect, useRef, useState } from 'react';
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
 * ── A slim bar that makes room for itself ──
 * It started life as a card in the bottom-left corner, and on the apply form
 * it sat on top of the phone field. Any fixed element covers something, so the
 * bar does two things about it: it stays as short as the copy allows, and
 * while it is showing it pads the bottom of the page by its own height. The
 * last thing on any page — a submit button, the footer links — can always be
 * scrolled clear of it.
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

  const barRef = useRef<HTMLElement>(null);

  // Reserve the bar's height at the bottom of the page for as long as it is
  // showing. Measured, not hard-coded: the bar is one row on desktop and
  // three on a phone, and the text can wrap differently again with larger
  // font settings.
  useEffect(() => {
    const bar = barRef.current;
    if (!visible || !bar) return;

    const previous = document.body.style.paddingBottom;
    const apply = () => {
      document.body.style.paddingBottom = `${bar.offsetHeight}px`;
    };
    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = previous;
    };
  }, [visible]);

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
    'min-w-[7.5rem] flex-1 rounded-full px-5 py-2 font-helvetica text-[0.9rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:flex-none';

  return (
    <section
      ref={barRef}
      role="region"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-black/10 bg-white shadow-[0_-10px_30px_-18px_rgba(20,20,20,0.35)] md:left-16 dark:border-white/15 dark:bg-gray-900"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <p className="flex-1 font-helvetica-light text-[0.875rem] leading-[1.5] text-gray-700 dark:text-gray-300">
          <span className="font-futura text-[0.95rem] font-bold text-brand-black dark:text-white">
            Can we count your visit?
          </span>{' '}
          Analytics cookies show us which pages get read and replay visits so we can fix what&rsquo;s
          confusing. Nothing is tracked unless you accept.{' '}
          <Link href="/privacy" className="text-brand-blue underline-offset-2 hover:underline">
            Privacy policy
          </Link>
          {reopened && current ? (
            <span className="font-helvetica text-gray-900 dark:text-gray-100"> {current}</span>
          ) : null}
        </p>
        <div className="flex shrink-0 gap-3">
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
            className={`${buttonBase} border border-brand-blue bg-brand-blue text-white hover:border-brand-black hover:bg-brand-black dark:hover:border-white dark:hover:bg-white dark:hover:text-brand-black`}
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
