import { NextResponse } from 'next/server';
import {
  NEWSLETTER_CONSENT_TEXT,
  NEWSLETTER_CONSENT_VERSION,
} from '@/lib/newsletter-consent';
import {
  getNotificationRecipient,
  sendResendEmail,
  upsertFormSession,
} from '@/lib/server/formSessions';
import { sendToGhl } from '@/lib/server/ghl';

// The same two protections the audit signup uses, for the same reason: an
// unauthenticated POST that sends email is worth something to a spammer. The
// honeypot catches naive bots, the minimum submit time catches the ones that
// fill fields instantly. Neither is a CAPTCHA and neither should be — a CAPTCHA
// on a two-field form costs real people more than it costs bots.
const MIN_SUBMIT_TIME_MS = 2500;

type NewsletterPayload = {
  sessionId?: string;
  startedAt?: number;
  email?: string;
  website?: string;
  source?: string;
  consent?: boolean;
  company?: string;
  attribution?: Record<string, string>;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLikelyBot(payload: NewsletterPayload): boolean {
  if (payload.company?.trim()) {
    return true;
  }

  if (typeof payload.startedAt !== 'number' || !Number.isFinite(payload.startedAt)) {
    return true;
  }

  return Date.now() - payload.startedAt < MIN_SUBMIT_TIME_MS;
}

// Matches the audit signup's handling so both routes store website the same
// way. Someone typing "acme.co.uk" means https://acme.co.uk, and storing the
// bare host would make the two sets of records disagree with each other.
function normaliseWebsite(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as NewsletterPayload;

    if (!payload.sessionId) {
      return NextResponse.json({ ok: false, error: 'Missing session id' }, { status: 400 });
    }

    if (isLikelyBot(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    const email = payload.email?.trim() ?? '';
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
    }

    // Consent is the transaction here, not an extra, and it is enforced on the
    // server as well as in the form. A disabled button is a UI convenience, not
    // a legal record — anyone can POST this endpoint directly, and a marketing
    // address captured without consent is worse than no address at all.
    if (payload.consent !== true) {
      return NextResponse.json({ ok: false, error: 'Consent required' }, { status: 400 });
    }

    // Website stays optional. It makes the roadmap deliverable and lets us
    // identify who signed up, but requiring it costs signups at the exact
    // moment someone has decided to act — and the list is the point. A missing
    // one is chased in the welcome email, which is what the audit flow does.
    const website = normaliseWebsite(payload.website ?? '');
    const source = payload.source?.trim() || 'unknown';
    const now = new Date().toISOString();

    const internalText = [
      'New newsletter signup',
      '',
      `Email: ${email}`,
      `Website: ${website || '(not provided - reply to ask for it)'}`,
      `Source: ${source}`,
      `Consented to newsletter + roadmap: yes (${NEWSLETTER_CONSENT_VERSION})`,
      `At: ${now}`,
      '',
      `First touch: ${payload.attribution?.first_utm_source || payload.attribution?.first_referrer || 'direct / none'}`,
      `First landed on: ${payload.attribution?.first_landing_page || 'unknown'}`,
    ].join('\n');

    const subscriberText = [
      // "Hey" and NOT a merge field. The newsletter form collects email and
      // website only (Paul, 2026-09-09) to keep friction low, so a
      // [first_name] placeholder here would render "Hi ,".
      'Hey 👋',
      '',
      "Thanks for signing up, we're really glad you're here.",
      '',
      // The "young company in Glasgow" line is Paul's own wording and is
      // deliberate. The voice guide keeps the youth angle OUT of how-to and
      // technical writing, but allows it exactly here: relationship and
      // why-us. Do not copy it into an article.
      "We're building Consultico as a young company in Glasgow, and I'm looking forward to sharing our progress with you over the coming months. I'll send you the strategies and lessons we're learning and using ourselves, what we're doing as a company, and other updates from the world of digital marketing strategy.",
      '',
      website
        ? `We're going to send you a roadmap: I've got your site (${website}) and I'll send back what I'd look at first, what you're doing well, and what you could do to keep growing.`
        : "We're going to send you a roadmap too. Just reply with your website address and I'll send back what I'd look at first, what you're doing well, and what you could do to keep growing.",
      '',
      // This IS the unsubscribe mechanism, not a nicety. Resend has no
      // unsubscribe link, so a STOP reply has to be honoured by a human.
      "If you ever want to stop getting updates, just reply STOP and I'll take you off the list.",
      '',
      'Looking forward to keeping you up to date, and to chatting some day soon.',
      '',
      'Paul Wilson',
      'Founder | Consultico',
    ].join('\n');

    await Promise.all([
      sendResendEmail({
        to: getNotificationRecipient('contact'),
        subject: `New newsletter signup: ${email}`,
        text: internalText,
      }),
      sendResendEmail({
        to: email,
        subject: "You're on the list",
        text: subscriberText,
      }),
    ]);

    // Persisted after the emails and deliberately non-fatal: if Supabase is
    // down we would rather have the address sitting in an inbox than lose the
    // signup to a 500. Mirrors the audit signup's ordering.
    await upsertFormSession({
      id: payload.sessionId,
      formType: 'newsletter',
      status: 'submitted',
      contact: { email },
      answers: {
        marketing_consent: true,
        consent_at: now,
        consent_text_version: NEWSLETTER_CONSENT_VERSION,
        consent_text: NEWSLETTER_CONSENT_TEXT,
        website,
        source,
        roadmap_status: website ? 'pending_roadmap' : 'pending_website',
        ...(payload.attribution ?? {}),
      },
      stage: 'subscribed',
      currentStep: 1,
    }).catch((error: unknown) => {
      console.error('Newsletter signup session save failed after email send:', error);
    });

    // GHL is the list, so the subscriber goes in with the consent proof
    // attached. Last, and non-fatal — see the note in ghl.ts.
    await sendToGhl({
      form_type: 'newsletter',
      email,
      website,
      source,
      tags: ['newsletter', 'website-signup', `source:${source}`],
      marketing_consent: true,
      consent_text: NEWSLETTER_CONSENT_TEXT,
      consent_version: NEWSLETTER_CONSENT_VERSION,
      consent_at: now,
      attribution: payload.attribution,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter signup failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 },
    );
  }
}
