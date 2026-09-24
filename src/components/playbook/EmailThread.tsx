'use client';

import { useState } from 'react';
import { Rich } from '../report/Rich';

/**
 * The four emails, with a note on every line explaining what it is doing.
 *
 * This is the single best teaching object in the source document, and in the
 * original it was hidden behind a button while findings that taught nothing sat
 * in the main flow. Worked examples with their rationale attached is the
 * strongest format available for "here is how to write one of these", so it
 * gets a page.
 *
 * The copy is verbatim from the diagnosis — it is what the client actually
 * sends. Placeholders render as amber chips, exactly as they did in the
 * original, so it is obvious at a glance what still needs filling in.
 */
type Email = {
  id: string;
  when: string;
  subject: string;
  preview: string;
  body: string[];
  notes: { title: string; why: string }[];
};

export function EmailThread({ emails }: { emails: Email[] }) {
  const [active, setActive] = useState(0);
  const email = emails[active];
  if (!email) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)] lg:items-start">
      {/* The sequence. Horizontal on a phone, a column on a laptop. */}
      <ol
        role="tablist"
        aria-label="The email sequence"
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {emails.map((e, i) => (
          <li key={e.id} className="min-w-[200px] lg:min-w-0">
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`w-full rounded-[10px] border p-3 text-left transition-colors ${
                i === active
                  ? 'border-[var(--r-brand)] bg-[var(--r-brand-bg)]'
                  : 'border-[var(--r-hair)] bg-[var(--r-surface)] hover:border-[var(--r-brand)]'
              }`}
            >
              <span className="block font-helvetica text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-[var(--r-muted)]">
                {e.when}
              </span>
              <span className="mt-1 block font-helvetica text-[0.85rem] leading-snug font-semibold text-[var(--r-ink)]">
                {e.subject}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="min-w-0">
        {/* The email as it arrives. */}
        <div className="rounded-[12px] border border-[var(--r-hair)] bg-[var(--r-surface)]">
          <div className="border-b border-[var(--r-hair)] p-5">
            <p className="font-futura text-[1.05rem] leading-tight font-bold text-[var(--r-ink)]">
              {email.subject}
            </p>
            <p className="mt-2 font-helvetica text-[0.78rem] text-[var(--r-muted)]">
              Viktor Sághy &middot; sent {email.when.toLowerCase()}
            </p>
          </div>
          <div className="flex flex-col gap-3 p-5">
            {email.body.map((line, i) => (
              <p
                key={i}
                className="font-helvetica text-[0.92rem] leading-[1.65] text-[var(--r-ink)]"
              >
                <Rich text={line} />
              </p>
            ))}
          </div>
        </div>

        {/* Why it is written that way. The part that makes it teachable. */}
        {email.notes.length ? (
          <div className="mt-5">
            <p className="font-helvetica text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--r-muted)]">
              Why it&rsquo;s written this way
            </p>
            <ol className="mt-3 grid gap-3 sm:grid-cols-2">
              {email.notes.map((n, i) => (
                <li key={i} className="rounded-[10px] bg-[var(--r-canvas)] p-3.5">
                  <p className="font-futura text-[0.85rem] font-bold text-[var(--r-ink)]">
                    {n.title}
                  </p>
                  <p className="mt-1 font-helvetica text-[0.83rem] leading-snug text-[var(--r-ink-2)]">
                    <Rich text={n.why} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <p className="mt-5 font-helvetica text-[0.78rem] leading-snug text-[var(--r-muted)]">
          Anything in amber is yours to fill in. Change the wording freely — but check the note
          beside a line before you cut it, because several are doing more than they look.
        </p>
      </div>
    </div>
  );
}
