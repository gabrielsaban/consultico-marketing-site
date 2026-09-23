import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { ReportEnvelope } from './crypto';

/**
 * Locating and loading a sealed report.
 *
 * Reports live in content/reports/, not public/. Anything in public/ is served
 * by the CDN to anyone who guesses the filename, with no route in front of it
 * to check a cookie, so a report placed there would be readable by URL alone.
 */

const REPORTS_DIR = path.join(process.cwd(), 'content', 'reports');

// Lowercase letters, digits and hyphens. The slug is interpolated into a
// filesystem path, so this is the check that makes path traversal impossible:
// "../../package.json" contains dots and slashes and never reaches readFile.
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function isValidSlug(slug: string): boolean {
  // The length cap is belt and braces against a pathological slug; ENAMETOOLONG
  // would be caught below anyway, but there is no reason to go to the disk.
  return slug.length > 0 && slug.length <= 128 && SLUG_PATTERN.test(slug);
}

export const REPORT_COOKIE_PREFIX = 'rpt_';

export function reportCookieName(slug: string): string {
  return `${REPORT_COOKIE_PREFIX}${slug}`;
}

export function reportPath(slug: string): string {
  return `/r/${slug}`;
}

/**
 * Where the legacy self-contained HTML document is served.
 *
 * A sub-path of reportPath() on purpose: the unlock cookie is scoped to
 * `/r/<slug>`, and RFC 6265 path-matching sends it to everything beneath that
 * prefix. Anything needing the cookie must live here, which is also why the
 * progress endpoint is not under /api.
 */
export function docPath(slug: string): string {
  return `/r/${slug}/doc`;
}

export function unlockPath(slug: string): string {
  return `/r/${slug}/unlock`;
}

/**
 * Read and parse a sealed report, or null if there is no such report.
 *
 * Returns null rather than throwing for a missing file, because "no report with
 * that slug" is an ordinary 404 and not an error condition. A file that exists
 * but is unreadable or malformed is a real problem and is logged, but still
 * surfaces as a 404 — a visitor learns nothing either way, which is the point.
 */
export async function loadEnvelope(slug: string): Promise<ReportEnvelope | null> {
  if (!isValidSlug(slug)) return null;

  // Dashboard reports first, then legacy self-contained HTML. Order matters:
  // re-issuing a report as a dashboard means dropping a .report.enc beside the
  // old .html.enc, and the new one should win without needing the old one
  // deleted in the same commit.
  const candidates = [`${slug}.report.enc`, `${slug}.html.enc`];

  let raw: string | null = null;
  for (const name of candidates) {
    const file = path.join(REPORTS_DIR, name);

    // Defence in depth. isValidSlug already makes traversal impossible, but this
    // costs nothing and means a future change to the pattern cannot quietly open
    // the door to reading arbitrary files off the deployment.
    if (path.dirname(file) !== REPORTS_DIR) return null;

    try {
      raw = await readFile(file, 'utf8');
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error(`Report ${slug}: ${name} could not be read.`, error);
        return null;
      }
    }
  }

  if (raw === null) return null;

  try {
    const envelope = JSON.parse(raw) as ReportEnvelope;
    if (envelope.v !== 1 || envelope.cipher !== 'aes-256-gcm' || !Array.isArray(envelope.wraps)) {
      console.error(`Report ${slug}: unrecognised envelope format.`);
      return null;
    }
    // Absent payload means an envelope sealed before the dashboard existed.
    // Normalise it here so no caller has to remember the default.
    return { ...envelope, payload: envelope.payload ?? 'html' };
  } catch (error) {
    console.error(`Report ${slug}: envelope is not valid JSON.`, error);
    return null;
  }
}
