// Consent copy for the homepage email capture.
//
// This is versioned and stored alongside every signup for the same reason the
// audit signup does it: under UK GDPR/PECR you have to be able to show WHAT a
// person agreed to and WHEN, not just that a box was ticked. If the wording
// below changes in any way that alters what someone agreed to, bump the
// version — old records keep their original text and stay defensible.
//
// Deliberately SEPARATE from AUDIT_SIGNUP_CONSENT_TEXT. That one bundles
// "deliver the audit you asked for" with "send you marketing", which is fine
// when the audit is the thing being requested. The ICO asks for granular,
// specific consent, so a pure marketing list gets its own unticked box and its
// own wording rather than being folded into someone else's.
export const NEWSLETTER_CONSENT_VERSION = '2026-09-v1';

export const NEWSLETTER_CONSENT_TEXT =
  'I agree that Consultico Ltd may email me marketing about its services and send this monthly email. I can unsubscribe at any time using the link in any email.';
