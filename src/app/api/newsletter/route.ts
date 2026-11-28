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

    // The form no longer has a website field (removed 2026-09-14 to make the
    // signup one field). The route still tolerates one, so an older cached
    // page or a future variant cannot break the signup, and stores it the same
    // way the audit signup does. The gift is chosen by the subscriber on a form
    // linked from the welcome email.
    const website = normaliseWebsite(payload.website ?? '');
    const source = payload.source?.trim() || 'unknown';
    const now = new Date().toISOString();

    // GHL is the list, so the subscriber goes in with the consent proof
    // attached. It also SENDS THE WELCOME EMAIL: the 'newsletter' tag starts
    // the "Welcome Email Newsletter" workflow there. So this runs
    // before the notification below, which needs to know whether it worked.
    // Non-fatal: sendToGhl reports failure instead of throwing.
    const inGhl = await sendToGhl({
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

    const internalText = [
      'New newsletter signup',
      '',
      `Email: ${email}`,
      ...(website ? [`Website: ${website}`] : []),
      `Source: ${source}`,
      `Consented to the newsletter: yes (${NEWSLETTER_CONSENT_VERSION})`,
      `At: ${now}`,
      '',
      `First touch: ${payload.attribution?.first_utm_source || payload.attribution?.first_referrer || 'direct / none'}`,
      `First landed on: ${payload.attribution?.first_landing_page || 'unknown'}`,
      '',
      // The site has told them an email is coming very soon. GoHighLevel sends
      // it, so there is only something to do by hand when the signup did not
      // reach GoHighLevel.
      ...(inGhl
        ? ['GoHighLevel has sent them the welcome email. Nothing to do.']
        : [
            'ACTION: this signup did NOT reach GoHighLevel, so no welcome email was sent.',
            'Add them in GoHighLevel with the tag "newsletter" and the welcome email goes out.',
          ]),
    ].join('\n');

    // THE SUBSCRIBER WELCOME EMAIL IS NOT SENT FROM HERE (Paul, 2026-09-09).
    //
    // It goes out of GoHighLevel instead, so that it sends from a
    // consultico.co.uk address with a real unsubscribe link and a reply-to that
    // reaches a monitored inbox. Since 2026-11-28 a GoHighLevel workflow sends
    // it automatically when the 'newsletter' tag lands on the contact (above).
    //
    // Do not restore a send here until RESEND_FROM_EMAIL is on our own domain,
    // or the reason this was removed comes straight back.
    await sendResendEmail({
      to: getNotificationRecipient('contact'),
      subject: inGhl
        ? `New newsletter signup: ${email}`
        : `New newsletter signup (welcome email NOT sent): ${email}`,
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
