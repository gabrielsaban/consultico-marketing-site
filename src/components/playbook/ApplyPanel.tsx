'use client';

import { useEffect, useId, useState } from 'react';
import type { ApplyPrompt, PrivacyNotice } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { Disclosure } from '../report/Disclosure';

/**
 * The prompt that makes the client use the idea on their own business.
 *
 * NOT A QUIZ, DELIBERATELY. A multiple-choice check on whether a client
 * understood his own consultant's report reads as patronising, and this
 * material cannot support many questions that are not trivially guessable.
 * Applying the idea proves engagement better and produces something the
 * consultant can actually read before the next session.
 *
 * The privacy line is rendered above the field, verbatim from the document,
 * and the schema makes it impossible to seal a playbook without one. It says
 * *when* it is read, not merely that it might be — "Paul reads these before
 * your next session" makes people write properly; "may be read" makes people
 * write nothing.
 *
 * Saving is localStorage only at this stage. The status line below never claims
 * more than that: a client who writes two hundred words and loses them will not
 * write them again, so it must never show a confirmed tick for a local-only
 * save.
 *
 * ⚠ THE DOCUMENT'S PRIVACY COPY MUST MATCH THIS FILE. The first draft told the
 * client "Paul reads these before your next session" while the answers reached
 * nothing but this browser. When /r/[slug]/progress is built and wired, update
 * both together — the promise in the copy and the code that keeps it.
 */
export function ApplyPanel({
  slug,
  apply,
  privacy,
}: {
  slug: string;
  apply: ApplyPrompt;
  privacy: PrivacyNotice;
}) {
  const id = useId();
  const storageKey = `playbook:${slug}:apply:${apply.id}`;
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'local' | 'unavailable'>('idle');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        setValue(saved);
        setStatus('local');
      }
    } catch {
      setStatus('unavailable');
    }
  }, [storageKey]);

  const field = apply.field;
  const maxWords = field.kind === 'writing' ? field.maxWords : undefined;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  function save(next: string) {
    setValue(next);
    try {
      window.localStorage.setItem(storageKey, next);
      setStatus('local');
    } catch {
      setStatus('unavailable');
    }
  }

  return (
    <div className="rounded-[12px] border border-[var(--r-brand)] bg-[var(--r-brand-bg)] p-5">
      <p className="font-futura text-[1rem] font-bold text-[var(--r-ink)]">{apply.title}</p>
      <p className="mt-2 font-helvetica text-[0.9rem] leading-[1.6] text-[var(--r-ink-2)]">
        <Rich text={apply.prompt} />
      </p>

      {field.kind === 'writing' ? (
        <>
          <label htmlFor={id} className="sr-only">
            {apply.title}
          </label>
          <textarea
            id={id}
            value={value}
            onChange={(e) => save(e.target.value)}
            placeholder={field.placeholder}
            rows={5}
            className="mt-4 w-full rounded-lg border border-[var(--r-hair)] bg-[var(--r-surface)] px-4 py-3 font-helvetica text-[0.92rem] leading-[1.6] text-[var(--r-ink)] outline-none focus:border-[var(--r-brand)]"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="font-helvetica text-[0.72rem] text-[var(--r-muted)]">
              {/* Never a green tick for a local-only save. */}
              {status === 'local'
                ? 'Saved on this device'
                : status === 'unavailable'
                  ? 'Not saved — copy your answer before you close this'
                  : ' '}
            </p>
            {maxWords ? (
              <p
                className={`font-helvetica text-[0.72rem] ${
                  wordCount > maxWords ? 'text-[var(--r-risk)]' : 'text-[var(--r-muted)]'
                }`}
              >
                {wordCount} / {maxWords} words
              </p>
            ) : null}
          </div>

          {field.exemplar?.length ? (
            <div className="mt-3 rounded-[10px] bg-[var(--r-surface)] px-4">
              {/* Behind a disclosure so it cannot anchor before they write. */}
              <Disclosure label="See ours" tone="quiet" toggleLabel="Show">
                {field.exemplar.map((line, i) => (
                  <p key={i} className="mt-1 first:mt-0">
                    <Rich text={line} />
                  </p>
                ))}
              </Disclosure>
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-4 font-helvetica text-[0.85rem] text-[var(--r-muted)]">
          This prompt type is not built yet.
        </p>
      )}

      <p className="mt-4 font-helvetica text-[0.75rem] leading-snug text-[var(--r-muted)]">
        {privacy.short}
      </p>
    </div>
  );
}
