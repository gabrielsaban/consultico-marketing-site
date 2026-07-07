'use client';

import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/google-analytics';

/**
 * Loads GA4 after the page is idle so gtag does not compete with LCP.
 * @next/third-parties/google loads earlier and was flagged as unused JS in Lighthouse.
 */
export default function DeferredGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
