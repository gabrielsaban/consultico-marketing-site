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
// Collapsed back to v1 on 2026-09-08. It was briefly bumped to v2 when the copy
// changed, then Paul confirmed nobody had signed up yet — "no one has stored
// anything at all with the content, so we can have it edited in place." With no
// stored records to protect, a v2 would only imply a cohort of v1 consenters
// that never existed.
//
// ⚠️ That freedom ends at the FIRST real signup. From then on, changing this
// text means bumping the version, not editing it — a record has to keep the
// wording the person actually agreed to.
export const NEWSLETTER_CONSENT_VERSION = '2026-09-v1';

// ⚠️ Says "reply", NOT "click the link in any email", and that is deliberate.
// The newsletter is moving to a proper ESP (Loops / GoHighLevel — decided
// 2026-09-08) which will handle one-click unsubscribe, but until it does, the
// welcome email goes out through Resend, which is a TRANSACTIONAL sender with
// no unsubscribe link and no unsubscribe endpoint behind it.
//
// Promising a link that does not exist is both a broken first impression and a
// real compliance weakness — withdrawing consent has to be as easy as giving
// it. Replying is a mechanism we genuinely honour today.
//
// ✅ WHEN THE ESP IS LIVE: switch this back to the link wording and BUMP THE
// VERSION, because by then real records will exist.
export const NEWSLETTER_CONSENT_TEXT =
  'Yes, sign me up to the email list and send my free roadmap. I can unsubscribe any time by replying to any email.';
