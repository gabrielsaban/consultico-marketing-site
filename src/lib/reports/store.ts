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

  const file = path.join(REPORTS_DIR, `${slug}.html.enc`);

  // Defence in depth. isValidSlug already makes traversal impossible, but this
  // costs nothing and means a future change to the pattern cannot quietly open
  // the door to reading arbitrary files off the deployment.
  if (path.dirname(file) !== REPORTS_DIR) return null;

  let raw: string;
  try {
    raw = await readFile(file, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`Report ${slug}: could not be read.`, error);
    }
    return null;
  }

  try {
    const envelope = JSON.parse(raw) as ReportEnvelope;
    if (envelope.v !== 1 || envelope.cipher !== 'aes-256-gcm' || !Array.isArray(envelope.wraps)) {
      console.error(`Report ${slug}: unrecognised envelope format.`);
      return null;
    }
    return envelope;
  } catch (error) {
    console.error(`Report ${slug}: envelope is not valid JSON.`, error);
    return null;
  }
}
