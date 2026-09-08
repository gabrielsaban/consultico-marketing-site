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
      "You're on the list.",
      '',
      // Keep this matched to the on-site copy. If the page promises strategy
      // and the welcome email promises something else, the first impression of
      // the list is that we do not know what it is.
      // ⚠️ "News from us" stays generic on purpose - there is embargoed company
      // news this list exists to carry, and nothing public should pre-empt it.
      "Once a month you'll get the strategies we're using, what we're seeing work and stop working across our clients' accounts, and news from us.",
      '',
      website
        ? `And your free roadmap: we've got your site (${website}). Paul will take a look and send back what we'd fix first, what we'd leave alone, and what it would take to move.`
        : "For your free roadmap, just reply to this email with your website address and Paul will take a look.",
      '',
      // ⚠️ "Reply", not "click the link" — this email goes out through Resend,
      // which is transactional and has no unsubscribe link behind it. Update
      // this once the newsletter moves to its ESP.
      "Want out at any point? Just reply and say so - we won't chase you.",
      '',
      'Paul Wilson',
      'Consultico',
    ].join('\n');

    await Promise.all([
      sendResendEmail({
        to: getNotificationRecipient('contact'),
        subject: `New newsletter signup: ${email}`,
        text: internalText,
      }),
      sendResendEmail({
        to: email,
        subject: "You're on the list — and your roadmap",
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
