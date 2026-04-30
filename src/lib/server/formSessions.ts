export type FormSessionType = 'webinar' | 'workshop_apply' | 'contact';
export type FormSessionStatus = 'draft' | 'submitted';

export interface FormSessionContact {
  name?: string | null;
  business?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface FormSessionRecord extends FormSessionContact {
  id: string;
  form_type: FormSessionType;
  status: FormSessionStatus;
  answers: Record<string, unknown>;
  score?: number | null;
  stage?: string | null;
  current_step?: number | null;
  last_activity_at: string;
  created_at: string;
}

export function getServerEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getSupabaseConfig() {
  const supabaseUrl = getServerEnv('SUPABASE_URL') ?? getServerEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = getServerEnv('SUPABASE_SECRET_KEY') ?? getServerEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase server environment variables');
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ''),
    serviceKey,
  };
}

export async function supabaseRestRequest(path: string, init: RequestInit = {}) {
  const { supabaseUrl, serviceKey } = getSupabaseConfig();
  const headers = new Headers(init.headers);
  headers.set('apikey', serviceKey);
  headers.set('Authorization', `Bearer ${serviceKey}`);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase request failed: ${message}`);
  }

  return response;
}

export async function upsertFormSession({
  id,
  formType,
  status,
  contact,
  answers,
  score = null,
  stage = null,
  currentStep = null,
}: {
  id: string;
  formType: FormSessionType;
  status: FormSessionStatus;
  contact: FormSessionContact;
  answers: Record<string, unknown>;
  score?: number | null;
  stage?: string | null;
  currentStep?: number | null;
}) {
  const now = new Date().toISOString();

  await supabaseRestRequest('form_sessions?on_conflict=id', {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({
      id,
      form_type: formType,
      status,
      name: contact.name || null,
      business: contact.business || null,
      email: contact.email || null,
      phone: contact.phone || null,
      answers,
      score,
      stage,
      current_step: currentStep,
      last_activity_at: now,
      submitted_at: status === 'submitted' ? now : null,
      updated_at: now,
    }),
  });
}

export async function sendResendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const resendApiKey = getServerEnv('RESEND_API_KEY');
  const from = getServerEnv('RESEND_FROM_EMAIL');

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

export function getNotificationRecipient(formType: FormSessionType) {
  if (formType === 'webinar') {
    return getServerEnv('WEBINAR_NOTIFY_EMAIL') ?? getServerEnv('CONTACT_TO_EMAIL') ?? 'email@consultico.co.uk';
  }

  return getServerEnv('CONTACT_TO_EMAIL') ?? getServerEnv('WEBINAR_NOTIFY_EMAIL') ?? 'email@consultico.co.uk';
}

export async function fetchPendingDraftSessions(cutoffIso: string, limit = 50): Promise<FormSessionRecord[]> {
  const params = new URLSearchParams({
    select: 'id,form_type,status,name,business,email,phone,answers,score,stage,current_step,last_activity_at,created_at',
    status: 'eq.draft',
    partial_notified_at: 'is.null',
    last_activity_at: `lt.${cutoffIso}`,
    order: 'last_activity_at.asc',
    limit: String(limit),
  });

  const response = await supabaseRestRequest(`form_sessions?${params.toString()}`, {
    method: 'GET',
  });

  return (await response.json()) as FormSessionRecord[];
}

export async function markDraftNotified(id: string) {
  const now = new Date().toISOString();
  const params = new URLSearchParams({ id: `eq.${id}` });

  await supabaseRestRequest(`form_sessions?${params.toString()}`, {
    method: 'PATCH',
    headers: {
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      partial_notified_at: now,
      updated_at: now,
    }),
  });
}
