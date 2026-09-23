#!/usr/bin/env node
/**
 * Seal a client report so it can be committed to this PUBLIC repository without
 * publishing its contents.
 *
 *   node scripts/report-seal.mjs --in <file.json|file.html> --slug <slug>
 *
 * Prompts for the access code (the code or mobile number the client is given),
 * generates a fallback passcode, and writes the sealed envelope to
 * content/reports/<slug>.report.enc (a dashboard ReportDoc, from .json) or
 * <slug>.html.enc (a legacy self-contained document, from .html).
 *
 * The code is read from a prompt rather than an argument on purpose: an
 * argument lands in shell history and in the process list, where it outlives
 * the ten seconds it was needed for.
 *
 * Flags:
 *   --in <path>         plaintext .json ReportDoc or .html document (required)
 *   --slug <slug>       report slug, [a-z0-9-] (required)
 *   --code <value>      access code, if you must pass it non-interactively
 *   --passcode <value>  fallback passcode; generated when omitted
 *   --force             overwrite an existing sealed report
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import {
  randomInt,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { validateReportDoc } from './lib/report-doc.mjs';
import { stdin, stdout } from 'node:process';

/* -------------------------------------------------------------------- config */

// These MUST match src/lib/reports/crypto.ts. They are duplicated rather than
// imported because this is a plain .mjs script and that file is TypeScript with
// a `server-only` import that will not load outside the Next build. The
// envelope records them, so a future change here cannot break old reports — but
// a mismatch would make a freshly sealed report unopenable, so a self-test at
// the bottom of this script opens what it just wrote before saving it.
const SCRYPT = { name: 'scrypt', N: 65536, r: 8, p: 1, keyLength: 32 };

const REPORTS_DIR = join(process.cwd(), 'content', 'reports');
const SLUG_PATTERN = /^[a-z0-9-]+$/;

/* --------------------------------------------------------- shared with the app */

function normalisePhone(input) {
  const stripped = input.replace(/[\s ().\-‐-―]/g, '');
  if (stripped.startsWith('+')) return `+${stripped.slice(1).replace(/\D/g, '')}`;
  if (stripped.startsWith('00')) return `+${stripped.slice(2).replace(/\D/g, '')}`;
  const digits = stripped.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `+44${digits.slice(1)}`;
  if (digits.startsWith('44')) return `+${digits}`;
  return digits;
}

const normalisePasscode = (input) => input.trim().toLowerCase();

const candidateFor = (kind, value) =>
  kind === 'phone' ? normalisePhone(value) : normalisePasscode(value);

function deriveKey(secret, salt, kdf) {
  return scryptSync(secret, salt, kdf.keyLength, {
    N: kdf.N,
    r: kdf.r,
    p: kdf.p,
    maxmem: 128 * kdf.N * kdf.r * 2,
  });
}

function sealReport(slug, html, secrets, payload) {
  const contentKey = randomBytes(SCRYPT.keyLength);

  const wraps = secrets.map(({ kind, value }) => {
    const candidate = candidateFor(kind, value);
    if (!candidate) throw new Error(`Empty secret for the "${kind}" wrap.`);
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', deriveKey(candidate, salt, SCRYPT), iv);
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
  const data = Buffer.concat([bodyCipher.update(html, 'utf8'), bodyCipher.final()]);

  return {
    v: 1,
    slug,
    createdAt: new Date().toISOString(),
    cipher: 'aes-256-gcm',
    payload,
    kdf: SCRYPT,
    wraps,
    body: {
      iv: bodyIv.toString('base64'),
      tag: bodyCipher.getAuthTag().toString('base64'),
      data: data.toString('base64'),
    },
  };
}

/* ------------------------------------------------------------------- passcodes */

/**
 * A fallback passcode that survives being read down a phone line. No i/l/1/o/0,
 * no vowels to accidentally spell something, grouped for dictation.
 * Three groups of four from a 28-character alphabet is ~57 bits, which is far
 * beyond anything an attacker will grind through at 200ms per guess.
 */
function generatePasscode() {
  const alphabet = '23456789bcdfghjkmnpqrstvwxyz';
  const group = () =>
    Array.from({ length: 4 }, () => alphabet[randomInt(alphabet.length)]).join('');
  return `${group()}-${group()}-${group()}`;
}

/* ------------------------------------------------------------------------ main */

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const name = arg.slice(2);
    if (name === 'force') {
      args.force = true;
      continue;
    }
    args[name] = argv[i + 1];
    i += 1;
  }
  return args;
}

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.in) fail('Missing --in <file.json|file.html>');
  if (!args.slug) fail('Missing --slug <slug>');
  if (!SLUG_PATTERN.test(args.slug)) {
    fail(`Slug "${args.slug}" must match [a-z0-9-]. The route rejects anything else.`);
  }
  if (!existsSync(args.in)) fail(`No such file: ${args.in}`);

  // Extension decides the payload kind: .json is a ReportDoc for the dashboard,
  // anything else a self-contained HTML document for the legacy /doc route.
  const isJson = /\.json$/i.test(args.in);
  const payload = isJson ? 'json' : 'html';
  const source = readFileSync(args.in, 'utf8');

  const out = join(REPORTS_DIR, isJson ? `${args.slug}.report.enc` : `${args.slug}.html.enc`);
  if (existsSync(out) && !args.force) {
    fail(`${basename(out)} already exists. Pass --force to re-seal it.`);
  }

  if (isJson) {
    // The only gate between an authoring mistake and a client opening a broken
    // report. The build cannot do this — it only ever sees ciphertext.
    let doc;
    try {
      doc = JSON.parse(source);
    } catch (error) {
      fail(`That file is not valid JSON: ${error.message}`);
    }
    if (doc.slug && doc.slug !== args.slug) {
      fail(`Document slug "${doc.slug}" does not match --slug "${args.slug}".`);
    }
    const { errors, warnings } = validateReportDoc(doc);
    for (const w of warnings) console.warn(`  ! ${w}`);
    if (errors.length) {
      console.error(`\n  ✗ ${errors.length} problem${errors.length === 1 ? '' : 's'} in ${args.in}:\n`);
      for (const e of errors) console.error(`      ${e}`);
      console.error('');
      process.exit(1);
    }
    const sectionCount = (doc.sections ?? []).length;
    const taskCount = (doc.plan?.tasks ?? []).length;
    console.log(`  ✓ Document valid — ${sectionCount} sections, ${taskCount} tasks${warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? '' : 's'}` : ''}`);
  } else {
    if (!/<html[\s>]/i.test(source)) {
      fail('That file does not look like a complete HTML document.');
    }
    if (!/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(source)) {
      console.warn('  ! Warning: no noindex meta tag found in the report itself.');
    }
  }

  let code = args.code;
  if (!code) {
    const rl = createInterface({ input: stdin, output: stdout });
    code = await rl.question('  Access code (or mobile number) for this report: ');
    rl.close();
  }
  if (!code.trim()) fail('An access code is required.');

  const passcode = args.passcode ?? generatePasscode();

  const envelope = sealReport(args.slug, source, [
    { kind: 'phone', value: code },
    { kind: 'passcode', value: passcode },
  ], payload);

  // Open what was just sealed, with both secrets, before writing anything. A
  // report that cannot be opened is worse than no report, and it would only be
  // discovered by the client.
  verify(envelope, code, source, 'access code');
  verify(envelope, passcode, source, 'fallback passcode');

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');

  const sizeKb = (Buffer.byteLength(JSON.stringify(envelope)) / 1024).toFixed(0);
  console.log(`
  ✓ Sealed content/reports/${basename(out)} (${sizeKb}KB)
    Both secrets verified against the sealed file.

    URL                 https://www.consultico.co.uk/r/${args.slug}
    Access code         ${code}
    Fallback passcode   ${passcode}

    Store both somewhere that is not this repository. They are not recorded
    anywhere else and cannot be recovered from the sealed file — losing them
    means re-sealing from the original HTML.
`);
}

/** Re-derive from a secret and confirm the plaintext round-trips exactly. */
function verify(envelope, secret, expected, label) {
  for (const wrap of envelope.wraps) {
    const candidate = candidateFor(wrap.kind, secret);
    if (!candidate) continue;
    try {
      const unwrap = createDecipheriv(
        'aes-256-gcm',
        deriveKey(candidate, Buffer.from(wrap.salt, 'base64'), envelope.kdf),
        Buffer.from(wrap.iv, 'base64'),
      );
      unwrap.setAuthTag(Buffer.from(wrap.tag, 'base64'));
      const contentKey = Buffer.concat([
        unwrap.update(Buffer.from(wrap.key, 'base64')),
        unwrap.final(),
      ]);

      const body = createDecipheriv('aes-256-gcm', contentKey, Buffer.from(envelope.body.iv, 'base64'));
      body.setAuthTag(Buffer.from(envelope.body.tag, 'base64'));
      const html = Buffer.concat([
        body.update(Buffer.from(envelope.body.data, 'base64')),
        body.final(),
      ]).toString('utf8');

      if (html === expected) return;
      fail(`Self-test failed: the ${label} opened the report but the HTML did not match.`);
    } catch {
      // Wrong wrap for this secret; try the next one.
    }
  }
  fail(`Self-test failed: the ${label} did not open the sealed report.`);
}

main().catch((error) => fail(error.message));
