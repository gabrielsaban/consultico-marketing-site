'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { identify, track } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import { createFormSessionId } from '@/components/ContactForm';

/**
 * "Apply now": a five-step application, one short question set per screen.
 *
 * The friction is deliberate (Paul, 2026-11-23): a £5,000-a-month engagement
 * should feel like something you apply for, not a newsletter box. Each step is
 * small enough to answer in seconds, and a progress bar shows the end.
 *
 * It posts to the existing /api/contact-form with formSource 'apply', so
 * applications land in the same inbox, Supabase table and GHL as enquiries,
 * tagged 'apply-form'. The answers are packed into the message field.
 */

const REVENUE = ['Under £1m', '£1m to £5m', '£5m to £20m', 'Over £20m'];
const TEAM = ['Just me', '1 to 3 people', '4 to 10 people', 'More than 10'];
const SPEND = ['Under £2,000', '£2,000 to £10,000', '£10,000 to £50,000', 'Over £50,000'];
const CHANNELS = ['SEO', 'Google Ads', 'Meta ads', 'Email', 'Social', 'Influencers', 'PR', 'Retail or wholesale', 'Other'];
const START = ['As soon as possible', 'In the next 3 months', 'Later this year', 'Just exploring'];

type Answers = {
  name: string;
  business: string;
  companyWebsite: string;
  revenue: string;
  team: string;
  spend: string;
  channels: string[];
  goal: string;
  start: string;
  email: string;
  phone: string;
  heardAbout: string;
  website: string; // honeypot
};

const EMPTY: Answers = {
  name: '',
  business: '',
  companyWebsite: '',
  revenue: '',
  team: '',
  spend: '',
  channels: [],
  goal: '',
  start: '',
  email: '',
  phone: '',
  heardAbout: '',
  website: '',
};

const STEPS = [
  { title: 'You and your brand', hint: '' },
  { title: 'Your size', hint: 'It helps us suggest the right way to work together.' },
  { title: 'Where you are now', hint: 'Your monthly marketing spend, and the channels you use today.' },
  { title: 'Where you want to be', hint: '' },
  { title: 'How to reach you', hint: 'We reply within one working day.' },
];

const inputClass =
  'mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-helvetica text-[1rem] text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white';
const labelClass = 'block font-helvetica font-medium text-[1rem] text-[#1B2A4A] dark:text-white';

function Choice({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-3 grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`min-h-[52px] rounded-lg border px-4 py-3 text-left font-helvetica text-[1rem] transition-colors ${
              selected
                ? 'border-brand-blue bg-brand-blue text-white'
                : 'border-gray-300 bg-white text-gray-900 hover:border-brand-blue dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const sessionId = useRef(createFormSessionId());
  const startedAt = useRef(Date.now());
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleChannel = (channel: string) =>
    set(
      'channels',
      answers.channels.includes(channel)
        ? answers.channels.filter((c) => c !== channel)
        : [...answers.channels, channel],
    );

  function validate(): string {
    if (step === 0 && (!answers.name.trim() || !answers.business.trim())) return 'Please add your name and your brand.';
    if (step === 1 && (!answers.revenue || !answers.team)) return 'Please pick one option in each list.';
    if (step === 2 && !answers.spend) return 'Please pick your rough monthly spend.';
    if (step === 3 && (!answers.goal.trim() || !answers.start)) return 'Please add your goal and when you would like to start.';
    if (step === 4 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) return 'Please add a valid email address.';
    return '';
  }

  function goTo(next: number) {
    setError('');
    setStep(next);
    track('apply_step', { step: next + 1 });
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }

    setStatus('sending');
    const message = [
      'Think First / Loop application',
      '',
      `Yearly revenue: ${answers.revenue}`,
      `Marketing team: ${answers.team}`,
      `Monthly marketing spend: ${answers.spend}`,
      `Channels now: ${answers.channels.join(', ') || 'None ticked'}`,
      `Wants to start: ${answers.start}`,
      '',
      'Goal for the next 12 months:',
      answers.goal.trim(),
    ].join('\n');

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId.current,
          startedAt: startedAt.current,
          status: 'submitted',
          formSource: 'apply',
          name: answers.name,
          business: answers.business,
          email: answers.email,
          phone: answers.phone,
          companyWebsite: answers.companyWebsite,
          heardAbout: answers.heardAbout,
          website: answers.website,
          message,
          attribution: getAttribution(),
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      identify(answers.email, { name: answers.name, business: answers.business });
      track('apply_submitted', { revenue: answers.revenue, spend: answers.spend });
      setStatus('done');
    } catch {
      setStatus('idle');
      setError('Something went wrong sending that. Please try again, or email us instead.');
    }
  }

  if (status === 'done') {
    const smaller = answers.revenue === 'Under £1m';
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 dark:border-gray-800 dark:bg-gray-900" aria-live="polite">
        <h2 className="font-futura text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold text-[#1B2A4A] dark:text-white">
          Thanks, {answers.name.split(' ')[0]}. Your application is in.
        </h2>
        <p className="mt-4 font-helvetica-light text-[1.1rem] leading-[1.6] text-gray-700 dark:text-gray-300">
          We read every application ourselves and will email you within one working day to book a call.
        </p>
        {smaller && (
          <p className="mt-4 font-helvetica-light text-[1.1rem] leading-[1.6] text-gray-700 dark:text-gray-300">
            While you wait: if you&apos;re earlier on, our agency services start from £1,000 a month, and there are lighter
            options too. <Link href="/pricing" className="text-brand-blue underline underline-offset-4">See pricing</Link>.
          </p>
        )}
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between font-helvetica text-[0.95rem] text-gray-600 dark:text-gray-400">
        <span>
          Step {step + 1} of {STEPS.length}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => goTo(step - 1)} className="text-brand-blue hover:underline">
            ← Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-blue transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-8 font-futura text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-[#1B2A4A] outline-none dark:text-white"
      >
        {STEPS[step].title}
      </h2>
      {STEPS[step].hint && (
        <p className="mt-2 font-helvetica-light text-[1.05rem] text-gray-600 dark:text-gray-400">{STEPS[step].hint}</p>
      )}

      {/* Honeypot: hidden from people, filled by bots. */}
      <input
        type="text"
        name="website"
        value={answers.website}
        onChange={(e) => set('website', e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-6 space-y-6">
        {step === 0 && (
          <>
            <label className={labelClass}>
              Your name
              <input className={inputClass} value={answers.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" required />
            </label>
            <label className={labelClass}>
              Your brand
              <input className={inputClass} value={answers.business} onChange={(e) => set('business', e.target.value)} autoComplete="organization" required />
            </label>
            <label className={labelClass}>
              Website <span className="font-helvetica-light text-gray-500">(optional)</span>
              <input className={inputClass} value={answers.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} inputMode="url" placeholder="yourbrand.co.uk" />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <fieldset>
              <legend className={labelClass}>Yearly revenue</legend>
              <Choice name="Yearly revenue" options={REVENUE} value={answers.revenue} onChange={(v) => set('revenue', v)} />
            </fieldset>
            <fieldset>
              <legend className={labelClass}>Who works on your marketing?</legend>
              <Choice name="Marketing team size" options={TEAM} value={answers.team} onChange={(v) => set('team', v)} />
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend className={labelClass}>Monthly marketing spend, including ads</legend>
              <Choice name="Monthly marketing spend" options={SPEND} value={answers.spend} onChange={(v) => set('spend', v)} />
            </fieldset>
            <fieldset>
              <legend className={labelClass}>
                Channels you use now <span className="font-helvetica-light text-gray-500">(tick any)</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHANNELS.map((channel) => {
                  const on = answers.channels.includes(channel);
                  return (
                    <button
                      key={channel}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleChannel(channel)}
                      className={`min-h-[44px] rounded-full border px-4 py-2 font-helvetica text-[0.95rem] transition-colors ${
                        on
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-brand-blue dark:border-gray-700 dark:bg-gray-900 dark:text-white'
                      }`}
                    >
                      {channel}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <label className={labelClass}>
              What would make the next 12 months a success?
              <textarea
                className={`${inputClass} min-h-[120px]`}
                value={answers.goal}
                onChange={(e) => set('goal', e.target.value)}
                placeholder="For example: grow online sales without raising ad spend, or launch into a new market."
                required
              />
            </label>
            <fieldset>
              <legend className={labelClass}>When would you like to start?</legend>
              <Choice name="Start date" options={START} value={answers.start} onChange={(v) => set('start', v)} />
            </fieldset>
          </>
        )}

        {step === 4 && (
          <>
            <label className={labelClass}>
              Email
              <input className={inputClass} type="email" value={answers.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" required />
            </label>
            <label className={labelClass}>
              Phone <span className="font-helvetica-light text-gray-500">(optional)</span>
              <input className={inputClass} type="tel" value={answers.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
            </label>
            <label className={labelClass}>
              How did you hear about us? <span className="font-helvetica-light text-gray-500">(optional)</span>
              <input className={inputClass} value={answers.heardAbout} onChange={(e) => set('heardAbout', e.target.value)} />
            </label>
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-6 font-helvetica text-[1rem] text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-brand-blue px-8 py-3 font-helvetica font-medium text-white transition-colors hover:bg-[#006FE6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:opacity-60"
        >
          {step < STEPS.length - 1 ? 'Next' : status === 'sending' ? 'Sending…' : 'Send application'}
        </button>
        <Link href="/contact" className="font-helvetica text-[1rem] text-brand-blue underline-offset-4 hover:underline">
          Rather talk first? Book a call
        </Link>
      </div>
    </form>
  );
}
