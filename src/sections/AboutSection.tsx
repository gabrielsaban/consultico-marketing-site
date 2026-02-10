'use client';

// ARCHIVED: Full about section content moved to src/a_sections/AboutSection_archived.tsx

import Container from '@/components/Container';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  cvLink: string;
}

interface PhilosophyPoint {
  title: string;
  description: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 2, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 3, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 4, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 5, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 6, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 7, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
  { id: 8, name: 'Name Placeholder', role: 'Role Title', cvLink: '#' },
];

const philosophyPoints: PhilosophyPoint[] = [
  {
    title: 'No Guesswork',
    description: "We don't rely on gut feeling or hope. If something isn't working, we say so.",
    icon: 'target',
  },
  {
    title: 'Clarity Before Execution',
    description: 'We believe marketing should be structured from the ground up, not patched together after the fact.',
    icon: 'blueprint',
  },
  {
    title: 'Built To Carry Weight',
    description: 'Everything we create is designed to carry meaning, not just look good.',
    icon: 'weight',
  },
  {
    title: 'No Templates Or Shortcuts',
    description: 'Every strategy is custom-built. No copy-paste solutions or borrowed frameworks.',
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

export default function AboutSection(): React.JSX.Element {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container>
        {/* Intro */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura mb-8">
            About Consultico
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica">
              In business, very few teams can afford a full in-house marketing department - that&apos;s where we come in.
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200 font-helvetica">
              We act as a strategy-led marketing partner, helping brands cut through saturated markets with clarity, structure, and intent.
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {philosophyPoints.map((point) => (
              <div key={point.title} className="flex gap-4">
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
              </div>
            ))}
          </div>
        </div>

        {/* Visual Pause - Noise Context */}
        <div className="mb-20 md:mb-28 lg:mb-32 py-16 md:py-20 lg:py-24">
          <div className="flex items-center gap-6 mb-2">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-black to-black dark:via-gray-600 dark:to-gray-600" />
            <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica text-center max-w-4xl whitespace-nowrap">
              The average person sees thousands of brands every day.
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-black to-black dark:via-gray-600 dark:to-gray-600" />
          </div>
          <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-gray-800 dark:text-gray-200 font-helvetica text-center mb-6">
            Most are forgotten instantly.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-brand-blue" />
            <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-brand-blue font-helvetica font-medium text-center max-w-4xl whitespace-nowrap">
              <b>We exist to make sure yours isn&apos;t.</b>
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-brand-blue to-brand-blue" />
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_auto] gap-12 lg:gap-16">
          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col"
              >
                {/* Profile Picture Placeholder */}
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800" />
                
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

          {/* Team Description */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-brand-blue font-futura mb-6">
                Our Team
              </h3>
              <div className="space-y-4 mb-8">
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica">
                  We build our work around sharp, digitally-native thinkers who understand modern platforms instinctively.
                </p>
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  Many of our team are students — not because they&apos;re cheap or inexperienced, but because they&apos;re closest to how audiences actually behave today and are guided by skilled oversight.
                </p>
                <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica-light">
                  We trust their thinking, give them real responsibility, and hold all work to the same strategic standard.
                </p>
              </div>
            </div>

            <motion.button
              className="bg-brand-blue text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 self-start"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore open positions
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}
