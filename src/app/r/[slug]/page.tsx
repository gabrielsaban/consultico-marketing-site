import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCookieSecret } from '@/lib/reports/config';
import { decryptBody, readCookieValue } from '@/lib/reports/crypto';
import { docPath, isValidSlug, loadEnvelope, reportCookieName, unlockPath } from '@/lib/reports/store';
import { captureReportOpened } from '@/lib/reports/telemetry';

/**
 * /r/<slug> — the entry point for one private client report.
 *
 * Decryption happens here, on the server, using the content key recovered from
 * the visitor's cookie. The key itself never reaches the browser; only the
 * rendered report does. No new secret and no session store — the cookie set at
 * unlock is the whole credential.
 *
 * Two kinds of report live behind this URL:
 *   payload 'json'  a ReportDoc, rendered as the dashboard
 *   payload 'html'  a legacy self-contained document, served by /doc
 *
 * Note this page cannot set response headers. The no-store / noindex headers
 * that the old route handler set inline now come from the `/r/:path*` block in
 * next.config.ts, which covers this page, the unlock page and /doc alike.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// node:crypto and fs/promises, and a response that depends on a cookie.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ReportPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;

  // Checked before anything touches the filesystem.
  if (!isValidSlug(slug)) notFound();

  const envelope = await loadEnvelope(slug);
  if (!envelope) notFound();

  const cookie = (await cookies()).get(reportCookieName(slug));
  if (!cookie?.value) redirect(unlockPath(slug));

  // Never trusted as given: the signature is recomputed before the key is used.
  const contentKey = readCookieValue(slug, cookie.value, getCookieSecret());
  if (!contentKey) redirect(unlockPath(slug));

  // Legacy reports are whole HTML documents and must be parsed by the browser
  // as a document from the first byte, so their inline scripts run. React
  // cannot do that — hence the separate route handler.
  if (envelope.payload !== 'json') {
    captureReportOpened({ slug, payload: 'html' });
    redirect(docPath(slug));
  }

  const json = decryptBody(envelope, contentKey);
  // A cookie can outlive a re-sealed report: re-issuing mints a new content key,
  // so an old cookie stops decrypting. That is a re-prompt, not an error.
  if (!json) redirect(unlockPath(slug));

  captureReportOpened({ slug, payload: 'json' });

  // The dashboard renderer lands in Phase 1. Until then a json envelope cannot
  // exist in the wild, so reaching here means a report was sealed ahead of the
  // renderer — fail visibly for us, not confusingly for a client.
  throw new Error(`Report ${slug} is sealed as json but the dashboard renderer is not built yet.`);
}
