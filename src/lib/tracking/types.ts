export type ConsentChoice = 'granted' | 'denied' | 'unset';

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type TrackingPayload = {
  clientId?: string;
  consentGranted?: boolean;
  pagePath?: string;
  interest?: string;
  utm?: UtmParams;
};

export type DataLayerEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}
