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

// Same two protections the audit signup uses, for the same reason: this is an
// unauthenticated POST that sends email, so it is worth something to a spammer.
// The honeypot catches naive bots; the minimum submit time catches the ones
// that fill fields instantly. Neither is a CAPTCHA and neither is meant to be —
// they cost a real person nothing, which a CAPTCHA on a one-field form does.
const MIN_SUBMIT_TIME_MS = 2500;

type NewsletterPayload = {
  sessionId?: string;
  startedAt?: number;
  email?: string;
  source?: string;
  consent?: boolean;
  company?: string;
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

    // Consent is enforced server-side as well as in the form. A disabled submit
    // button is a UI convenience, not a legal record — anyone can POST here
    // directly, and a marketing address captured without consent is worse than
    // no address at all.
    if (payload.consent !== true) {
      return NextResponse.json({ ok: false, error: 'Consent required' }, { status: 400 });
    }

    const source = payload.source?.trim() || 'unknown';
    const now = new Date().toISOString();

    const internalText = [
      'New email signup',
      '',
      `Email: ${email}`,
      `Source: ${source}`,
      `Consented: yes (${NEWSLETTER_CONSENT_VERSION})`,
      `At: ${now}`,
    ].join('\n');

    const subscriberText = [
      'Thanks for signing up.',
      '',
      "You'll get one email a month with what our own data is telling us about search - what is earning clicks, what quietly stopped working, and what we are seeing in AI answers.",
      '',
      'If it is ever not worth your time, there is an unsubscribe link in every email and we will not chase you.',
      '',
      'Paul Wilson',
      'Consultico',
    ].join('\n');

    await Promise.all([
      sendResendEmail({
        to: getNotificationRecipient('contact'),
        subject: `New email signup: ${email}`,
        text: internalText,
      }),
      sendResendEmail({
        to: email,
        subject: "You're signed up",
        text: subscriberText,
      }),
    ]);

    // Persisted after the emails, and deliberately non-fatal: if Supabase is
    // down we would rather have the address in an inbox than lose the signup
    // to a 500. Mirrors the audit signup's ordering.
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
        source,
      },
      stage: 'subscribed',
      currentStep: 1,
    }).catch((error: unknown) => {
      console.error('Newsletter signup session save failed after email send:', error);
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
