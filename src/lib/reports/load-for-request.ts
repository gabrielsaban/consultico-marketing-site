import 'server-only';
import { cookies } from 'next/headers';
import { getCookieSecret } from './config';
import { decryptBody, readCookieValue } from './crypto';
import { isValidSlug, loadEnvelope, reportCookieName } from './store';
import { isPlaybook } from './content/is-playbook';
import type { Playbook } from './content/playbook';
import type { ReportDoc } from './content/schema';

/**
 * Recover and decrypt a document for the current request.
 *
 * Shared by /r/[slug], /r/[slug]/plan and /r/[slug]/resources, which all need
 * the identical five steps: validate the slug, read the path-scoped cookie,
 * recompute its signature, decrypt, parse. Three copies of that would be three
 * chances for one of them to skip a step, and the one that skipped it would be
 * the one serving a client report without checking the cookie.
 *
 * Returns a discriminated result rather than throwing, so each caller decides
 * whether a miss means notFound() or a redirect to unlock.
 */
export type LoadResult =
  | { kind: 'missing' }
  | { kind: 'locked' }
  | { kind: 'playbook'; doc: Playbook }
  | { kind: 'report'; doc: ReportDoc };

export async function loadForRequest(slug: string): Promise<LoadResult> {
  if (!isValidSlug(slug)) return { kind: 'missing' };

  const envelope = await loadEnvelope(slug);
  if (!envelope) return { kind: 'missing' };

  const cookie = (await cookies()).get(reportCookieName(slug));
  if (!cookie?.value) return { kind: 'locked' };

  const contentKey = readCookieValue(slug, cookie.value, getCookieSecret());
  if (!contentKey) return { kind: 'locked' };

  if (envelope.payload !== 'json') return { kind: 'locked' };

  const json = decryptBody(envelope, contentKey);
  // A cookie can outlive a re-sealed document: re-issuing mints a new content
  // key, so an old cookie stops decrypting. That is a re-prompt, not an error.
  if (!json) return { kind: 'locked' };

  const doc = JSON.parse(json) as ReportDoc | Playbook;
  return isPlaybook(doc) ? { kind: 'playbook', doc } : { kind: 'report', doc };
}
