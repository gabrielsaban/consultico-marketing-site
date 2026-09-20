import { NextResponse } from 'next/server';
import { COOKIE_MAX_AGE, getCookieSecret } from '@/lib/reports/config';
import { signCookieValue, unwrapContentKey } from '@/lib/reports/crypto';
import { checkRateLimit, clearRateLimit, clientIp } from '@/lib/reports/rate-limit';
import { isValidSlug, loadEnvelope, reportCookieName, reportPath, unlockPath } from '@/lib/reports/store';

/**
 * POST /api/report-unlock — check a code and, if it opens the report, set the
 * cookie that lets /r/<slug> serve it.
 *
 * WHAT IS NEVER DONE WITH THE SUBMITTED VALUE
 *
 * It is not logged, not stored, not echoed back in the redirect, and not sent
 * anywhere. It is used to attempt a key derivation and then goes out of scope.
 * A client's mobile number in a log line is a data breach waiting to be
 * discovered, and it would be there forever for no operational benefit. The
 * only thing recorded is that a slug was unlocked, and when.
 *
 * The response is always a redirect, so the browser replaces the POST with a
 * GET and a refresh cannot resubmit the code.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const slug = String(form.get('slug') ?? '');
  const submitted = String(form.get('code') ?? '');

  if (!isValidSlug(slug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Rate limited before the report is loaded and well before scrypt runs, so a
  // flood costs us a map lookup rather than 64MB and 200ms of CPU per request.
  const ip = clientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    console.warn(`Report unlock rate limited: ${slug} at ${new Date().toISOString()}`);

    // Two correct answers to "what is the response to a rate-limited request",
    // depending on who is asking, so both get one.
    //
    // A script gets a real 429 with Retry-After, which is the status that
    // actually means this and the only one worth checking for.
    //
    // A person mid-form gets a 303 back to the unlock page, which renders the
    // "too many attempts" message in the site's own design. Handing a browser a
    // 429 JSON body would dump raw JSON over the page they were just looking at
    // and lose them the form. Retry-After rides along on both.
    const wantsHtml = request.headers.get('accept')?.includes('text/html') ?? false;
    const retryAfter = { 'Retry-After': String(limit.retryAfter) };

    return wantsHtml
      ? seeOther(`${unlockPath(slug)}?e=2`, retryAfter)
      : NextResponse.json(
          { ok: false, error: 'Too many attempts', retryAfter: limit.retryAfter },
          { status: 429, headers: { ...retryAfter, 'Cache-Control': 'private, no-store' } },
        );
  }

  const envelope = await loadEnvelope(slug);
  if (!envelope) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // The real check. Returns the report's content key if the submitted value
  // opens any of the envelope's wraps — the code, or the fallback passcode.
  const contentKey = unwrapContentKey(envelope, submitted);

  if (!contentKey) {
    // No cookie is set on a failure, and the redirect carries only an error
    // flag — never the value that was tried.
    return seeOther(`${unlockPath(slug)}?e=1`);
  }

  // The slug and the time. Nothing about who, and nothing about what they typed.
  console.info(`Report unlocked: ${slug} at ${new Date().toISOString()}`);

  // A client who fumbled the code before getting it right should not be left
  // one attempt from a lockout on their next report.
  clearRateLimit(ip);

  const response = seeOther(reportPath(slug));
  response.cookies.set({
    name: reportCookieName(slug),
    value: signCookieValue(slug, contentKey, getCookieSecret()),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    // Scoped to this one report, so unlocking one client's report never sends
    // its key along with a request for another's.
    path: reportPath(slug),
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

/**
 * 303, not 307. The browser must switch the redirected request to GET —
 * a 307 would replay the POST against the report URL, which only answers GET.
 *
 * The Location is relative, which HTTP has allowed since RFC 7231 and every
 * browser resolves against the request URL. NextResponse.redirect() would
 * demand an absolute URL, and the only origin available to hardcode is the
 * production one, which would bounce local and preview traffic to the live site
 * mid-unlock.
 */
function seeOther(location: string, headers: Record<string, string> = {}): NextResponse {
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: location,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      ...headers,
    },
  });
}
