import { NextResponse } from 'next/server';
import {
  AUDIT_SIGNUP_CONSENT_TEXT,
  AUDIT_SIGNUP_CONSENT_VERSION,
} from '@/lib/audit-signup-consent';
import {
  getNotificationRecipient,
  sendResendEmail,
  supabaseRestRequest,
  upsertFormSession,
} from '@/lib/server/formSessions';
import { GENERIC_ERROR, capText, recipientOverLimit } from '@/lib/server/abuse';

/**
 * Step 2 only makes sense after step 1. Checking that a step-1 row exists for
 * this session AND this email stops step 2 being used on its own as a free
 * "send an email to anyone" endpoint. No row means no email. If Supabase
 * itself errors we let it through, so an outage cannot lose a real lead's
 * website (an attacker cannot cause that error).
 */
async function hasStep1Session(sessionId: string, email: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      select: 'id',
      id: `eq.${sessionId}`,
      email: `ilike.${email}`,
      form_type: 'eq.audit_signup',
      limit: '1',
    });
    const response = await supabaseRestRequest(`form_sessions?${params.toString()}`, { method: 'GET' });
    const rows = (await response.json()) as unknown[];
    return rows.length > 0;
  } catch (error) {
    console.error('Audit signup step-1 lookup failed (allowing):', error);
    return true;
  }
}

const MIN_SUBMIT_TIME_MS = 2500;

type AuditSignupPayload = {
  step?: 1 | 2;
  sessionId?: string;
  startedAt?: number;
  email?: string;
  website?: string;
  source?: string;
  company?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLikelyBot(payload: AuditSignupPayload, step: 1 | 2): boolean {
  if (payload.company?.trim()) {
    return true;
  }

  if (step === 1) {
    if (typeof payload.startedAt !== 'number' || !Number.isFinite(payload.startedAt)) {
      return true;
    }
    return Date.now() - payload.startedAt < MIN_SUBMIT_TIME_MS;
  }

  return false;
}

function normaliseWebsite(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

async function sendStep1Emails(email: string, source: string) {
  const internalText = [
    'New SEO audit signup (step 1)',
    '',
    `Email: ${email}`,
    `Source: ${source}`,
    `Consent version: ${AUDIT_SIGNUP_CONSENT_VERSION}`,
    '',
    'Follow up to request their website if step 2 is not completed.',
  ].join('\n');

  const subscriberText = [
    'Hi there,',
    '',
    'Thanks for signing up for a free customised SEO audit from Consultico.',
    '',
    'We will email you to request your website URL if you have not already added it. Once we have it, Paul will send your audit.',
    '',
    'You have also agreed to receive occasional marketing emails from Consultico about our services. You can unsubscribe from marketing at any time by replying to any email.',
    '',
    'Consultico',
  ].join('\n');

  await Promise.all([
    sendResendEmail({
      to: getNotificationRecipient('audit_signup'),
      subject: `New audit signup: ${email}`,
      text: internalText,
    }),
    sendResendEmail({
      to: email,
      subject: 'Your Consultico SEO audit signup',
      text: subscriberText,
    }),
  ]);
}

async function sendStep2Emails(email: string, website: string) {
  const internalText = [
    'SEO audit signup: website added (step 2)',
    '',
    `Email: ${email}`,
    `Website: ${website}`,
  ].join('\n');

  const subscriberText = [
    'Hi there,',
    '',
    // No echo of the website: this goes to whatever address was typed.
    'Thanks, we have received your website. We will review it and send your customised SEO audit.',
    '',
    'Consultico',
  ].join('\n');

  await Promise.all([
    sendResendEmail({
      to: getNotificationRecipient('audit_signup'),
      subject: `Audit signup website added: ${email}`,
      text: internalText,
    }),
    sendResendEmail({
      to: email,
      subject: 'We received your website for your SEO audit',
      text: subscriberText,
    }),
  ]);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AuditSignupPayload;
    const step = payload.step ?? 1;

    if (!payload.sessionId) {
      return NextResponse.json({ ok: false, error: 'Missing session id' }, { status: 400 });
    }

    if (isLikelyBot(payload, step)) {
      return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    if (step === 1) {
      const email = capText(payload.email, 254);
      if (!isValidEmail(email)) {
        return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
      }

      // Same reply as a success, so a script learns nothing from the cap.
      if (await recipientOverLimit(email)) {
        console.warn('Audit signup: recipient over hourly limit, not sending');
        return NextResponse.json({ ok: true, sessionId: payload.sessionId });
      }

      const source = capText(payload.source, 100) || 'unknown';
      const now = new Date().toISOString();

      await sendStep1Emails(email, source);

      await upsertFormSession({
        id: payload.sessionId,
        formType: 'audit_signup',
        status: 'submitted',
        contact: { email },
        answers: {
          marketing_consent: true,
          consent_at: now,
          consent_text_version: AUDIT_SIGNUP_CONSENT_VERSION,
          consent_text: AUDIT_SIGNUP_CONSENT_TEXT,
          source,
          audit_status: 'pending_website',
        },
        stage: 'pending_website',
        currentStep: 1,
      }).catch((error: unknown) => {
        console.error('Audit signup session save failed after email send:', error);
      });

      return NextResponse.json({ ok: true, sessionId: payload.sessionId });
    }

    const website = normaliseWebsite(capText(payload.website, 300));
    const email = capText(payload.email, 254);

    if (!website) {
      return NextResponse.json({ ok: false, error: 'Website URL required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
    }

    if (!(await hasStep1Session(payload.sessionId, email))) {
      return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    await sendStep2Emails(email, website);

    await upsertFormSession({
      id: payload.sessionId,
      formType: 'audit_signup',
      status: 'submitted',
      contact: { email },
      answers: {
        marketing_consent: true,
        consent_text_version: AUDIT_SIGNUP_CONSENT_VERSION,
        website,
        audit_status: 'website_provided',
      },
      stage: 'website_provided',
      currentStep: 2,
    }).catch((error: unknown) => {
      console.error('Audit signup website save failed after email send:', error);
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Audit signup failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: GENERIC_ERROR,
      },
      { status: 500 },
    );
  }
}
