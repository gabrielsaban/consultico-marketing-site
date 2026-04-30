import { NextResponse } from 'next/server';
import {
  calculateQ3Score,
  getSingleChoiceAnswerText,
  getTierFromScore,
  tierContent,
  type QuizAnswers,
  type QuizContact,
  type SingleChoiceQuestionId,
} from '@/lib/quiz';

type WebinarQuizPayload = {
  sessionId?: string;
  status?: 'draft' | 'submitted';
  contact?: Partial<QuizContact>;
  answers?: Partial<QuizAnswers>;
  score?: number | null;
  stage?: string | null;
  currentStep?: number | null;
};

const defaultAnswers: QuizAnswers = {
  q1: 0,
  q2: 0,
  q3: [],
  q4: 0,
  q5: 0,
  q6: 0,
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normaliseAnswers(answers?: Partial<QuizAnswers>): QuizAnswers {
  return {
    ...defaultAnswers,
    ...answers,
    q3: Array.isArray(answers?.q3) ? answers.q3 : [],
  };
}

function formatAnswerSummary(answers: QuizAnswers): string {
  const singleChoiceLines: {
    id: SingleChoiceQuestionId;
    label: string;
    points: number;
  }[] = [
    { id: 'q1', label: 'Q1', points: answers.q1 },
    { id: 'q2', label: 'Q2', points: answers.q2 },
    { id: 'q4', label: 'Q4', points: answers.q4 },
    { id: 'q5', label: 'Q5', points: answers.q5 },
    { id: 'q6', label: 'Q6', points: answers.q6 },
  ];

  return [
    ...singleChoiceLines.slice(0, 2).map(
      (answer) => `${answer.label}: ${getSingleChoiceAnswerText(answer.id, answer.points)} (${answer.points} pts)`
    ),
    `Q3: ${answers.q3.length ? answers.q3.join('; ') : 'None selected'}`,
    `Q3 score: ${calculateQ3Score(answers.q3)}`,
    ...singleChoiceLines.slice(2).map(
      (answer) => `${answer.label}: ${getSingleChoiceAnswerText(answer.id, answer.points)} (${answer.points} pts)`
    ),
  ].join('\n');
}

async function upsertSupabaseSession(payload: WebinarQuizPayload, answers: QuizAnswers) {
  const supabaseUrl = getEnv('SUPABASE_URL') ?? getEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = getEnv('SUPABASE_SECRET_KEY') ?? getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase server environment variables');
  }

  const now = new Date().toISOString();
  const contact = payload.contact ?? {};
  const status = payload.status ?? 'draft';

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/form_sessions?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({
      id: payload.sessionId,
      form_type: 'webinar',
      status,
      name: contact.name ?? null,
      business: contact.business ?? null,
      email: contact.email ?? null,
      phone: contact.phone ?? null,
      answers,
      score: payload.score ?? null,
      stage: payload.stage ?? null,
      current_step: payload.currentStep ?? null,
      last_activity_at: now,
      submitted_at: status === 'submitted' ? now : null,
      updated_at: now,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase request failed: ${message}`);
  }
}

async function sendResendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const resendApiKey = getEnv('RESEND_API_KEY');
  const from = getEnv('RESEND_FROM_EMAIL');

  if (!resendApiKey || !from) {
    throw new Error('Missing Resend environment variable');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend request failed: ${message}`);
  }
}

async function sendSubmissionEmails(payload: WebinarQuizPayload, answers: QuizAnswers) {
  const contact = payload.contact;
  const score = typeof payload.score === 'number' ? payload.score : 0;
  const tier = getTierFromScore(score);
  const tierDetails = tierContent[tier];
  const internalTo = getEnv('WEBINAR_NOTIFY_EMAIL') ?? getEnv('CONTACT_TO_EMAIL') ?? 'email@consultico.co.uk';

  if (!contact?.email || !isValidEmail(contact.email)) {
    throw new Error('Valid contact email required for submission emails');
  }

  const internalText = [
    'New webinar quiz submission',
    '',
    `Name: ${contact.name ?? 'Not provided'}`,
    `Business: ${contact.business ?? 'Not provided'}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone ?? 'Not provided'}`,
    `Score: ${score}/24`,
    `Stage: ${tierDetails.name}`,
    '',
    'Answers:',
    formatAnswerSummary(answers),
  ].join('\n');

  const userText = [
    `Hi ${contact.name ?? 'there'},`,
    '',
    `Thanks for completing the Consultico Marketing Clarity Score.`,
    '',
    `Your score: ${score}/24`,
    `Your stage: ${tierDetails.name}`,
    '',
    tierDetails.summary,
    '',
    `Next step: ${tierDetails.nextStep}`,
    '',
    'We will follow up with webinar access details.',
    '',
    'Consultico',
  ].join('\n');

  await Promise.all([
    sendResendEmail({
      to: internalTo,
      subject: `New webinar quiz submission: ${contact.business ?? contact.email}`,
      text: internalText,
    }),
    sendResendEmail({
      to: contact.email,
      subject: 'Your Consultico Marketing Clarity Score',
      text: userText,
    }),
  ]);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WebinarQuizPayload;

    if (!payload.sessionId) {
      return NextResponse.json({ ok: false, error: 'Missing session id' }, { status: 400 });
    }

    const answers = normaliseAnswers(payload.answers);
    const status = payload.status ?? 'draft';

    await upsertSupabaseSession({ ...payload, status }, answers);

    if (status === 'submitted') {
      await sendSubmissionEmails(payload, answers);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webinar quiz submission failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
