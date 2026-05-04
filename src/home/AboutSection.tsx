'use client';

// ARCHIVED: Full about section content moved to archive/sections/AboutSection_archived.tsx

import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  cvLink: string;
  image?: string;
}

interface PhilosophyPoint {
  title: string;
  description: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Paul Wilson', role: 'Founder', cvLink: '#', image: '/team/paul_wilson.avif' },
  { id: 2, name: 'Connor Brooks', role: 'Brand Manager', cvLink: '#', image: '/team/connor_brooks.avif' },
  { id: 3, name: 'Leona Wade', role: 'Associate', cvLink: '#', image: '/team/leona_wade.avif' },
  { id: 4, name: 'Chloe Chan', role: 'Associate', cvLink: '#', image: '/team/chloe_chan.avif' },
  { id: 5, name: 'Zsa Zsa Kerr-Bennie', role: 'Assistant', cvLink: '#' },
  { id: 6, name: 'Lucy Dinse', role: 'Assistant', cvLink: '#' },
  { id: 7, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 8, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
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
        width={420}
        height={420}
        className="h-full w-full object-cover"
        sizes="(min-width: 768px) 18vw, 46vw"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
      <span className="font-futura text-[clamp(2rem,6vw,3.5rem)] font-bold text-brand-blue/45">
        {member.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)}
      </span>
    </div>
  );
};

export default function AboutSection(): React.JSX.Element {
  const teamScrollerRef = useRef<HTMLDivElement | null>(null);
  const [teamPage, setTeamPage] = useState(0);

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
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="w-full aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <TeamPortrait member={member} />
                </div>
                
                {/* Info Section */}
                <div className="p-3 md:p-4 flex-grow flex flex-col justify-end">
                  <h3 className="font-futura font-bold text-[clamp(0.875rem,1.1vw,1rem)] text-brand-blue mb-1">
                    {member.name}
                  </h3>
                  <p className="font-helvetica-light text-[clamp(0.75rem,0.9vw,0.875rem)] text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
                
                {/* CV/Portfolio Link Icon */}
                <Link
                  href={member.cvLink}
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
                </Link>
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
                        <div className="w-full aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                          <TeamPortrait member={member} />
                        </div>
                        <div className="p-3 flex-grow flex flex-col justify-end">
                          <h3 className="font-futura font-bold text-[clamp(0.875rem,3.8vw,1rem)] text-brand-blue mb-1">
                            {member.name}
                          </h3>
                          <p className="font-helvetica-light text-[clamp(0.75rem,3vw,0.875rem)] text-gray-600 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                        <Link
                          href={member.cvLink}
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
                        </Link>
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
      </Container>
    </section>
  );
}
