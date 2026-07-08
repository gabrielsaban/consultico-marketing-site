'use client';

import Script from 'next/script';
import { GTM_ID } from '@/lib/tracking/constants';

/**
 * GTM setup (tagmanager.google.com → GTM-K4FQ4FGV):
 * 1. Tag: GA4 Configuration — Measurement ID G-YRP55KP50Y
 *    Trigger: Consent Initialization – All Pages
 *    Consent: analytics_storage granted
 * 2. Tag: GA4 Event — event name {{Event}} (dataLayer variable)
 *    Trigger: Custom Event — generate_lead, sign_up, click, select_content
 * 3. Admin → Container settings → Enable consent overview
 * 4. Publish container
 */
export default function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-loader" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
