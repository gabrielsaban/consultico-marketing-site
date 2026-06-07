import { NextResponse } from 'next/server';
import { getServerEnv, supabaseRestRequest } from '@/lib/server/formSessions';

export const dynamic = 'force-dynamic';

function isAuthorized(request: Request) {
  const cronSecret = getServerEnv('CRON_SECRET');
  if (!cronSecret) return false;

  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);

  return authHeader === `Bearer ${cronSecret}` || url.searchParams.get('secret') === cronSecret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await supabaseRestRequest('form_sessions?select=id&limit=1', {
      method: 'GET',
      cache: 'no-store',
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Supabase keepalive failed:', error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
