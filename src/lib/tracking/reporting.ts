/**
 * GA4 custom dimension registration (GA4 Admin → Custom definitions):
 * - form_id (event scope)
 * - interest (event scope)
 * - cta_location (event scope)
 * - lead_type (event scope)
 * - signup_source (event scope)
 *
 * Mark as conversions in GA4 Admin → Events:
 * - generate_lead
 * - sign_up
 * - click (filter cta_location contains book_call)
 *
 * UTM naming convention for campaigns:
 * - utm_source: linkedin | meta | google | email | referral
 * - utm_medium: social | cpc | email | organic
 * - utm_campaign: lowercase-hyphenated campaign slug
 *
 * QA checklist after deploy:
 * 1. Tag Assistant: GTM-K4FQ4FGV loads after consent
 * 2. GA4 DebugView: page_view on accept
 * 3. Submit contact form → generate_lead in DebugView
 * 4. Reject cookies → no GA requests in Network tab
 * 5. Audit signup step 1 → sign_up event
 */

export const GA4_CUSTOM_DIMENSIONS = [
  'form_id',
  'interest',
  'cta_location',
  'lead_type',
  'signup_source',
] as const;

export const GA4_CONVERSION_EVENTS = ['generate_lead', 'sign_up'] as const;

export const UTM_NAMING_EXAMPLES = {
  linkedinPost: '?utm_source=linkedin&utm_medium=social&utm_campaign=think-first-launch',
  metaAd: '?utm_source=meta&utm_medium=cpc&utm_campaign=seo-audit-leads',
  email: '?utm_source=email&utm_medium=email&utm_campaign=client-newsletter',
} as const;
