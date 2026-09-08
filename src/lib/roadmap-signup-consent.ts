// Consent copy for the homepage roadmap signup.
//
// Versioned and stored with every signup for the same reason the audit signup
// does it: under UK GDPR/PECR you have to be able to show WHAT someone agreed
// to and WHEN, not just that a box was ticked. If this wording changes in any
// way that alters what a person agreed to, bump the version — existing records
// keep their original text and stay defensible.
//
// ── Why ONE box covers both the roadmap and the ongoing emails ──
// The ICO asks for consent that is specific and informed, and warns against
// bundling separate purposes into one vague statement. This is not that: the
// offer on the page IS "a roadmap, then a monthly email", both are named in the
// heading and body before anyone types anything, and both are named again here.
// A person ticking this knows they are getting both.
//
// What we deliberately do NOT do is make the roadmap conditional on accepting
// marketing. That is the bundled-consent pattern the ICO actually objects to,
// because the consent stops being freely given. If someone emails asking for
// the roadmap without the updates, send it — it costs us one address and keeps
// the basis for every other address on the list clean.
export const ROADMAP_SIGNUP_CONSENT_VERSION = '2026-09-v1';

export const ROADMAP_SIGNUP_CONSENT_TEXT =
  'Send me my free roadmap and Consultico’s monthly email on what’s working in search. I can unsubscribe at any time using the link in any email.';
