import { NextResponse } from 'next/server';
import {
  fetchPendingDraftSessions,
  getNotificationRecipient,
  getServerEnv,
  markDraftNotified,
  sendResendEmail,
  type FormSessionRecord,
} from '@/lib/server/formSessions';

const draftDelayMinutes = 30;

function isAuthorized(request: Request) {
  const cronSecret = getServerEnv('CRON_SECRET');
  if (!cronSecret) return false;

  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);

  return authHeader === `Bearer ${cronSecret}` || url.searchParams.get('secret') === cronSecret;
}

function formatAnswers(answers: Record<string, unknown>) {
  if (Object.keys(answers).length === 0) return 'No answers captured yet.';

  return Object.entries(answers)
    .map(([key, value]) => `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`)
    .join('\n');
}

function buildDraftEmail(session: FormSessionRecord) {
  const formLabel = session.form_type === 'webinar' ? 'webinar quiz' : session.form_type === 'contact' ? 'contact form' : session.form_type;

  return [
    `Incomplete ${formLabel} submission`,
    '',
    `Name: ${session.name || 'Not provided'}`,
    `Business: ${session.business || 'Not provided'}`,
    `Email: ${session.email || 'Not provided'}`,
    `Phone: ${session.phone || 'Not provided'}`,
    `Current step: ${session.current_step ?? 'Not recorded'}`,
    `Last activity: ${session.last_activity_at}`,
    `Created: ${session.created_at}`,
    '',
    'Captured answers:',
    formatAnswers(session.answers ?? {}),
  ].join('\n');
}

async function runDraftNotificationJob(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const cutoff = new Date(Date.now() - draftDelayMinutes * 60 * 1000).toISOString();
    const sessions = await fetchPendingDraftSessions(cutoff);
    const notified: string[] = [];
    const failed: { id: string; error: string }[] = [];

    for (const session of sessions) {
      try {
        const recipient = getNotificationRecipient(session.form_type);
        await sendResendEmail({
          to: recipient,
          subject: `Incomplete ${session.form_type} submission: ${session.business || session.email || session.id}`,
          text: buildDraftEmail(session),
        });
        await markDraftNotified(session.id);
        notified.push(session.id);
      } catch (error) {
        failed.push({
          id: session.id,
          error: error instanceof Error ? error.message : 'Unexpected error',
        });
      }
    }

    return NextResponse.json({
      ok: true,
      checked: sessions.length,
      notified: notified.length,
      failed,
    });
  } catch (error) {
    console.error('Draft notification job failed:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return runDraftNotificationJob(request);
}

export async function POST(request: Request) {
  return runDraftNotificationJob(request);
}
