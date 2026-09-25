'use client';

import { useEffect, useId, useState } from 'react';
import type { ApplyPrompt, PrivacyNotice } from '@/lib/reports/content/playbook';
import { Rich } from '../report/Rich';
import { Disclosure } from '../report/Disclosure';
import styles from '../report/report.module.css';

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
    /*
     * L4, and the only one on the page. Three nested containers — a tinted
     * panel holding a white textarea holding a white exemplar box — became one
     * solid block: at that point the reader was being shown a form, not asked
     * a question. .onBrand re-declares the ink tokens, so the field, the
     * exemplar behind its disclosure and any placeholder chips all follow
     * without a second styling path through each of them.
     */
    <div className={`${styles.onBrand} rounded-[var(--radius)] p-[var(--s-3)]`}>
      <p className="font-futura text-[length:var(--t-strong)] leading-[var(--lh-strong)]">
        {apply.title}
      </p>
      <p className="mt-[var(--s-1)] font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-[var(--r-ink-2)]">
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
            className="mt-[var(--s-2)] w-full rounded-[var(--radius-inline)] border-0 bg-white/12 px-4 py-3 font-helvetica text-[length:var(--t-body)] leading-[var(--lh-body)] text-white outline-none placeholder:text-white/65 focus:bg-white/20"
          />
          <div className="mt-[var(--s-1)] flex flex-wrap items-center justify-between gap-2">
            <p className="font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
              {/* Never a green tick for a local-only save. */}
              {status === 'local'
                ? 'Saved on this device'
                : status === 'unavailable'
                  ? 'Not saved — copy your answer before you close this'
                  : ' '}
            </p>
            {maxWords ? (
              <p
                className={`font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] ${
                  wordCount > maxWords ? 'text-[#ffc9c9]' : 'text-[var(--r-muted)]'
                }`}
              >
                {wordCount} / {maxWords} words
              </p>
            ) : null}
          </div>

          {field.exemplar?.length ? (
            /* No wrapper. The disclosure's own hairline is now white-on-blue,
               which separates it from the field above without a third box. */
            <div className="mt-[var(--s-2)] border-t border-[var(--r-hair)]">
              {/* Behind a disclosure so it cannot anchor before they write. */}
              <Disclosure label="See ours" toggleLabel="Show">
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
        <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
          This prompt type is not built yet.
        </p>
      )}

      <p className="mt-[var(--s-2)] font-helvetica text-[length:var(--t-small)] leading-[var(--lh-small)] text-[var(--r-muted)]">
        {privacy.short}
      </p>
    </div>
  );
}
