/**
 * Meta Pixel (Phase 4) — add in GTM when ads go live:
 * - Base pixel tag, consent: ad_storage granted (extend cookie banner)
 * - Custom Event trigger on dataLayer `generate_lead` → Meta Lead event
 * - Custom Event trigger on dataLayer `sign_up` → CompleteRegistration
 *
 * No code changes required — events already push to dataLayer from Phase 2.
 */
export const META_PIXEL_PHASE = 4;
