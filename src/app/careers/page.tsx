import Container from '@/components/Container';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import Image from 'next/image';
import Link from 'next/link';

const principles = [
  'Student-friendly employer',
  'Learning & upskilling first',
  'Remote work options*',
];

const differentiators = [
  {
    number: '01',
    title: 'Student-Friendly Focus',
    body: 'With a close relationship with Strathclyde University in Glasgow, our team prioritises student employability, upskilling, and training. We design opportunities around academic schedules, not against them.',
    note: 'Training is structured to improve confidence, commercial awareness, and employability while supporting your studies.',
  },
  {
    number: '02',
    title: 'Relationship-Focused Work',
    body: 'We put a strong team focus and good client outcomes ahead of chasing profit at any cost. The work is built around connection, mentorship, and helping each other produce better results.',
    note: 'Wins are shared properly, and people are encouraged to ask questions, learn quickly, and grow into responsibility.',
  },
  {
    number: '03',
    title: 'Student Micro-Internships',
    body: 'Our 100-hour training course helps students develop practical skills for working with businesses, then connects that learning to Consultico-supported micro-internship opportunities.',
    note: 'The goal is useful experience: real projects, clearer skills, and a stronger story to take into your next role.',
  },
];

const benefits = [
  {
    title: 'Training & Development',
    body: 'Structured upskilling, mentorship, and practical learning for people building commercial confidence.',
  },
  {
    title: 'Career Progression',
    body: 'Clearer routes to develop your judgement, take on responsibility, and prepare for the next opportunity.',
  },
  {
    title: 'Performance Rewards',
    body: 'Good work is noticed, celebrated, and rewarded as the team and client outcomes improve.',
  },
  {
    title: 'Student-Friendly Schedules',
    body: 'Flexible thinking around studies, commitments, and the realities of developing early-career talent.',
  },
  {
    title: 'Real Client Context',
    body: 'Work close to live marketing problems instead of only theory, templates, or isolated training exercises.',
  },
  {
    title: 'Supportive Team Culture',
    body: 'A small-team environment where asking questions, learning fast, and helping each other are part of the job.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Apply',
    body: 'When positions open, send us the basics and tell us what kind of work you want to grow into.',
  },
  {
    number: '2',
    title: 'Initial Chat',
    body: 'We talk through your goals, experience, availability, and what support would help you do good work.',
  },
  {
    number: '3',
    title: 'Practical Fit',
    body: 'For some roles, we use a small task or working conversation to understand how you think.',
  },
  {
    number: '4',
    title: 'Start Well',
    body: 'If it is a good match, we make the first steps clear so you can join with confidence.',
  },
];

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

const CheckIcon = () => (
  <svg
    className="mt-1 h-4 w-4 flex-none text-brand-blue"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function CareersPage() {
  return (
    <main className="relative">
      <section className="relative min-h-screen overflow-hidden pb-16 md:pb-20 lg:pb-0">
        <ServiceDesktopHeader />
        <div className="absolute inset-0 dot-grid-premium opacity-70 dark:opacity-25" aria-hidden="true" />
        <Container className="relative pt-[10.5rem] md:pt-[12rem] lg:min-h-screen lg:pt-[13.5rem] xl:pt-[14.5rem] 2xl:pt-[15rem] lg:pb-20 lg:flex lg:items-start">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1.08fr)] lg:items-start lg:gap-12 xl:gap-14">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/25 bg-white/80 px-4 py-2 text-[0.78rem] font-helvetica font-semibold uppercase tracking-[0.14em] text-brand-blue shadow-sm dark:bg-gray-950/75">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                Careers
              </div>

              <h1 className="max-w-[48rem] font-futura text-[clamp(2.2rem,3.25vw,4rem)] font-bold leading-[1.04] text-gray-900 dark:text-white">
                <span className="block">A career where</span>
                <span className="block">
                  you <span className="text-brand-blue">make real impact</span>
                </span>
                <span className="block">and grow daily.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1rem,1.45vw,1.3rem)] leading-[1.65] text-gray-800 dark:text-gray-200 font-helvetica-light">
                Join a team that values your growth, celebrates your wins, and gives you the autonomy to do your best work.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#open-positions"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-3 text-[clamp(1rem,1.15vw,1.1rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  View Open Positions
                  <ArrowIcon />
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="border-l-2 border-brand-blue bg-white/65 px-4 py-3 shadow-sm dark:bg-gray-950/55"
                  >
                    <p className="text-[clamp(0.9rem,1vw,1rem)] leading-[1.35] text-gray-700 dark:text-gray-200 font-helvetica">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 max-w-3xl border-l-2 border-brand-blue bg-white/70 px-5 py-4 shadow-sm dark:bg-gray-950/50">
                <p className="text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.55] text-gray-800 dark:text-gray-200 font-helvetica">
                  Championing student employability since 2024.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-[90%] max-w-2xl lg:mt-[4.45rem] lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2rem] border border-brand-blue/10 bg-brand-blue/5 dark:bg-brand-blue/10" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-gray-200 bg-white p-3 shadow-xl shadow-brand-blue/10 dark:border-gray-800 dark:bg-gray-950">
                <Image
                  src="/careers/team.png"
                  alt="Consultico team working together"
                  width={1460}
                  height={1090}
                  priority
                  className="h-auto w-full rounded-[1rem] object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-gray-100 py-8 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-blue" />
                <p className="font-helvetica text-[clamp(1rem,1.25vw,1.18rem)] font-semibold">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mb-12 max-w-4xl">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              What makes us different
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              A workplace built around learning, relationships, and useful experience.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {differentiators.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-lg border border-gray-200 bg-white/85 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/75"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="font-futura text-[clamp(2rem,3vw,3.25rem)] font-bold leading-none text-brand-blue">
                    {item.number}
                  </span>
                  <span className="h-px flex-1 bg-brand-blue/20" />
                </div>
                <h3 className="font-futura text-[clamp(1.35rem,1.8vw,1.8rem)] font-bold leading-[1.1] text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-[clamp(0.98rem,1.1vw,1.06rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  {item.body}
                </p>
                <div className="mt-auto border-l-2 border-brand-blue bg-brand-blue/5 px-4 py-3 dark:bg-brand-blue/10">
                  <p className="text-[clamp(0.92rem,1vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                    {item.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-gray-50 py-16 dark:bg-gray-950/45 md:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
            <div>
              <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Why work with us
              </p>
              <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
                Grow your skills in a team that wants you to get better.
              </h2>
              <p className="mt-6 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
                Consultico is small enough for your contribution to matter and structured enough to give early-career people the support they need to develop.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-lg border border-gray-200 bg-white/90 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <CheckIcon />
                    <h3 className="font-futura text-[clamp(1.1rem,1.35vw,1.32rem)] font-bold leading-[1.2] text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-[clamp(0.95rem,1.05vw,1rem)] leading-[1.55] text-gray-700 dark:text-gray-300 font-helvetica-light">
                    {benefit.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="open-positions" className="relative py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Open positions
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05] text-gray-900 dark:text-white">
              No current roles are open.
            </h2>
            <p className="mt-5 text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.65] text-gray-700 dark:text-gray-300 font-helvetica-light">
              We are not actively hiring right now, but this page will be updated when new opportunities become available.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-brand-blue/20 bg-brand-blue/5 p-6 text-center shadow-sm dark:bg-brand-blue/10">
            <p className="font-helvetica text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.55] text-gray-800 dark:text-gray-200">
              Interested in future opportunities? You can still reach us through the contact form and tell us what kind of work you are looking for.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-[clamp(0.98rem,1.08vw,1.05rem)] font-helvetica font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            >
              Contact the Team
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section className="relative bg-gray-950 py-16 text-white md:py-20 lg:py-24" data-cursor-theme="light">
        <Container>
          <div className="mb-12 max-w-4xl">
            <p className="mb-3 text-[0.8rem] font-helvetica font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Application process
            </p>
            <h2 className="font-futura text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.05]">
              Straightforward, human, and designed to find the right fit.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-futura text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="font-futura text-[clamp(1.2rem,1.5vw,1.45rem)] font-bold leading-[1.15]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[clamp(0.92rem,1vw,1rem)] leading-[1.55] text-gray-300 font-helvetica-light">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
