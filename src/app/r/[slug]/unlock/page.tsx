import type { Metadata } from 'next';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCookieSecret } from '@/lib/reports/config';
import { decryptBody, readCookieValue } from '@/lib/reports/crypto';
import { isValidSlug, loadEnvelope, reportCookieName, reportPath } from '@/lib/reports/store';
import styles from '@/components/report/report.module.css';

/**
 * The unlock page for one private report.
 *
 * DELIBERATELY SAYS ALMOST NOTHING. No client name, no report title, no hint at
 * the subject. Someone who finds the URL learns that Consultico writes private
 * reports, which they could have guessed.
 *
 * It does reveal one thing, on purpose: an unknown slug 404s rather than
 * offering a form, so the page confirms whether a slug exists. The alternative
 * — a form for every syntactically valid slug — means anyone who mistypes a
 * link is stuck in a loop being told their correct code is wrong, and rings
 * Paul about it. Slugs are random enough that enumerating them is not a real
 * attack, and a mistyped link is a real Tuesday.
 *
 * No client JavaScript either. It is a plain form that posts to a route
 * handler, so it works before hydration, with JS disabled, and on a bad train
 * connection. The one interactive nicety, focusing the field, is an HTML
 * attribute.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The form's error state arrives as a query parameter, and nothing here should
// ever be prerendered or cached.
export const dynamic = 'force-dynamic';

type UnlockPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ e?: string }>;
};

export default async function UnlockPage({ params, searchParams }: UnlockPageProps) {
  const { slug } = await params;
  const { e } = await searchParams;

  if (!isValidSlug(slug)) notFound();

  // 404 for a report that does not exist, rather than offering a form that
  // could never succeed. It also means this page cannot be used to probe which
  // slugs are real.
  const envelope = await loadEnvelope(slug);
  if (!envelope) notFound();

  // Someone arriving here with a working cookie has already unlocked, most
  // likely by hitting the back button. Send them to the report.
  //
  // "Working" has to mean the cookie actually OPENS the report, not merely that
  // we signed it. Checking only the signature caused a hard lockout: re-sealing
  // a report mints a new content key, so an older cookie stays correctly signed
  // while its key is dead. This page saw a valid signature and bounced to the
  // report; the report decrypted, failed, and bounced back here —
  // ERR_TOO_MANY_REDIRECTS, with no way out but clearing cookies.
  //
  // So the test here is the same test the report makes. Both must agree, or
  // they push the visitor back and forth between them.
  const cookie = (await cookies()).get(reportCookieName(slug));
  const contentKey = cookie?.value
    ? readCookieValue(slug, cookie.value, getCookieSecret())
    : null;
  if (contentKey && decryptBody(envelope, contentKey)) {
    redirect(reportPath(slug));
  }
  // A signed-but-stale cookie falls through to the form. Submitting a correct
  // code overwrites the dead cookie, which is the way out.

  const error = e === '2' ? 'rate' : e === '1' ? 'code' : null;

  return (
    /*
     * On the report's own scoped tokens, not the marketing site's. The two used
     * different dark-mode mechanisms — this page keyed off the `.dark` class,
     * which defaults to light, while the report keys off prefers-color-scheme —
     * so a client in dark mode typed their code on a white page and landed on a
     * near-black document. One mechanism across the whole /r/ area.
     */
    <main className={`${styles.scope} ${styles.unlock}`}>
      <div className="w-full max-w-[26rem]">
        <div className={styles.unlockCard}>
          {/*
            Desktop only. TopBar already puts the wordmark at the top of the
            screen on mobile and is hidden from md up, where the side nav takes
            over and carries no wordmark — so without this the card would either
            show the logo twice on a phone or not at all on a laptop.
          */}
          <Image
            src="/brand/logo_main.svg"
            alt="Consultico"
            width={420}
            height={120}
            className={`${styles.unlockMark} hidden h-auto w-[8.5rem] md:block`}
            priority
          />

          <p className="font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-brand-ink)] md:mt-[var(--s-4)]">
            Private report
          </p>
          <h1 className="mt-[var(--s-1)] font-futura text-[length:var(--t-title)] leading-[var(--lh-title)] tracking-[var(--ls-title)] text-[var(--r-navy)]">
            Enter your access code
          </h1>
          <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] tracking-[var(--ls-body)] text-[var(--r-ink-2)]">
            This report was prepared for one person. Enter the access code you were given to open
            it.
          </p>

          <form method="post" action="/api/report-unlock" className="mt-[var(--s-4)]">
            <input type="hidden" name="slug" value={slug} />

            <label
              htmlFor="code"
              className="block font-helvetica text-[length:var(--t-label)] leading-[var(--lh-label)] tracking-[var(--ls-label)] uppercase text-[var(--r-muted)]"
            >
              Access code
            </label>
            <input
              id="code"
              name="code"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              autoFocus
              required
              aria-describedby={error ? 'unlock-error' : undefined}
              aria-invalid={error ? true : undefined}
              className={styles.unlockField}
            />

            {/*
              One message for every kind of wrong. Saying which part was wrong,
              or that a code was "nearly" right, hands an attacker a free oracle.
            */}
            {error ? (
              <p
                id="unlock-error"
                role="alert"
                className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-risk)]"
              >
                {error === 'rate'
                  ? 'Too many attempts. Please wait a few minutes and try again.'
                  : 'That code was not recognised. Check it and try again.'}
              </p>
            ) : null}

            <button type="submit" className={styles.unlockSubmit}>
              Open report
            </button>
          </form>

          <p className="mt-[var(--s-3)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
            You will only need to do this once on this device.
          </p>
        </div>

        <p className="mt-[var(--s-3)] text-center font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          Having trouble? Reply to the message this link came in and we will sort it.
        </p>
      </div>
    </main>
  );
}
