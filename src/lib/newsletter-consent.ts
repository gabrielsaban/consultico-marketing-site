// Consent copy for the homepage newsletter signup.
//
// Versioned and stored with every signup, because under UK GDPR/PECR you have
// to be able to show WHAT someone agreed to and WHEN, not just that a box was
// ticked. If this wording changes in a way that alters what a person agreed to,
// bump the version — existing records keep their original text and stay
// defensible.
//
// ── What this form actually is ──
// The newsletter is the product; the roadmap is the reason to join it. So
// consent is not an optional extra here, it IS the transaction, and the tick is
// required. That is a deliberate decision (Paul, 2026-09-08) and it is why
// there is only one box.
//
// ⚠️ What makes that defensible is the wording, so do not water it down. The
// page states the exchange plainly BEFORE anyone types anything — join the
// monthly strategy email, get a roadmap — so the consent is specific and
// informed rather than a marketing tick smuggled onto an unrelated download. If
// the offer ever changes so that the roadmap is the headline and the newsletter
// is buried small print, this stops being a fair exchange and needs revisiting.
// v2 (2026-09-08): names it as the STRATEGY email rather than just "the monthly
// email". Paul repositioned the list away from search — "we want to be your
// strategy team" — and consent should say what a person is actually joining.
// Version bumped rather than edited in place, which is the whole point of
// versioning it: anyone who consented under v1 keeps v1 stored against their
// record and stays defensible.
export const NEWSLETTER_CONSENT_VERSION = '2026-09-v2';

export const NEWSLETTER_CONSENT_TEXT =
  'Yes — sign me up to the monthly strategy email and send my free roadmap. I can unsubscribe at any time using the link in any email.';
