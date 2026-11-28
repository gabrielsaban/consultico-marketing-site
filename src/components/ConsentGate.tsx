'use client';

import { useConsent } from '@/lib/consent';

/**
 * Renders its children only once the visitor has accepted analytics.
 *
 * Wraps the third-party tracker components in the root layout (GA4, Vercel
 * Analytics, Speed Insights) so their scripts are never requested for someone
 * who has declined or not answered. PostHog gates itself in PostHogProvider
 * because it needs to react to the change, not just mount.
 */
export default function ConsentGate({ children }: { children: React.ReactNode }) {
  const consent = useConsent();
  return consent === 'granted' ? <>{children}</> : null;
}
