# Private client reports

Self-contained HTML reports served at `https://www.consultico.co.uk/r/<slug>`,
behind a per-report access code. Not linked from anywhere on the site, not in
the sitemap, and disallowed in `robots.txt`.

## Adding a report

Three steps, no code changes, no environment variables.

```bash
node scripts/report-seal.mjs --in ~/Downloads/the-report.html --slug ab-1c2d3
```

It prompts for the access code, generates a fallback passcode, writes
`content/reports/<slug>.html.enc`, and prints both secrets. Then:

```bash
git add content/reports/ab-1c2d3.html.enc && git commit && git push
```

Vercel deploys and the report is live at `/r/ab-1c2d3`. Send the client the URL
and the code, separately if you can.

**Never commit the plaintext HTML.** `.gitignore` blocks `content/reports/*.html`
so it cannot happen by accident. Keep the original somewhere outside the repo —
re-sealing needs it, and nothing here can reconstruct it without the code.

## Why the reports are encrypted

This repository is **public**
(`github.com/gabrielsaban/consultico-marketing-site`). A report committed as
plain HTML would be readable by anyone on GitHub, and the passcode gate on the
website would protect nothing. Keeping the file out of `public/` stops the web
server from serving it; it does nothing at all about the repo.

So each report is committed as an AES-256-GCM envelope. GitHub holds an
unreadable blob. The key that opens it exists only in the client's head and in
your notes.

The body is encrypted once under a random content key, and that content key is
then wrapped separately under each secret that should open the report — the
access code, and the fallback passcode. Adding a third way in later is one more
wrap rather than a second copy of the report.

### How strong this actually is

Security rests on the **weakest** secret, because that is the one an attacker
attacks. Key derivation is scrypt at `N=65536`, costing about 64MB of memory and
200ms per guess, which is deliberately hostile to GPUs.

- A generated fallback passcode (~57 bits) is unbreakable in any practical sense.
- A short numeric code is not. Eight digits is roughly 10⁸ guesses; at 200ms
  each that is months of single-core work, but someone with real hardware who
  finds the repo and cares could get there.

That is comfortably enough against casual discovery, which is the actual threat
to a client report. If a report is genuinely sensitive, use a longer access code
— every extra character multiplies the cost — or get the repository switched to
private, which removes the offline-cracking problem entirely.

## Access codes and phone numbers

The code field accepts either a made-up code or the client's mobile number, and
normalises UK numbers before checking, so formatting cannot lock anyone out.
These are all treated as the same secret:

```
07434 123456    07434123456    +44 7434 123456    447434123456    0044 7434 123456
```

A leading `0` becomes `+44`, a leading `00` becomes `+`, and spaces, dashes,
brackets and dots are stripped. The same path handles a numeric code, so a
grouped code works whether or not the client types the spaces.

Do not use a real report's code as an example anywhere in this repository. It is
public, and an example is as readable as a secret.

Nothing is ever sent to the number. There is no SMS and no verification — the
number is simply something the client knows and a stranger does not.

## Generating a fallback passcode

`report-seal.mjs` generates one automatically. To make another:

```bash
node -e "const a='23456789bcdfghjkmnpqrstvwxyz',r=require('crypto').randomInt;console.log(Array.from({length:3},()=>Array.from({length:4},()=>a[r(a.length)]).join('')).join('-'))"
```

The alphabet has no `i`, `l`, `1`, `o`, `0` or vowels, so it survives being read
down a phone line and cannot accidentally spell anything. Changing a report's
passcode means re-sealing it with `--force` and the original HTML.

## Re-sealing an existing report

```bash
node scripts/report-seal.mjs --in ~/Downloads/the-report.html --slug ab-1c2d3 --force
```

This mints a new content key, so **every client who has already unlocked that
report will be asked for the code once more.** Their existing cookie no longer
decrypts anything. That is the intended behaviour when a code is rotated.

## Environment variables

None are required. The area works with nothing set.

| Variable | Required | Effect |
| --- | --- | --- |
| `REPORT_COOKIE_SECRET` | No | Signs unlock cookies. Falls back to a constant in `src/lib/reports/config.ts` when unset. |

There is deliberately no `REPORT_KEYS` map. Sealing each report under its own
secrets makes a per-slug env entry redundant — the envelope already knows what
opens it — which is what lets "add a report" be a file and a deploy.

`REPORT_COOKIE_SECRET` is worth setting once Vercel access is available
(Project → Settings → Environment Variables, all three environments), but be
clear about what it is and is not doing. The committed fallback is public, so
anyone can forge a correctly-signed cookie. That buys them nothing: the cookie
carries the report's content key, AES-GCM refuses to decrypt under a made-up
one, and a forged cookie gets a re-prompt. The signature rejects tampering
cheaply; the encryption is what keeps the report private.

Setting or changing it invalidates every cookie already issued, so clients enter
their code once more. Nothing else breaks.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## How a request flows

1. `GET /r/<slug>` — no cookie, so a 307 to `/r/<slug>/unlock`.
2. The unlock page asks for the code. No client JavaScript; it is a plain form.
3. `POST /api/report-unlock` derives a key from what was typed and tries it
   against each wrap. Wrong code → back to the unlock page with an error, and no
   cookie set.
4. Right code → `rpt_<slug>` cookie, httpOnly, secure, SameSite=Lax, scoped to
   `/r/<slug>`, 30 days. It carries the content key, which is the only way a
   later request can decrypt the report.
5. `GET /r/<slug>` verifies the cookie signature, decrypts, and returns the
   whole file as the response body.

Step 5 is a **route handler, not a React page**, and that is load-bearing. Each
report depends on its own inline `<script>` for chapter navigation, overlays,
collapsing sections and the checklist. Rendered through React with
`dangerouslySetInnerHTML`, the markup would appear and every one of those scripts
would stay inert, because the HTML parser only runs script tags it parses from
the document stream. The client would get a long static page with dead buttons.

## Privacy

The submitted value is never logged, stored, echoed back in the redirect, or
sent anywhere. It is used for one key derivation and then goes out of scope. The
only thing recorded is a line saying which slug was unlocked and when.

Unlock attempts are rate limited to 10 per IP per 15 minutes. The counters are
in-memory on a single instance, so the real allowance is that multiplied by
however many Vercel instances are warm, and it resets on a cold start. Fine for
this; move to a shared store (Upstash, or the Supabase instance this site
already uses) if the area ever matters more. See
`src/lib/reports/rate-limit.ts`.

## Files

```
content/reports/<slug>.html.enc    sealed report, committed
scripts/report-seal.mjs            seals a report, generates the passcode
src/lib/reports/crypto.ts          normalisation, scrypt, envelope, cookie signing
src/lib/reports/store.ts           slug validation, envelope loading
src/lib/reports/rate-limit.ts      attempt limiting
src/lib/reports/config.ts          cookie secret
src/app/r/[slug]/route.ts          serves the report
src/app/r/[slug]/unlock/page.tsx   the unlock page
src/app/api/report-unlock/route.ts checks the code, sets the cookie
```

Adding a report to `content/reports/` requires no change to any of these, but a
new report **must** be a `.enc` file — `next.config.ts` traces
`content/reports/**/*.enc` into the serverless functions, and a file outside
that pattern would 404 in production while working on localhost.
