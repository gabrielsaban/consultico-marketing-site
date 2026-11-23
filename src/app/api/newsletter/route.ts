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

// Returns which check tripped, or null, so a rejection can be logged with its
// reason. A bare true/false is how every signup failed for 30 days with nothing
// in the logs to say why.
function likelyBotReason(payload: NewsletterPayload): string | null {
  if (payload.company?.trim()) {
    return 'honeypot filled';
  }

  if (typeof payload.startedAt !== 'number' || !Number.isFinite(payload.startedAt)) {
    return 'missing startedAt';
  }

  const elapsed = Date.now() - payload.startedAt;
  return elapsed < MIN_SUBMIT_TIME_MS ? `submitted too fast (${elapsed}ms)` : null;
}

// Every 400 is logged. These were silent before, so a signup rejected here
// looked exactly like no signup at all. The email is never logged.
function reject(reason: string, publicError: string, source: string | undefined) {
  console.warn(`Newsletter signup rejected (400): ${reason} [source=${source ?? 'unknown'}]`);
  return NextResponse.json({ ok: false, error: publicError }, { status: 400 });
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
      return reject('missing sessionId', 'Missing session id', payload.source);
    }

    const botReason = likelyBotReason(payload);
    if (botReason) {
      return reject(`bot check: ${botReason}`, 'Invalid submission', payload.source);
    }

    const email = payload.email?.trim() ?? '';
    if (!isValidEmail(email)) {
      return reject('invalid email', 'Valid email required', payload.source);
    }

    // Consent is the transaction here, not an extra, and it is enforced on the
    // server as well as in the form. A disabled button is a UI convenience, not
    // a legal record — anyone can POST this endpoint directly, and a marketing
    // address captured without consent is worse than no address at all.
    if (payload.consent !== true) {
      return reject('consent not true', 'Consent required', payload.source);
    }

    // The form no longer has a website field (removed 2026-09-14 to make the
    // signup one field). The route still tolerates one, so an older cached
    // page or a future variant cannot break the signup, and stores it the same
    // way the audit signup does. The gift is chosen by the subscriber on a form
    // linked from the welcome email.
    const website = normaliseWebsite(payload.website ?? '');
    const source = payload.source?.trim() || 'unknown';
    const now = new Date().toISOString();

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
      // The site has told them an email is coming very soon and no longer sends
      // one, so this is the prompt to actually send it. Naming the file removes
      // the one decision that would otherwise be made from memory each time.
      'ACTION: send the welcome email from GoHighLevel.',
      'Use welcome.html in the brand folder under emails/newsletter-welcome/',
      'It links them to the gift form, where they pick what they want from us.',
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
    //
    // Non-fatal (2026-11-14), like the Supabase and GHL steps below. A broken
    // Resend key or sender must not turn a real signup into a 500, because GHL
    // still receives the subscriber. But this notification is the trigger for
    // the welcome email, so a failure here is logged loudly: if you see it, the
    // welcome email has to be sent from what GHL holds.
    try {
      await sendResendEmail({
        to: getNotificationRecipient('contact'),
        subject: `New newsletter signup (send the welcome email): ${email}`,
        text: internalText,
      });
    } catch (error) {
      console.error(
        'NEWSLETTER NOTIFICATION EMAIL FAILED (Resend). The signup continues, but no "send the welcome email" alert was sent. Check RESEND_API_KEY / RESEND_FROM_EMAIL:',
        error,
      );
    }

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
