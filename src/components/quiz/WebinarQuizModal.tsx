'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  calculateTotalScore,
  emptyQuizAnswers,
  getTierFromScore,
  quizQuestions,
  tierContent,
  type QuizAnswers,
  type QuizContact,
  type QuizQuestion,
  type SingleChoiceQuestionId,
} from '@/lib/quiz';

interface WebinarQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuizScreen = 'registration' | 'question' | 'calculating' | 'results';

const calendarUrl = 'https://api.leadconnectorhq.com/widget/booking/gNiCvEOt1hrqwcPYQFmJ';

const initialContact: QuizContact = {
  name: '',
  business: '',
  email: '',
  phone: '',
};

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.4"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

async function persistQuizSession({
  sessionId,
  status,
  contact,
  answers,
  score,
  stage,
  currentStep,
}: {
  sessionId: string;
  status: 'draft' | 'submitted';
  contact: QuizContact;
  answers: QuizAnswers;
  score?: number | null;
  stage?: string | null;
  currentStep?: number | null;
}) {
  const response = await fetch('/api/webinar-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      status,
      contact,
      answers,
      score,
      stage,
      currentStep,
    }),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? 'Quiz save failed');
  }
}

function RegistrationStep({
  contact,
  errors,
  onChange,
  onSubmit,
}: {
  contact: QuizContact;
  errors: Partial<Record<keyof QuizContact, string>>;
  onChange: (field: keyof QuizContact, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const fields: {
    id: keyof QuizContact;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Smith' },
    { id: 'business', label: 'Business Name', type: 'text', placeholder: 'Your Business Name' },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '07123 456789' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <p className="mb-2 text-[0.78rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
          Step 1
        </p>
        <h3 className="font-futura text-[clamp(1.7rem,3.2vw,2.6rem)] font-bold leading-[1.06] text-gray-900 dark:text-white">
          Your details
        </h3>
        <p className="mt-3 max-w-2xl font-helvetica-light text-[clamp(0.95rem,1.2vw,1.08rem)] leading-[1.55] text-gray-700 dark:text-gray-300">
          Fill this in first so your score can be saved and sent with the right webinar details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={`quiz-${field.id}`}
              className="mb-2 block font-helvetica text-[clamp(0.88rem,1vw,0.98rem)] font-medium text-gray-700 dark:text-gray-300"
            >
              {field.label}
            </label>
            <input
              id={`quiz-${field.id}`}
              type={field.type}
              value={contact[field.id]}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
              className={`w-full rounded-lg border bg-white px-4 py-3 font-helvetica text-gray-900 outline-none transition-all focus:border-brand-blue focus:ring-1 focus:ring-brand-blue dark:bg-gray-950 dark:text-gray-100 ${
                errors[field.id] ? 'border-red-400' : 'border-gray-300 dark:border-gray-700'
              }`}
            />
            {errors[field.id] && (
              <p className="mt-1 font-helvetica text-sm text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      <p className="rounded-lg border border-brand-blue/15 bg-brand-blue/5 px-4 py-3 font-helvetica-light text-[clamp(0.85rem,1vw,0.95rem)] leading-[1.5] text-gray-700 dark:text-gray-300">
        Your information is used to personalise your results, save your quiz progress, and send webinar access details.
      </p>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 font-helvetica text-[clamp(1rem,1.15vw,1.08rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
      >
        Continue to assessment
        <ArrowIcon />
      </button>
    </form>
  );
}

function QuestionStep({
  question,
  questionIndex,
  answers,
  onSingleSelect,
  onMultiToggle,
  onBack,
  onNext,
}: {
  question: QuizQuestion;
  questionIndex: number;
  answers: QuizAnswers;
  onSingleSelect: (id: SingleChoiceQuestionId, points: number) => void;
  onMultiToggle: (option: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const progress = questionIndex + 1;
  const total = quizQuestions.length;
  const selectedSingle = question.type === 'single' ? answers[question.id] : 0;
  const canContinue = question.type === 'single' ? selectedSingle > 0 : answers.q3.length > 0;

  return (
    <div>
      <div className="mb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-helvetica text-[0.85rem] font-medium text-gray-500 dark:text-gray-400">
            Question {progress} of {total}
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {quizQuestions.map((item, index) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index <= questionIndex ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/20'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="font-futura text-[clamp(1.55rem,3vw,2.4rem)] font-bold leading-[1.08] text-gray-900 dark:text-white">
          {question.question}
        </h3>
        {question.type === 'multi' && (
          <p className="mt-2 font-helvetica-light text-gray-600 dark:text-gray-400">Select all that apply.</p>
        )}
      </div>

      <div className="mb-7 space-y-3">
        {question.type === 'single'
          ? question.options.map((option) => {
              const isSelected = selectedSingle === option.points;
              return (
                <button
                  key={option.points}
                  type="button"
                  onClick={() => onSingleSelect(question.id, option.points)}
                  className={`group w-full rounded-lg border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10 shadow-[0_8px_24px_rgba(0,123,255,0.12)]'
                      : 'border-gray-200 bg-white/80 hover:border-brand-blue/60 hover:bg-white dark:border-gray-800 dark:bg-gray-950/50'
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-helvetica text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.45] text-gray-800 dark:text-gray-200">
                      {option.text}
                    </span>
                    <span
                      className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full border transition-colors ${
                        isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-gray-300 text-transparent'
                      }`}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              );
            })
          : question.options.map((option) => {
              const isSelected = answers.q3.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onMultiToggle(option)}
                  className={`group w-full rounded-lg border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue/10 shadow-[0_8px_24px_rgba(0,123,255,0.12)]'
                      : 'border-gray-200 bg-white/80 hover:border-brand-blue/60 hover:bg-white dark:border-gray-800 dark:bg-gray-950/50'
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-helvetica text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.45] text-gray-800 dark:text-gray-200">
                      {option}
                    </span>
                    <span
                      className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded border transition-colors ${
                        isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-gray-300 text-transparent'
                      }`}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              );
            })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-helvetica font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {questionIndex === total - 1 ? 'Calculate my score' : 'Next question'}
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function CalculatingStep() {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto mb-7 grid h-20 w-20 place-items-center rounded-full border-8 border-brand-blue/15">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-blue border-t-transparent" />
      </div>
      <h3 className="font-futura text-[clamp(1.8rem,3vw,2.7rem)] font-bold text-gray-900 dark:text-white">
        Analysing your answers...
      </h3>
      <p className="mx-auto mt-4 max-w-2xl font-helvetica-light text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.55] text-gray-700 dark:text-gray-300">
        Identifying bottlenecks, growth levers, and your clarity score.
      </p>
      <div className="mx-auto mt-8 h-2 max-w-md overflow-hidden rounded-full bg-brand-blue/15">
        <motion.div
          className="h-full rounded-full bg-brand-blue"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

function ResultsStep({
  score,
  submitError,
}: {
  score: number;
  submitError: string | null;
}) {
  const tier = getTierFromScore(score);
  const content = tierContent[tier];

  return (
    <div>
      <div className="mb-7 text-center">
        <p className="mx-auto mb-4 inline-flex rounded-full bg-brand-blue px-5 py-2 font-helvetica font-semibold text-white">
          Your Score: {score}/24
        </p>
        <h3 className="mx-auto max-w-3xl font-futura text-[clamp(1.75rem,3vw,2.7rem)] font-bold leading-[1.08] text-brand-blue">
          {content.headline}
        </h3>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white/85 p-5 dark:border-gray-800 dark:bg-gray-950/50">
          <h4 className="font-futura text-xl font-bold text-gray-900 dark:text-white">Summary</h4>
          <p className="mt-3 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
            {content.summary}
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-gray-200 bg-white/85 p-5 dark:border-gray-800 dark:bg-gray-950/50">
            <h4 className="font-futura text-xl font-bold text-gray-900 dark:text-white">What this means</h4>
            <ul className="mt-4 space-y-3">
              {content.meaning.map((point) => (
                <li key={point} className="flex gap-3 font-helvetica-light text-gray-700 dark:text-gray-300">
                  <CheckIcon className="mt-1 h-4 w-4 flex-none text-brand-blue" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-brand-blue/25 bg-brand-blue/5 p-5">
            <h4 className="font-futura text-xl font-bold text-gray-900 dark:text-white">The opportunity</h4>
            <p className="mt-3 font-helvetica-light leading-[1.55] text-gray-700 dark:text-gray-300">
              {content.opportunity}
            </p>
            {content.opportunityPoints.length > 0 && (
              <ul className="mt-4 space-y-3">
                {content.opportunityPoints.map((point) => (
                  <li key={point} className="flex gap-3 font-helvetica-light text-gray-700 dark:text-gray-300">
                    <CheckIcon className="mt-1 h-4 w-4 flex-none text-brand-blue" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <section className="rounded-lg bg-brand-blue p-5 text-white" data-cursor-theme="light">
          <h4 className="font-futura text-xl font-bold">Next step: book your webinar time</h4>
          <p className="mt-3 font-helvetica-light leading-[1.55] text-white/90">{content.nextStep}</p>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-helvetica font-medium text-brand-blue transition-colors hover:bg-gray-100"
          >
            Book webinar time
            <ArrowIcon />
          </a>
        </section>

        {submitError && (
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 font-helvetica text-sm leading-[1.5] text-amber-800">
            Your result is ready, but we could not send/save the submission automatically. Please use the booking link above and contact us if needed.
          </p>
        )}
      </div>
    </div>
  );
}

export default function WebinarQuizModal({ isOpen, onClose }: WebinarQuizModalProps) {
  const [screen, setScreen] = useState<QuizScreen>('registration');
  const [contact, setContact] = useState<QuizContact>(initialContact);
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof QuizContact, string>>>({});
  const [answers, setAnswers] = useState<QuizAnswers>(emptyQuizAnswers);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const score = useMemo(() => calculateTotalScore(answers), [answers]);
  const currentQuestion = quizQuestions[questionIndex];

  useEffect(() => {
    if (!isOpen) return;

    setSessionId((current) => current || createSessionId());
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || screen !== 'calculating' || !sessionId) return;

    const timeout = window.setTimeout(() => {
      const tier = getTierFromScore(score);

      persistQuizSession({
        sessionId,
        status: 'submitted',
        contact,
        answers,
        score,
        stage: tier,
        currentStep: quizQuestions.length + 1,
      })
        .catch((error: unknown) => {
          console.error('Quiz submit failed:', error);
          setSubmitError(error instanceof Error ? error.message : 'Submission failed');
        })
        .finally(() => setScreen('results'));
    }, 1850);

    return () => window.clearTimeout(timeout);
  }, [answers, contact, isOpen, score, screen, sessionId]);

  const saveDraft = (nextAnswers: QuizAnswers, nextStep: number) => {
    if (!sessionId) return;

    persistQuizSession({
      sessionId,
      status: 'draft',
      contact,
      answers: nextAnswers,
      score: null,
      stage: null,
      currentStep: nextStep,
    }).catch((error: unknown) => {
      console.error('Quiz draft save failed:', error);
    });
  };

  const resetAndClose = () => {
    onClose();
    window.setTimeout(() => {
      setScreen('registration');
      setContact(initialContact);
      setContactErrors({});
      setAnswers(emptyQuizAnswers);
      setQuestionIndex(0);
      setSessionId('');
      setSubmitError(null);
    }, 220);
  };

  const handleContactChange = (field: keyof QuizContact, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
    setContactErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof QuizContact, string>> = {};
    if (!contact.name.trim()) nextErrors.name = 'Please enter your name';
    if (!contact.business.trim()) nextErrors.business = 'Please enter your business name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!contact.phone.trim()) nextErrors.phone = 'Please enter your phone number';

    if (Object.keys(nextErrors).length > 0) {
      setContactErrors(nextErrors);
      return;
    }

    const id = sessionId || createSessionId();
    setSessionId(id);
    setScreen('question');

    persistQuizSession({
      sessionId: id,
      status: 'draft',
      contact,
      answers,
      score: null,
      stage: null,
      currentStep: 1,
    }).catch((error: unknown) => {
      console.error('Quiz registration save failed:', error);
    });
  };

  const handleSingleSelect = (id: SingleChoiceQuestionId, points: number) => {
    setAnswers((current) => ({ ...current, [id]: points }));
  };

  const handleMultiToggle = (option: string) => {
    setAnswers((current) => {
      const selected = current.q3.includes(option);
      return {
        ...current,
        q3: selected ? current.q3.filter((item) => item !== option) : [...current.q3, option],
      };
    });
  };

  const handleBack = () => {
    if (questionIndex === 0) {
      setScreen('registration');
      return;
    }

    setQuestionIndex((current) => current - 1);
  };

  const handleNext = () => {
    saveDraft(answers, questionIndex + 2);

    if (questionIndex >= quizQuestions.length - 1) {
      setScreen('calculating');
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1300] flex items-center justify-center bg-gray-950/65 px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
          aria-label="Marketing clarity score registration"
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 dot-grid-premium opacity-60 dark:opacity-15" aria-hidden="true" />
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-white/90 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950/90 dark:text-gray-200 dark:hover:bg-gray-900"
              aria-label="Close quiz"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative max-h-[88vh] overflow-y-auto p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${screen}-${questionIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18 }}
                >
                  {screen === 'registration' && (
                    <RegistrationStep
                      contact={contact}
                      errors={contactErrors}
                      onChange={handleContactChange}
                      onSubmit={handleRegistrationSubmit}
                    />
                  )}

                  {screen === 'question' && currentQuestion && (
                    <QuestionStep
                      question={currentQuestion}
                      questionIndex={questionIndex}
                      answers={answers}
                      onSingleSelect={handleSingleSelect}
                      onMultiToggle={handleMultiToggle}
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  )}

                  {screen === 'calculating' && <CalculatingStep />}

                  {screen === 'results' && <ResultsStep score={score} submitError={submitError} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
