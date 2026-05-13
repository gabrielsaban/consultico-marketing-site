import { NextResponse } from 'next/server';
import { getNotificationRecipient, sendResendEmail, upsertFormSession, type FormSessionStatus } from '@/lib/server/formSessions';

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
  };
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
      },
      currentStep: status === 'submitted' ? 2 : 1,
    });

    if (status === 'submitted') {
      await sendContactEmails(data);
      await saveFormSession().catch((error: unknown) => {
        console.error('Contact form session save failed after email send:', error);
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
