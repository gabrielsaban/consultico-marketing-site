'use client';

import { openConsentSettings } from '@/lib/consent';

/**
 * Footer control that reopens the cookie banner.
 *
 * Consent has to be as easy to withdraw as it was to give, so the way back to
 * the choice lives on every page rather than only in the privacy policy.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
