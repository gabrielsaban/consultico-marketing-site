import 'server-only';
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';

/**
 * Crypto for the private client-report area (/r/<slug>).
 *
 * WHY THE REPORTS ARE ENCRYPTED AT REST, AND NOT JUST PASSCODE-GATED
 *
 * The obvious design is a passcode compared against a hash in an env var, with
 * the report sitting in content/ as plain HTML. That is the right design for a
 * private repository. This repository is PUBLIC
 * (github.com/gabrielsaban/consultico-marketing-site), so a plain-HTML report
 * committed to content/ is readable by anyone on GitHub and the passcode gate
 * on the website protects nothing at all. Keeping it out of public/ stops the
 * web server serving it; it does nothing about the repo.
 *
 * So the report is committed as ciphertext. GitHub only ever holds an
 * unreadable blob, and the key that opens it is never committed anywhere — it
 * exists only in the client's head and in Paul's notes.
 *
 * ENVELOPE ENCRYPTION, BECAUSE TWO DIFFERENT SECRETS MUST OPEN THE SAME REPORT
 *
 * Every report accepts two secrets: the code (or mobile number) the client was
 * given, and a fallback passcode for when they cannot get in. Encrypting the
 * body twice would mean storing it twice. Instead the body is encrypted once
 * under a random content key, and that content key is then wrapped separately
 * under each accepted secret. Adding a third way in later is one more wrap, not
 * another copy of the report.
 *
 * WHY THERE IS NO timingSafeEqual COMPARISON OF PASSCODE HASHES
 *
 * The original spec called for HMAC-SHA256 of the secret stored in an env var
 * and compared with timingSafeEqual. That check cannot survive a public repo:
 * a committed hash of an eight-digit code is cracked in milliseconds, and there
 * is no env var to hide it in yet. AES-GCM replaces it with a strictly stronger
 * equivalent. The authentication tag either verifies or it does not, the
 * comparison is constant-time by construction inside OpenSSL, and a wrong
 * secret yields no plaintext rather than merely a `false`. timingSafeEqual is
 * still used below, for the cookie signature, where a plain byte comparison is
 * genuinely what is wanted.
 *
 * WHAT THIS DOES AND DOES NOT PROTECT AGAINST
 *
 * Security rests entirely on the weakest wrap, because an attacker attacks the
 * easiest one. scrypt at N=65536 costs ~64MB and ~200ms per guess, which makes
 * a short numeric code expensive but not impossible to crack offline for
 * someone who finds the repo and is determined to. It is solid against casual
 * discovery, which is the actual threat to a client report. A longer code buys
 * proportionally more margin; see content/reports/README.md.
 */

// ~64MB and ~200ms per derivation on a warm serverless function. High enough to
// make offline guessing expensive, low enough that a client waits a moment
// rather than a beat. Raising N raises both, in lockstep.
const SCRYPT_N = 65536;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 32;

// scrypt needs 128 * N * r bytes and Node refuses past a default 32MB ceiling,
// so the budget has to be declared explicitly. Doubled to leave headroom.
const SCRYPT_MAXMEM = 128 * SCRYPT_N * SCRYPT_R * 2;

// An envelope is ours and committed, but its KDF parameters still drive an
// allocation, so they are clamped rather than trusted. A corrupted or hostile
// file should fail closed, not ask the runtime for 16GB.
const MAX_SCRYPT_N = 262144;

export type WrapKind = 'phone' | 'passcode';

type Wrap = {
  kind: WrapKind;
  salt: string;
  iv: string;
  tag: string;
  key: string;
};

type Body = {
  iv: string;
  tag: string;
  data: string;
};

/**
 * What the sealed body decrypts to.
 *
 * 'html' is a complete, self-contained HTML document, served as the whole
 * response by /r/<slug>/doc. 'json' is a ReportDoc, rendered as a dashboard by
 * /r/<slug>/page.tsx.
 *
 * Optional, and absent means 'html'. Envelopes sealed before the dashboard
 * existed carry no payload field, and they must keep opening exactly as they
 * did — a client's live report is not something to migrate underneath them.
 */
export type ReportPayload = 'html' | 'json';

export type ReportEnvelope = {
  v: 1;
  slug: string;
  createdAt: string;
  cipher: 'aes-256-gcm';
  payload?: ReportPayload;
  kdf: { name: 'scrypt'; N: number; r: number; p: number; keyLength: number };
  wraps: Wrap[];
  body: Body;
};

/* --------------------------------------------------------------- normalising */

/**
 * Normalise a UK mobile number so that the formatting a person happens to use
 * cannot lock them out. Without this, a client who was given "07434 123456" and
 * types "+447434123456" is told their own number is wrong.
 *
 * All of these collapse to the same string:
 *   07434 123456   07434123456   +44 7434 123456   447434123456   0044 7434 123456
 *
 * The same path handles a numeric access code, which is why a grouped code also
 * works whether or not the client types the spaces.
 */
export function normalisePhone(input: string): string {
  // Spaces, dashes, brackets, dots and non-breaking spaces. Everything a phone
  // number is ever written with, and nothing that carries meaning.
  const stripped = input.replace(/[\s ().\-‐-―]/g, '');

  if (stripped.startsWith('+')) return `+${stripped.slice(1).replace(/\D/g, '')}`;
  // 00 is the international prefix dialled from the UK: 0044... means +44...
  if (stripped.startsWith('00')) return `+${stripped.slice(2).replace(/\D/g, '')}`;

  const digits = stripped.replace(/\D/g, '');
  if (!digits) return '';
  // A national-format UK number: the trunk 0 is replaced by the country code.
  if (digits.startsWith('0')) return `+44${digits.slice(1)}`;
  // Already a country code, just missing its plus.
  if (digits.startsWith('44')) return `+${digits}`;
  return digits;
}

/** Fallback passcodes are read out loud, so case and stray spaces cannot matter. */
export function normalisePasscode(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * The candidate form of what the visitor typed, for one kind of wrap. Deriving
 * one candidate per wrap rather than trying every combination keeps the number
 * of scrypt calls per attempt equal to the number of wraps.
 */
export function candidateFor(kind: WrapKind, submitted: string): string {
  return kind === 'phone' ? normalisePhone(submitted) : normalisePasscode(submitted);
}

/* ------------------------------------------------------------------- deriving */

function deriveKey(secret: string, salt: Buffer, kdf: ReportEnvelope['kdf']): Buffer {
  const N = Math.min(kdf.N, MAX_SCRYPT_N);
  return scryptSync(secret, salt, kdf.keyLength, {
    N,
    r: kdf.r,
    p: kdf.p,
    maxmem: 128 * N * kdf.r * 2,
  });
}

/* ------------------------------------------------------------------ unwrapping */

function gcmDecrypt(key: Buffer, iv: Buffer, tag: Buffer, data: Buffer): Buffer | null {
  try {
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]);
  } catch {
    // final() throws when the tag does not verify, which is the normal signal
    // for "wrong secret". It is not an error worth logging or distinguishing.
    return null;
  }
}

/**
 * Try the submitted value against every wrap in the envelope and return the
 * content key if one of them opens.
 *
 * Deliberately returns the same `null` whether the value was wrong, empty or
 * malformed. The caller has one error message for all of them, because telling
 * someone *how* they were wrong tells an attacker the same thing.
 *
 * The submitted value is never logged, stored or returned, here or anywhere
 * upstream. It exists for the length of this call and then goes out of scope.
 */
export function unwrapContentKey(envelope: ReportEnvelope, submitted: string): Buffer | null {
  for (const wrap of envelope.wraps) {
    const candidate = candidateFor(wrap.kind, submitted);
    if (!candidate) continue;

    const derived = deriveKey(candidate, Buffer.from(wrap.salt, 'base64'), envelope.kdf);
    const contentKey = gcmDecrypt(
      derived,
      Buffer.from(wrap.iv, 'base64'),
      Buffer.from(wrap.tag, 'base64'),
      Buffer.from(wrap.key, 'base64'),
    );
    if (contentKey) return contentKey;
  }
  return null;
}

/** Decrypt the report body with a content key recovered from a wrap or a cookie. */
export function decryptBody(envelope: ReportEnvelope, contentKey: Buffer): string | null {
  const plaintext = gcmDecrypt(
    contentKey,
    Buffer.from(envelope.body.iv, 'base64'),
    Buffer.from(envelope.body.tag, 'base64'),
    Buffer.from(envelope.body.data, 'base64'),
  );
  return plaintext ? plaintext.toString('utf8') : null;
}

/* --------------------------------------------------------------------- cookies */

/**
 * The unlock cookie carries the report's content key, because the server has no
 * way to recover it on a later request otherwise — it is not derivable without
 * the secret, and there is no session store. The cookie is httpOnly, secure,
 * SameSite=Lax and scoped to the single report's path, so it is unreadable from
 * JavaScript and never sent anywhere else.
 *
 * It is signed as well as scoped. The signature is not what keeps the report
 * private — AES-GCM already refuses to decrypt under a key the attacker made up
 * — but verifying it first means a tampered cookie is rejected on a cheap HMAC
 * instead of after a decrypt, and the failure is a clean re-prompt rather than
 * an exception.
 */
export function signCookieValue(slug: string, contentKey: Buffer, secret: string): string {
  const key = contentKey.toString('base64url');
  return `${key}.${cookieMac(slug, key, secret)}`;
}

/**
 * Recover the content key from a cookie, or null if the cookie is absent,
 * malformed or not signed by us. Never trusts the value: the MAC is recomputed
 * from the slug and the key material on every request.
 */
export function readCookieValue(slug: string, value: string, secret: string): Buffer | null {
  const parts = value.split('.');
  if (parts.length !== 2) return null;

  const [key, mac] = parts;
  if (!key || !mac) return null;

  const expected = Buffer.from(cookieMac(slug, key, secret));
  const received = Buffer.from(mac);
  // timingSafeEqual throws on a length mismatch, so that is checked first. The
  // length of a MAC is not a secret; its contents are.
  if (expected.length !== received.length) return null;
  if (!timingSafeEqual(expected, received)) return null;

  const contentKey = Buffer.from(key, 'base64url');
  return contentKey.length === KEY_LENGTH ? contentKey : null;
}

function cookieMac(slug: string, key: string, secret: string): string {
  return createHmac('sha256', secret).update(`${slug}.${key}`).digest('base64url');
}

/* ------------------------------------------------------- sealing (build scripts) */

/**
 * Build one envelope from a plaintext document and the secrets that open it.
 * The body is opaque to the crypto — HTML or JSON, it is bytes either way —
 * so `payload` records which, for the reader to branch on.
 * Only ever called from scripts/report-encrypt.mjs, never at request time — but
 * it lives here so sealing and opening cannot drift apart.
 */
export function sealReport(
  slug: string,
  plaintext: string,
  secrets: { kind: WrapKind; value: string }[],
  payload: ReportPayload = 'html',
): ReportEnvelope {
  const contentKey = randomBytes(KEY_LENGTH);
  const kdf = { name: 'scrypt' as const, N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P, keyLength: KEY_LENGTH };

  const wraps = secrets.map(({ kind, value }) => {
    const candidate = candidateFor(kind, value);
    if (!candidate) throw new Error(`Empty secret for the "${kind}" wrap.`);

    // A separate salt per wrap, so two reports sharing a fallback passcode do
    // not share a derived key, and so one cracked wrap tells you nothing about
    // any other.
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', deriveKey(candidate, salt, kdf), iv);
    const key = Buffer.concat([cipher.update(contentKey), cipher.final()]);

    return {
      kind,
      salt: salt.toString('base64'),
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
      key: key.toString('base64'),
    };
  });

  const bodyIv = randomBytes(12);
  const bodyCipher = createCipheriv('aes-256-gcm', contentKey, bodyIv);
  const data = Buffer.concat([bodyCipher.update(plaintext, 'utf8'), bodyCipher.final()]);

  return {
    v: 1,
    slug,
    createdAt: new Date().toISOString(),
    cipher: 'aes-256-gcm',
    payload,
    kdf,
    wraps,
    body: {
      iv: bodyIv.toString('base64'),
      tag: bodyCipher.getAuthTag().toString('base64'),
      data: data.toString('base64'),
    },
  };
}

export { SCRYPT_MAXMEM };
