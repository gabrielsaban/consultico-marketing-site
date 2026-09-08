import { NextResponse } from 'next/server';
import { getNotificationRecipient, sendResendEmail, upsertFormSession, type FormSessionStatus } from '@/lib/server/formSessions';
import { sendToGhl } from '@/lib/server/ghl';

type ContactFormPayload = {
  sessionId?: string;
  startedAt?: number;
  status?: FormSessionStatus;
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;
  heardAbout?: string;
  attribution?: Record<string, string>;
};

const MIN_SUBMIT_TIME_MS = 2500;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isLikelyBotSubmission(payload: ContactFormPayload): boolean {
  if (payload.website?.trim()) {
    return true;
  }

  if (payload.status !== 'submitted') {
    return false;
  }

  if (typeof payload.startedAt !== 'number' || !Number.isFinite(payload.startedAt)) {
    return true;
  }

  return Date.now() - payload.startedAt < MIN_SUBMIT_TIME_MS;
}

function normalisePayload(payload: ContactFormPayload) {
  return {
    name: payload.name?.trim() ?? '',
    business: payload.business?.trim() ?? '',
    email: payload.email?.trim() ?? '',
    phone: payload.phone?.trim() ?? '',
    message: payload.message?.trim() ?? '',
    heardAbout: payload.heardAbout?.trim() ?? '',
    attribution: payload.attribution ?? {},
  };
}

// Only the fields worth reading in an inbox. The full attribution object still
// goes to Supabase; this is the summary that turns "a lead arrived" into "a
// lead arrived from X" without opening another tool.
function formatAttribution(a: Record<string, string>): string {
  const first = [a.first_utm_source, a.first_utm_medium, a.first_utm_campaign].filter(Boolean).join(' / ');
  const lines = [
    `Heard about us: ${'{{HEARD}}'}`,
    `First touch: ${first || a.first_referrer || 'direct / none'}`,
    `First landed on: ${a.first_landing_page || 'unknown'}`,
    `This visit came from: ${a.last_referrer || 'direct / none'}`,
  ];
  return lines.join('\n');
}

async function sendContactEmails(payload: ReturnType<typeof normalisePayload>) {
  if (!isValidEmail(payload.email)) {
    throw new Error('Valid email required for contact submission');
  }

  const internalText = [
    'New contact form submission',
    '',
    `Name: ${payload.name || 'Not provided'}`,
    `Business: ${payload.business || 'Not provided'}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    '',
    'Message:',
    payload.message || 'Not provided',
    '',
    '--- Where they came from ---',
    formatAttribution(payload.attribution).replace('{{HEARD}}', payload.heardAbout || 'Not answered'),
  ].join('\n');

  const userText = [
    `Hi ${payload.name || 'there'},`,
    '',
    'Thanks for getting in touch with Consultico.',
    '',
    'We have received your message and will come back to you as soon as possible.',
    '',
    'Your message:',
    payload.message || 'Not provided',
    '',
    'Consultico',
  ].join('\n');

  await Promise.all([
    sendResendEmail({
      to: getNotificationRecipient('contact'),
      subject: `New contact form submission: ${payload.business || payload.email}`,
      text: internalText,
    }),
    sendResendEmail({
      to: payload.email,
      subject: 'We received your Consultico message',
      text: userText,
    }),
  ]);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactFormPayload;

    if (!payload.sessionId) {
      return NextResponse.json({ ok: false, error: 'Missing session id' }, { status: 400 });
    }

    if (isLikelyBotSubmission(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    const sessionId = payload.sessionId;
    const data = normalisePayload(payload);
    const status: FormSessionStatus = payload.status === 'submitted' ? 'submitted' : 'draft';

    const saveFormSession = () => upsertFormSession({
      id: sessionId,
      formType: 'contact',
      status,
      contact: {
        name: data.name,
        business: data.business,
        email: data.email,
        phone: data.phone,
      },
      answers: {
        message: data.message,
        heard_about: data.heardAbout,
        ...data.attribution,
      },
      currentStep: status === 'submitted' ? 2 : 1,
    });

    if (status === 'submitted') {
      await sendContactEmails(data);
      await saveFormSession().catch((error: unknown) => {
        console.error('Contact form session save failed after email send:', error);
      });

      // Enquiries go to GHL too — arguably more valuable there than
      // subscribers, since this is the form that produces actual revenue.
      //
      // ⚠️ NOTE THE CONSENT DIFFERENCE, it matters: this person asked us to
      // reply to them, they did NOT opt into marketing. So no consent fields
      // and no newsletter tag. Adding a contact enquiry to a marketing list
      // because they happened to land in the same CRM is precisely the kind of
      // thing PECR exists to stop.
      await sendToGhl({
        form_type: 'contact',
        email: data.email,
        name: data.name,
        business: data.business,
        phone: data.phone,
        source: 'contact-form',
        tags: ['lead', 'contact-form'],
        heard_about: data.heardAbout,
        attribution: data.attribution,
      });
    } else {
      await saveFormSession().catch((error: unknown) => {
        console.error('Contact form draft save failed:', error);
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
