'use client';

import { useEffect } from 'react';
import {
  applyStoredConsentOnLoad,
  captureUtmParamsFromUrl,
} from '@/lib/tracking';
import CookieConsent from '@/components/CookieConsent';
import GoogleTagManager from '@/components/GoogleTagManager';

export default function TrackingRoot() {
  useEffect(() => {
    applyStoredConsentOnLoad();
    captureUtmParamsFromUrl();
  }, []);

  return (
    <>
      <GoogleTagManager />
      <CookieConsent />
    </>
  );
}
