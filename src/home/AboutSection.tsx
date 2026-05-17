'use client';

// ARCHIVED: Full about section content moved to archive/sections/AboutSection_archived.tsx

import Container from '@/components/Container';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  cvLink: string;
  image?: string;
  portraitPosition?: string;
  portraitScale?: number;
  location?: string;
  bio?: string[];
  credentials?: string[];
  linkedIn?: string;
}

interface PhilosophyPoint {
  title: string;
  description: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Paul Wilson',
    role: 'Founder',
    cvLink: '#',
    image: '/team/paul_wilson.png',
    portraitScale: 1.18,
    location: 'Glasgow, Scotland',
    bio: [
      'Paul Wilson is the founder of Consultico, a strategy-led digital marketing consultancy based in Glasgow. He has been building websites since 2017 and studied marketing at the University of Strathclyde before launching Consultico while still a student.',
      'In 2025, Paul was awarded a fellowship from the University of Strathclyde Inspire accelerator programme, funding research and development into the Think First Workshop. He brings experience across marketing strategy, web development, and brand growth to client work.',
    ],
    credentials: [
      'Certified by the Market Research Society',
      'University of Strathclyde fellowship recipient, 2025',
      'Finalist, Undergraduate of the Year Awards, 2023',
      'Agency experience with Blue Economy Agency, San Francisco',
    ],
    linkedIn: 'https://www.linkedin.com/in/think-first-marketing',
  },
  {
    id: 3,
    name: 'Leona Wade',
    role: 'Account Manager',
    cvLink: '#',
    image: '/team/leona_wade.png',
    portraitScale: 1.36,
    location: 'United Kingdom',
    bio: [
      'Leona Wade is an Account Manager at Consultico with over a year of experience across the business. She joined as a technical marketing assistant, working across SEO, social media, and marketing strategy projects, before moving into a central Client Success role.',
      "Leona graduated in Marketing and Entrepreneurship from the University of Strathclyde and has completed additional courses in SEO and Google Advertising. She manages Consultico's portfolio of client companies and acts as a key point of contact across the partner network.",
    ],
    credentials: [
      'BA in Marketing and Entrepreneurship, University of Strathclyde',
      'Certified in SEO and Google Advertising',
      'Client work with The Boiler Co, Tiny Changes, Strathclyde Inspire, and Scotia Biotech',
    ],
  },
  {
    id: 6,
    name: 'Lucy Dinse',
    role: 'Lead Beta Tester',
    cvLink: '#',
    location: 'Glasgow, Scotland',
    bio: [
      "Lucy Dinse has been part of the Consultico team for over a year, joining as an intern and growing into one of the most active members of the internship programme. She has completed training across personal development and technical marketing skills.",
      "Lucy is currently a student at the University of Strathclyde and serves as Lead Beta Tester for Consultico's student internship programme, helping shape how the programme is structured and delivered for future interns.",
    ],
    credentials: [
      'Current student, University of Strathclyde',
      'Completed training in personal development and technical marketing',
      'Lead Beta Tester, Consultico Student Internship Programme',
    ],
  },
  {
    id: 7,
    name: 'Juan Canals Marti',
    role: 'Senior Meta Analytics Partner',
    cvLink: '#',
    image: '/team/juan_canals_marti.png',
    portraitScale: 1.36,
    location: 'United Kingdom',
    bio: [
      'Juan Canals Marti is the founder of Marti Clearpath Ltd, a performance-driven social media marketing agency, and serves as Senior Meta Analytics Partner at Consultico. He holds a BSc in Mathematics and Economics, shaping his data-led approach to paid media and strategy.',
      'Juan works across Meta advertising, content strategy, marketing automation, and Generative Engine Optimisation. He oversees the paid media lifecycle from funnel architecture and creative strategy through to feed enrichment, catalogue segmentation, and conversion tracking.',
    ],
    credentials: [
      'BSc in Mathematics and Economics',
      'Founder, Marti Clearpath Ltd',
      'Notable clients include American Life Investment, BB Insurance, and Unmissable Ventures',
      'Specialisms include Meta advertising, funnel architecture, marketing automation, and GEO',
    ],
  },
];

const teamPages = teamMembers.reduce<TeamMember[][]>((pages, member, index) => {
  const pageIndex = Math.floor(index / 4);
  if (!pages[pageIndex]) pages[pageIndex] = [];
  pages[pageIndex].push(member);
  return pages;
}, []);

const philosophyPoints: PhilosophyPoint[] = [
  {
    title: 'No Guesswork',
    description: "Every recommendation is backed by data. We track and report everything we do, so you always know what's working and what isn't.",
    icon: 'target',
  },
  {
    title: 'Clarity Before Execution',
    description: 'We believe marketing should be structured from the ground up, not patched together after the fact.',
    icon: 'blueprint',
  },
  {
    title: 'Your Own Dedicated Account Manager',
    description: 'One person who knows your business, your goals, and is always on the other end of the phone.',
    icon: 'weight',
  },
  {
    title: 'A Proven Process',
    description: 'Every engagement runs through our in-house framework, developed and refined across real client work. Structure that works, built by us.',
    icon: 'unique',
  },
];

const PhilosophyIcon = () => {
  return (
    <svg
      className="w-8 h-8 md:w-10 md:h-10 text-brand-blue"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
};

const TeamPortrait = ({ member }: { member: TeamMember }) => {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        fill
        quality={90}
        className="object-cover"
        sizes="(min-width: 1024px) 320px, (min-width: 768px) 25vw, 50vw"
        style={{
          objectPosition: member.portraitPosition ?? 'center center',
          transform: `scale(${member.portraitScale ?? 1.12})`,
        }}
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
      <span className="font-futura text-[clamp(2rem,6vw,3.5rem)] font-bold text-brand-blue/45">
        {member.name
          ? member.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
          : null}
      </span>
    </div>
  );
};

const TeamCvButton = ({
  member,
  onSelect,
}: {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}) => {
  if (!member.bio) return null;

  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('consultico:team-modal', { detail: { open: true } }));
        onSelect(member);
      }}
      className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      aria-label={`View ${member.name}'s CV`}
    >
      <svg
        className="w-4 h-4 text-brand-blue"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    </button>
  );
};

export default function AboutSection(): React.JSX.Element {
  const teamScrollerRef = useRef<HTMLDivElement | null>(null);
  const [teamPage, setTeamPage] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const closeTeamModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent('consultico:team-modal', { detail: { open: false } }));
    setSelectedMember(null);
  }, []);

  useLayoutEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTeamModal();
      }
    };

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.dispatchEvent(new CustomEvent('consultico:team-modal', { detail: { open: false } }));
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeTeamModal, selectedMember]);

  const handleTeamScroll = () => {
    const scroller = teamScrollerRef.current;
    if (!scroller) return;
    const nextPage = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setTeamPage(nextPage);
  };

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container>
        {/* Intro */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura mb-8">
            Built around brands
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica">
              In the summer of 2025, Consultico was awarded a fellowship from the University of Strathclyde. Over the following six months, everything from that fellowship went into researching and developing the Think First Workshop - drawing on data across hundreds of B2C businesses. The result is a service that makes quality marketing strategy accessible, consistently reliable, and fully understood. Consultico has been operating since February 2024.
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica">
              We run a full-service marketing agency - building websites, optimising for search, and running paid advertising. Our team is fully equipped to help you reach your goals. This ecosystem works together to give you clear insight into exactly where your budget and time will have the most impact.
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {philosophyPoints.map((point) => (
              <motion.div
                key={point.title}
                className="flex gap-4"
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                }}
              >
                <div className="flex-shrink-0">
                  <PhilosophyIcon />
                </div>
                <div>
                  <h4 className="font-futura font-bold text-[clamp(1.125rem,1.4vw,1.35rem)] text-brand-blue mb-2">
                    {point.title}
                  </h4>
                  <p className="text-[clamp(0.95rem,1.1vw,1.25rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visual Pause - Noise Context */}
        <motion.div
          className="mb-20 md:mb-28 lg:mb-32 py-16 md:py-20 lg:py-24"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.25 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 min-[600px]:gap-6 mb-2"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-black to-black dark:via-gray-600 dark:to-gray-600" />
            <p className="text-[clamp(0.78rem,3.2vw,1.75rem)] min-[600px]:text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica text-center max-w-4xl whitespace-nowrap">
              The average person sees thousands of brands every day.
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-black to-black dark:via-gray-600 dark:to-gray-600" />
          </motion.div>
          <motion.p
            className="text-[clamp(0.78rem,3.2vw,1.75rem)] min-[600px]:text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica text-center mb-6"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            Most are forgotten instantly.
          </motion.p>
          <motion.div
            className="flex items-center gap-2 min-[600px]:gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
          >
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-brand-blue" />
            <p className="text-[clamp(0.78rem,3.2vw,1.75rem)] min-[600px]:text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-brand-blue font-helvetica font-medium text-center max-w-4xl whitespace-nowrap">
              <b>We exist to make sure yours isn&apos;t.</b>
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-brand-blue to-brand-blue" />
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_auto] gap-12 lg:gap-16">
          {/* Team Grid */}
          <div className="hidden self-start md:grid md:grid-cols-4 items-start gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <TeamPortrait member={member} />
                </div>
                
                {/* Info Section */}
                <div className="p-3 md:p-4">
                  <h3 className="font-futura font-bold text-[clamp(0.875rem,1.1vw,1rem)] text-brand-blue mb-1">
                    {member.name}
                  </h3>
                  <p className="font-helvetica-light text-[clamp(0.75rem,0.9vw,0.875rem)] text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
                
                {/* CV/Portfolio Link Icon */}
                <TeamCvButton member={member} onSelect={setSelectedMember} />
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <div
              ref={teamScrollerRef}
              onScroll={handleTeamScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {teamPages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full flex-none snap-start px-1">
                  <div className="grid grid-cols-2 gap-4">
                    {page.map((member) => (
                      <div
                        key={member.id}
                        className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col"
                      >
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                          <TeamPortrait member={member} />
                        </div>
                        <div className="p-3">
                          <h3 className="font-futura font-bold text-[clamp(0.875rem,3.8vw,1rem)] text-brand-blue mb-1">
                            {member.name}
                          </h3>
                          <p className="font-helvetica-light text-[clamp(0.75rem,3vw,0.875rem)] text-gray-600 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                        <TeamCvButton member={member} onSelect={setSelectedMember} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {teamPages.length > 1 && (
              <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
                {teamPages.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      teamPage === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Team Description */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-brand-blue font-futura mb-6">
                Our Team
              </h3>
              <div className="space-y-4 mb-8">
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica">
                  We prioritise talent over tenure. Our team combines fresh digital thinking with experienced strategic oversight - including advisors who have built and scaled brands across a range of industries. Every piece of work is held to the same standard, regardless of who produces it.
                </p>
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  Click on any team member to learn more about their background, what they specialise in, and how they contribute to your work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {selectedMember && (
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black/55 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-cv-title"
            onClick={closeTeamModal}
            onWheel={(event) => event.preventDefault()}
            onTouchMove={(event) => event.preventDefault()}
          >
            <motion.div
              className="relative max-h-[min(86vh,46rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-950 sm:p-8"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              onWheel={(event) => event.stopPropagation()}
              onTouchMove={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeTeamModal}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-gray-800 dark:text-gray-400"
                aria-label="Close CV"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>

              <div className="pr-10">
                <p className="mb-2 font-helvetica text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  {selectedMember.location}
                </p>
                <h3 id="team-cv-title" className="font-futura text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight text-brand-blue">
                  {selectedMember.name}
                </h3>
                <p className="mt-2 font-helvetica text-[clamp(1rem,1.2vw,1.12rem)] text-gray-600 dark:text-gray-300">
                  {selectedMember.role}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {selectedMember.bio?.map((paragraph) => (
                  <p key={paragraph} className="font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedMember.credentials && (
                <div className="mt-7 border-t border-gray-200 pt-6 dark:border-gray-800">
                  <h4 className="font-futura text-[clamp(1.1rem,1.4vw,1.3rem)] font-bold text-brand-blue">
                    Credentials & Notable Work
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {selectedMember.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="relative pl-5 font-helvetica text-[clamp(0.9rem,1vw,1rem)] leading-[1.5] text-gray-700 before:absolute before:left-0 before:text-brand-blue before:content-['•'] dark:text-gray-300"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMember.linkedIn && (
                <a
                  href={selectedMember.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center justify-center rounded-lg bg-brand-blue px-5 py-2.5 font-helvetica text-[clamp(0.9rem,1vw,1rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  LinkedIn
                </a>
              )}
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
