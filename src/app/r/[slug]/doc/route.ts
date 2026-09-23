import { cookies } from 'next/headers';
import { getCookieSecret } from '@/lib/reports/config';
import { decryptBody, readCookieValue } from '@/lib/reports/crypto';
import { isValidSlug, loadEnvelope, reportCookieName, reportPath, unlockPath } from '@/lib/reports/store';

/**
 * GET /r/<slug>/doc — serve one private client report as a whole HTML document.
 *
 * This is the legacy delivery path, kept for reports sealed before the
 * dashboard existed. /r/<slug> now renders a React dashboard for envelopes with
 * payload 'json' and redirects here for payload 'html'. A client's live report
 * is not something to migrate underneath them, so this stays until the last
 * HTML report is retired, then the whole directory goes.
 *
 * THIS IS A ROUTE HANDLER, NOT A PAGE, AND THAT IS LOAD-BEARING.
 *
 * Each report is a self-contained HTML document with its own <style> and
 * <script>. Rendering it through React with dangerouslySetInnerHTML would put
 * the markup on the page but leave every inline <script> inert, because the
 * HTML parser only executes script tags it parses from the document stream, not
 * ones injected as innerHTML afterwards. The report's chapter navigation,
 * overlays, collapsing sections and checklist are all script — served that way
 * the client would get a long static page with dead buttons.
 *
 * So the file is returned as the whole response body, exactly as authored, and
 * the browser parses it as a document from the first byte.
 */

// fs/promises and node:crypto, so the Node runtime rather than Edge.
export const runtime = 'nodejs';
// Every response depends on a cookie and must never be cached or prerendered.
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Checked before anything touches the filesystem. "../../package.json" and
  // friends fail here and never become a path.
  if (!isValidSlug(slug)) return notFound();

  const envelope = await loadEnvelope(slug);
  if (!envelope) return notFound();

  const cookie = (await cookies()).get(reportCookieName(slug));
  if (!cookie?.value) return toUnlock(slug);

  // Never trusted as given: the signature is recomputed from the slug and the
  // key material before the key is used for anything.
  const contentKey = readCookieValue(slug, cookie.value, getCookieSecret());
  if (!contentKey) return toUnlock(slug);

  // A dashboard report reached through this path means a stale link or a
  // hand-typed URL. Send it to the page that knows how to render it rather than
  // returning JSON to a browser expecting a document.
  if (envelope.payload === 'json') {
    return new Response(null, {
      status: 307,
      headers: { Location: reportPath(slug), 'Cache-Control': 'private, no-store' },
    });
  }

  // A cookie can outlive a re-sealed report — if a report is re-issued under a
  // new code, old content keys stop working. That is a re-prompt, not an error.
  const html = decryptBody(envelope, contentKey);
  if (!html) return toUnlock(slug);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Belt and braces with robots.txt and the report's own meta tag. This one
      // is the header crawlers honour even when they reach the URL directly.
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      // no-store, not just private: a client report should not sit in a shared
      // proxy, a CDN, or the back/forward cache of a borrowed laptop.
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * 404 for an unknown slug and for a malformed one alike. A locked report is not
 * a 404 — it redirects to its unlock page — so this only ever means "no such
 * report", and it says nothing about whether a given slug exists.
 */
function notFound(): Response {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'private, no-store',
    },
  });
}

function toUnlock(slug: string): Response {
  return new Response(null, {
    status: 307,
    headers: {
      Location: unlockPath(slug),
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'private, no-store',
    },
  });
}
