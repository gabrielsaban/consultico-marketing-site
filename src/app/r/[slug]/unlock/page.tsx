import type { Metadata } from 'next';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getCookieSecret } from '@/lib/reports/config';
import { readCookieValue } from '@/lib/reports/crypto';
import { isValidSlug, loadEnvelope, reportCookieName, reportPath } from '@/lib/reports/store';

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
  const cookie = (await cookies()).get(reportCookieName(slug));
  if (cookie?.value && readCookieValue(slug, cookie.value, getCookieSecret())) {
    redirect(reportPath(slug));
  }

  const error = e === '2' ? 'rate' : e === '1' ? 'code' : null;

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-brand-silk px-4 py-20 dark:bg-gray-950">
      <div className="w-full max-w-[26rem]">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10 dark:border-gray-800 dark:bg-gray-900">
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
            className="hidden h-auto w-[8.5rem] md:block"
            priority
          />

          <p className="font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-blue md:mt-8">
            Private report
          </p>
          <h1 className="mt-2 font-futura text-[clamp(1.5rem,4vw,1.875rem)] font-bold leading-tight text-gray-900 dark:text-white">
            Enter your access code
          </h1>
          <p className="mt-3 font-helvetica-light text-[0.95rem] leading-[1.7] text-gray-600 dark:text-gray-400">
            This report was prepared for one person. Enter the access code you were given to open
            it.
          </p>

          <form method="post" action="/api/report-unlock" className="mt-7">
            <input type="hidden" name="slug" value={slug} />

            <label
              htmlFor="code"
              className="block font-helvetica text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
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
              className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 font-helvetica text-[1.05rem] tracking-[0.02em] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-gray-950 dark:text-white ${
                error
                  ? 'border-red-400 dark:border-red-500/70'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            />

            {/*
              One message for every kind of wrong. Saying which part was wrong,
              or that a code was "nearly" right, hands an attacker a free oracle.
            */}
            {error === 'code' && (
              <p
                id="unlock-error"
                role="alert"
                className="mt-3 font-helvetica-light text-[0.9rem] leading-[1.6] text-red-600 dark:text-red-400"
              >
                That code was not recognised. Check it and try again.
              </p>
            )}
            {error === 'rate' && (
              <p
                id="unlock-error"
                role="alert"
                className="mt-3 font-helvetica-light text-[0.9rem] leading-[1.6] text-red-600 dark:text-red-400"
              >
                Too many attempts. Please wait a few minutes and try again.
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-brand-blue px-6 py-3 font-helvetica text-[1rem] font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Open report
            </button>
          </form>

          <p className="mt-6 font-helvetica-light text-[0.85rem] leading-[1.6] text-gray-500 dark:text-gray-500">
            You will only need to do this once on this device.
          </p>
        </div>

        <p className="mt-6 text-center font-helvetica-light text-[0.8rem] text-gray-500 dark:text-gray-500">
          Having trouble? Reply to the message this link came in and we will sort it.
        </p>
      </div>
    </main>
  );
}
