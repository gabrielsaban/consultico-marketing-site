import 'server-only';

/**
 * The one piece of configuration the report area needs.
 *
 * There is deliberately no REPORT_KEYS map here. The original plan was one env
 * entry per report holding a phone hash and a fallback passcode, but sealing
 * each report under its own secrets (see crypto.ts) makes that map redundant:
 * the envelope already knows what opens it. Adding a report is now "drop a file
 * in content/reports/ and deploy", with no env change and no code change, which
 * is what the map existed to achieve in the first place.
 *
 * REPORT_COOKIE_SECRET signs unlock cookies. It is read from the environment
 * when set and falls back to the constant below, because Vercel env access is
 * not available yet and the area has to work today.
 *
 * BE CLEAR ABOUT WHAT THE FALLBACK IS WORTH. It is committed to a public repo,
 * so it is not a secret and anyone can forge a correctly-signed cookie. That
 * buys them nothing: the cookie carries the report's content key, AES-GCM
 * refuses to decrypt under a made-up one, and a forged cookie gets a re-prompt.
 * The signature is there to reject tampering cheaply, not to keep the report
 * private — the encryption does that. Setting the env var in Vercel upgrades it
 * to a real secret and takes precedence automatically.
 *
 * Changing the secret invalidates every cookie already issued, so clients enter
 * their code once more. Nothing else breaks; the reports themselves are sealed
 * under the client secrets, not under this one.
 */
const FALLBACK_COOKIE_SECRET =
  'b839d70e14f0837622966d8280cd4b76eac16e67e1615ee66eabb1c2aa8f4799';

export function getCookieSecret(): string {
  const fromEnv = process.env.REPORT_COOKIE_SECRET?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_COOKIE_SECRET;
}

/** 30 days, in seconds. A client enters their code once per device, per month. */
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
