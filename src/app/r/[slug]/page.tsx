import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCookieSecret } from '@/lib/reports/config';
import { decryptBody, readCookieValue } from '@/lib/reports/crypto';
import { docPath, isValidSlug, loadEnvelope, reportCookieName, unlockPath } from '@/lib/reports/store';
import { captureReportOpened } from '@/lib/reports/telemetry';
import { ReportShell } from '@/components/report/ReportShell';
import { PlaybookShell } from '@/components/playbook/PlaybookShell';
import { isPlaybook } from '@/lib/reports/content/is-playbook';
import type { ReportDoc } from '@/lib/reports/content/schema';
import type { Playbook } from '@/lib/reports/content/playbook';

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

/*
 * A title of its own. Without one the page inherited the marketing site's
 * default — "Digital Marketing Consultant in Glasgow | Consultico" — which is
 * wrong on the tab, wrong in the client's history and wrong on a bookmark.
 *
 * Deliberately says no more than the unlock page does. The reader is the
 * client and already knows whose playbook it is; a browser tab, a history
 * entry and a shared screen are all read by people who are not.
 */
export const metadata: Metadata = {
  title: 'Private playbook · Consultico',
  robots: { index: false, follow: false },
};

// node:crypto and fs/promises, and a response that depends on a cookie.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ReportPageProps = {
  params: Promise<{ slug: string }>;
  /** `?a=<actionId>` selects one action of a playbook. Absent renders the opening. */
  searchParams: Promise<{ a?: string }>;
};

export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  const { slug } = await params;
  const { a: actionId } = await searchParams;

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

  const doc = JSON.parse(json) as ReportDoc | Playbook;

  // Two document kinds behind one URL. A playbook renders one action at a time;
  // a report renders its sections. Both decrypt identically above.
  if (isPlaybook(doc)) {
    return <PlaybookShell pb={doc} actionId={actionId} />;
  }
  return <ReportShell doc={doc} />;
}
