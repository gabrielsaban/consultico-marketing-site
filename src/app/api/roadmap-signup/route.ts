import { NextResponse } from 'next/server';
import {
  ROADMAP_SIGNUP_CONSENT_TEXT,
  ROADMAP_SIGNUP_CONSENT_VERSION,
} from '@/lib/roadmap-signup-consent';
import {
  getNotificationRecipient,
  sendResendEmail,
  upsertFormSession,
} from '@/lib/server/formSessions';

// The same two protections the audit signup uses, for the same reason: an
// unauthenticated POST that sends email is worth something to a spammer. The
// honeypot catches naive bots, the minimum submit time catches the ones that
// fill fields instantly. Neither is a CAPTCHA and neither should be — a CAPTCHA
// on a two-field form costs real people more than it costs bots.
const MIN_SUBMIT_TIME_MS = 2500;

type RoadmapSignupPayload = {
  sessionId?: string;
  startedAt?: number;
  email?: string;
  website?: string;
  source?: string;
  consent?: boolean;
  company?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLikelyBot(payload: RoadmapSignupPayload): boolean {
  if (payload.company?.trim()) {
    return true;
  }

  if (typeof payload.startedAt !== 'number' || !Number.isFinite(payload.startedAt)) {
    return true;
  }

  return Date.now() - payload.startedAt < MIN_SUBMIT_TIME_MS;
}

// Matches the audit signup's handling so both routes store website the same
// way. A person typing "acme.co.uk" means https://acme.co.uk, and storing the
// bare host would make the two tables disagree with each other.
function normaliseWebsite(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RoadmapSignupPayload;

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

    // Enforced here as well as in the form. A disabled submit button is a UI
    // convenience, not a legal record — anyone can POST this endpoint directly,
    // and an address captured without consent is worse than no address.
    if (payload.consent !== true) {
      return NextResponse.json({ ok: false, error: 'Consent required' }, { status: 400 });
    }

    // Website is optional by design. Requiring it would qualify the lead better
    // but costs signups at the exact moment someone has decided to act, and we
    // can simply ask for it in the reply — which is what the audit flow already
    // does when step 2 is skipped.
    const website = normaliseWebsite(payload.website ?? '');
    const source = payload.source?.trim() || 'unknown';
    const now = new Date().toISOString();

    const internalText = [
      'New roadmap signup',
      '',
      `Email: ${email}`,
      `Website: ${website || '(not provided - reply to ask for it)'}`,
      `Source: ${source}`,
      `Consented to roadmap + marketing: yes (${ROADMAP_SIGNUP_CONSENT_VERSION})`,
      `At: ${now}`,
    ].join('\n');

    const subscriberText = [
      'Thanks for signing up.',
      '',
      website
        ? `We've got your site (${website}). Paul will take a look and send your roadmap - what we'd fix first, what we'd leave alone, and what it would take to move.`
        : "One thing before we can build your roadmap: reply to this email with your website address and Paul will take a look.",
      '',
      "You'll also get our monthly email on what our own data is telling us about search. There's an unsubscribe link in every one and we won't chase you.",
      '',
      'Paul Wilson',
      'Consultico',
    ].join('\n');

    await Promise.all([
      sendResendEmail({
        to: getNotificationRecipient('contact'),
        subject: `New roadmap signup: ${email}`,
        text: internalText,
      }),
      sendResendEmail({
        to: email,
        subject: 'Your Consultico roadmap',
        text: subscriberText,
      }),
    ]);

    // Persisted after the emails and deliberately non-fatal: if Supabase is
    // down we would rather have the address sitting in an inbox than lose the
    // signup to a 500. Mirrors the audit signup's ordering.
    await upsertFormSession({
      id: payload.sessionId,
      formType: 'roadmap_signup',
      status: 'submitted',
      contact: { email },
      answers: {
        marketing_consent: true,
        consent_at: now,
        consent_text_version: ROADMAP_SIGNUP_CONSENT_VERSION,
        consent_text: ROADMAP_SIGNUP_CONSENT_TEXT,
        website,
        source,
        roadmap_status: website ? 'pending_roadmap' : 'pending_website',
      },
      stage: website ? 'pending_roadmap' : 'pending_website',
      currentStep: 1,
    }).catch((error: unknown) => {
      console.error('Roadmap signup session save failed after email send:', error);
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Roadmap signup failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 },
    );
  }
}
