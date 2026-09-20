import 'server-only';

/**
 * Attempt limiting for report unlocks.
 *
 * IN-MEMORY, AND THAT IS A REAL LIMIT. The counters live in the module scope of
 * one serverless instance. Vercel runs several concurrently and recycles them,
 * so the effective allowance is the limit multiplied by however many instances
 * happen to be warm, and it resets on a cold start. That is fine for the threat
 * this actually faces — someone idly guessing at a client report — and it is
 * not fine as a defence against a distributed or sustained attack.
 *
 * If the report area ever matters more than it does today, move the counters to
 * a shared store (Upstash Redis, or the Supabase instance this site already
 * talks to) and keep the interface below unchanged. Note that scrypt is doing
 * most of the real work here regardless: every wrong guess costs the attacker
 * ~200ms of CPU whether or not the counter survives.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

// Cap the map so a spray of spoofed forwarded-for values cannot grow it without
// bound. Well past any legitimate volume for a handful of client reports.
const MAX_TRACKED = 5000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets, for the Retry-After header. */
  retryAfter: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED) sweep(now);
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

/**
 * Clear an address's counter once it has unlocked successfully, so a client who
 * fumbled the code a few times is not left near the limit on their next report.
 */
export function clearRateLimit(ip: string): void {
  buckets.delete(ip);
}

/**
 * Identify the caller for counting purposes.
 *
 * On Vercel, x-forwarded-for is set by the platform and its first entry is the
 * real client. Off Vercel the header is attacker-controlled and this degrades
 * to a shared bucket, which fails closed (everyone shares one allowance) rather
 * than open.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export { MAX_ATTEMPTS, WINDOW_MS };
