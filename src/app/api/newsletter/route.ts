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
      '',
      // The site has told them an email is coming shortly and no longer sends
      // one, so this is the prompt to actually send it. Naming the file removes
      // the one decision that would otherwise be made from memory each time.
      'ACTION: send the welcome email from GoHighLevel.',
      website
        ? 'Use welcome-website-given.html (swap {{contact.website}} for their URL).'
        : 'Use welcome-no-website.html (no website given, so it asks them for it).',
      'Both are in the brand folder under emails/newsletter-welcome/',
    ].join('\n');

    // THE SUBSCRIBER WELCOME EMAIL IS NOT SENT FROM HERE (Paul, 2026-09-09).
    //
    // It goes out of GoHighLevel instead, so that it sends from a
    // consultico.co.uk address with a real unsubscribe link and a reply-to that
    // reaches a monitored inbox. RESEND_FROM_EMAIL does not currently satisfy
    // any of those three.
    //
    // Sent by hand for now, so THE NOTIFICATION BELOW IS THE TRIGGER: if nobody
    // sends it from GHL the subscriber gets nothing, and the site has already
    // told them an email is coming shortly. This route stays the single source
    // of the DATA and GHL owns the SENDING.
    //
    // Do not restore a send here until RESEND_FROM_EMAIL is on our own domain,
    // or the reason this was removed comes straight back.
    await sendResendEmail({
      to: getNotificationRecipient('contact'),
      subject: `New newsletter signup (send the welcome email): ${email}`,
      text: internalText,
    });

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
