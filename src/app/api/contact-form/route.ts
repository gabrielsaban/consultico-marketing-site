import { NextResponse } from 'next/server';
import { getNotificationRecipient, sendResendEmail, upsertFormSession, type FormSessionStatus } from '@/lib/server/formSessions';
import { sendToGhl } from '@/lib/server/ghl';
import { GENERIC_ERROR, capText, recipientOverLimit, safeGreetingName, sanitiseAttribution } from '@/lib/server/abuse';

type ContactFormPayload = {
  sessionId?: string;
  startedAt?: number;
  status?: FormSessionStatus;
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Honeypot — any value means bot. */
  website?: string;
  /** Real company site URL from the SEO landing form (not the honeypot). */
  companyWebsite?: string;
  heardAbout?: string;
  /** 'apply' for the Think First application at /apply. Changes the email subject and GHL tag only. */
  formSource?: 'contact' | 'apply';
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

function normaliseCompanyWebsite(value: string | undefined) {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function normalisePayload(payload: ContactFormPayload) {
  return {
    name: capText(payload.name, 120),
    business: capText(payload.business, 200),
    email: capText(payload.email, 254),
    phone: capText(payload.phone, 40),
    companyWebsite: normaliseCompanyWebsite(capText(payload.companyWebsite, 300)),
    message: capText(payload.message, 5000),
    heardAbout: capText(payload.heardAbout, 300),
    isApplication: payload.formSource === 'apply',
    attribution: sanitiseAttribution(payload.attribution),
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
    payload.isApplication ? 'New application (Apply now)' : 'New contact form submission',
    '',
    `Name: ${payload.name || 'Not provided'}`,
    `Business: ${payload.business || 'Not provided'}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Website: ${payload.companyWebsite || 'Not provided'}`,
    '',
    'Message:',
    payload.message || 'Not provided',
    '',
    '--- Where they came from ---',
    formatAttribution(payload.attribution).replace('{{HEARD}}', payload.heardAbout || 'Not answered'),
  ].join('\n');

  // The confirmation goes to whatever address was typed, so it repeats nothing
  // the visitor wrote (bar a name that passes safeGreetingName). Otherwise the
  // form is a free way to send any text from our domain to anyone.
  const userText = [
    `Hi ${safeGreetingName(payload.name)},`,
    '',
    payload.isApplication ? 'Thanks for applying to work with Consultico.' : 'Thanks for getting in touch with Consultico.',
    '',
    payload.isApplication
      ? 'We read every application ourselves and will reply within one working day to book your call.'
      : 'We have received your message and will come back to you as soon as possible.',
    '',
    'Consultico',
  ].join('\n');

  await Promise.all([
    sendResendEmail({
      to: getNotificationRecipient('contact'),
      subject: `${payload.isApplication ? 'New application' : 'New contact form submission'}: ${payload.business || payload.email}`,
      text: internalText,
    }),
    sendResendEmail({
      to: payload.email,
      subject: payload.isApplication ? 'We received your Consultico application' : 'We received your Consultico message',
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
        company_website: data.companyWebsite,
        heard_about: data.heardAbout,
        ...data.attribution,
      },
      currentStep: status === 'submitted' ? 2 : 1,
    });

    if (status === 'submitted') {
      // Same reply as a success, so a script learns nothing from the cap.
      if (await recipientOverLimit(data.email)) {
        console.warn('Contact form: recipient over hourly limit, not sending');
        return NextResponse.json({ ok: true });
      }
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
        website: data.companyWebsite || undefined,
        source: data.isApplication ? 'apply-form' : 'contact-form',
        tags: data.isApplication ? ['lead', 'apply-form'] : ['lead', 'contact-form'],
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
        error: GENERIC_ERROR,
      },
      { status: 500 }
    );
  }
}
