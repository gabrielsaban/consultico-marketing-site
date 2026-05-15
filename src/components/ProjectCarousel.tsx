'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
  detail: string;
  results?: string[];
  proofPoints?: {
    value: string;
    label: string;
    detail: string;
  }[];
  caseSections?: {
    title: string;
    body: string;
  }[];
  resultCards?: {
    value: string;
    label: string;
    title: string;
    body: string;
  }[];
  testimonial?: {
    quote: string;
    attribution: string;
  };
  pdfHref?: string;
  pdfLabel?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'The Boiler Co.',
    description: 'An SEO foundation that kept a trades business visible, busy, and less dependent on paid advertising.',
    image: '/projects/boiler.avif',
    category: 'SEO - 14+ months',
    tags: ['SEO', 'Lead generation', 'Retained client'],
    metric: '21,000',
    metricLabel: 'weekly impressions',
    detail: "The Boiler Co is a trades business where a full calendar is everything. With an average job value of £1,200 and a team to keep busy, inconsistent lead flow isn't just an inconvenience - it threatens the whole operation. Since working with Consultico, the team has grown - a sign of a business that's now able to take on more work consistently.",
    proofPoints: [
      {
        value: '21,000',
        label: 'Weekly impressions',
        detail: 'In terms of search performance, a typical week when we started showed around 6,000 impressions. After consistent work, that moved to 21,000 impressions.',
      },
      {
        value: '3x',
        label: 'Click growth',
        detail: 'A typical week when we started showed around 20 clicks. After consistent work, that moved to 58 clicks per week.',
      },
      {
        value: '14+',
        label: 'Months retained',
        detail: "The Boiler Co have now been a retained SEO client for over 14 months. They've since returned for additional website work.",
      },
      {
        value: '3',
        label: 'Months to results',
        detail: 'Within three months, The Boiler Co reported that their calendar was getting consistently filled through organic search alone.',
      },
    ],
    caseSections: [
      {
        title: 'The Situation',
        body: 'When they came to Consultico, lead generation was stalling. They were relying entirely on paid advertising, and it was becoming unpredictable. At one point, performance issues forced them to pause paid ads altogether. With no organic presence to fall back on, their diary was at the mercy of whatever their ad spend was doing on any given week.',
      },
      {
        title: 'What We Did',
        body: 'We identified SEO as the missing piece. Not as a replacement for paid - as a foundation that would keep working regardless of what happened with ad budget. We built and implemented a full SEO strategy focused on high-intent search terms - people actively looking for boiler services in their area, ready to book. Within three months, The Boiler Co reported that their calendar was getting consistently filled through organic search alone.',
      },
      {
        title: 'The Outcome',
        body: "When paid ads had to be paused, SEO kept the business running. That's the result that matters most - not a percentage uplift on a dashboard, but a team of four staying busy and a business that stopped being dependent on a single channel. In terms of search performance, a typical week when we started showed around 6,000 impressions and 20 clicks - low volume, low intent. After consistent work, that moved to 21,000 impressions and 58 clicks per week, with significantly higher intent traffic converting into booked appointments. The Boiler Co have now been a retained SEO client for over 14 months. They've since returned for additional website work. The relationship continues.",
      },
    ],
    results: [
      "They've since returned for additional website work. The relationship continues.",
      'After consistent work, weekly performance moved to 21,000 impressions and 58 clicks, with significantly higher intent traffic converting into booked appointments.',
    ],
    testimonial: {
      quote: 'After a frustrating run with agencies, this gave us genuine clarity on what to do and why it would work.',
      attribution: 'Ant Vitale, The Boiler Co',
    },
  },
  {
    id: 2,
    title: 'Garden Games Brand',
    description: 'Turning a seasonal business with one working SEO asset into a more structured marketing operation.',
    image: '/projects/garden_games.jpg',
    category: 'Website Refresh - Strategy Advisory',
    tags: ['Think First', 'Website refresh', 'SEO', 'Social media'],
    metric: '3',
    metricLabel: 'websites refreshed',
    detail: 'This UK-based brand sells American garden games into the British market. They had built genuine SEO authority on their core product keyword over several years - enough to sustain a seasonal summer sales cycle. But outside of that one ranking, there was almost nothing. No real marketing infrastructure, no social presence, no email activity.',
    proofPoints: [
      {
        value: '3',
        label: 'Websites refreshed',
        detail: 'From there, we refreshed all three of their websites as a package, tightening the user experience, improving conversion pathways, and adding new CTAs and promotions throughout.',
      },
      {
        value: '16+',
        label: 'Months retained',
        detail: 'Consultico continues to work with them as part of their ongoing marketing advisory team.',
      },
      {
        value: '4',
        label: 'Channels activated',
        detail: 'A brand that arrived with one working channel now has a proper marketing infrastructure - website, SEO, email, social, and a paid advertising pipeline in development.',
      },
      {
        value: '1',
        label: 'Think First consultation',
        detail: 'We started with a Think First consultation - getting under the hood of the business, understanding the strategy, and mapping out where the real opportunities were.',
      },
    ],
    caseSections: [
      {
        title: 'The Situation',
        body: "They had built genuine SEO authority on their core product keyword over several years - enough to sustain a seasonal summer sales cycle. But outside of that one ranking, there was almost nothing. No real marketing infrastructure, no social presence, no email activity. A couple of years of slowing sales had made it clear that a single SEO asset wasn't enough to carry the business forward. They came to Consultico through a recommendation from a previous agency, initially looking for a website refresh. What we found suggested the need for something more substantial.",
      },
      {
        title: 'What We Did',
        body: "We started with a Think First consultation - getting under the hood of the business, understanding the strategy, and mapping out where the real opportunities were. From there, we refreshed all three of their websites as a package, tightening the user experience, improving conversion pathways, and adding new CTAs and promotions throughout. We solidified their existing SEO foundations and looked at how to extend their reach beyond the one keyword they had been relying on. Their product photography was holding them back visually, so we overhauled it at minimal cost using online tools - the same quality output, without the expense of a professional shoot. We reactivated their dormant email marketing list, giving them a direct channel to existing customers they hadn't been using. A new Instagram account was launched and is now growing, with a social media strategy in development focused on awareness and community building. UGC video creative work is underway to expand reach and lay the groundwork for paid advertising when the time is right.",
      },
      {
        title: 'The Outcome',
        body: 'A brand that arrived with one working channel now has a proper marketing infrastructure - website, SEO, email, social, and a paid advertising pipeline in development. The business has moved from reactive and seasonal to structured and building. Consultico continues to work with them as part of their ongoing marketing advisory team.',
      },
    ],
    results: [
      'Client identity kept anonymous at their request.',
      'Results and case study details shared with permission.',
    ],
  },
  {
    id: 3,
    title: 'Tiny Changes',
    description: 'Organic podcast promotion and social content distribution for an Edinburgh mental health charity.',
    image: '/projects/tiny_changes_podcast.jpeg',
    category: 'Podcast Promotion - Social Media',
    tags: ['Podcast promotion', 'Content distribution', 'Organic social'],
    metric: '110k',
    metricLabel: 'Instagram views in 30 days',
    detail: 'Tiny Changes is an Edinburgh-based mental health charity. In late 2025, they completed recording a six-episode podcast series - but with the content in the can, they needed a team to handle the release and promotion. They came to Consultico through a recommendation, looking for end-to-end support getting the series out to the widest possible audience.',
    proofPoints: [
      {
        value: '110k',
        label: 'Instagram views',
        detail: 'In the first 30 days, the campaign generated over 110,000 views on Instagram alone.',
      },
      {
        value: '13k',
        label: 'Facebook reach',
        detail: 'In the first 30 days, the campaign generated over 110,000 views on Instagram alone, with an additional 13,000 reach on Facebook.',
      },
      {
        value: '140+',
        label: 'YouTube views',
        detail: 'The strongest episode hit over 140 YouTube views within 24 hours of release and continues to grow.',
      },
      {
        value: '4/6',
        label: 'Episodes released',
        detail: 'Four of the six episodes have been released so far.',
      },
    ],
    caseSections: [
      {
        title: 'The Situation',
        body: 'Tiny Changes is an Edinburgh-based mental health charity. In late 2025, they completed recording a six-episode podcast series - but with the content in the can, they needed a team to handle the release and promotion. They came to Consultico through a recommendation, looking for end-to-end support getting the series out to the widest possible audience.',
      },
      {
        title: 'What We Did',
        body: 'We took on the full release and promotion process for the series. Each episode was uploaded to Podcastics and YouTube, with captions edited by hand and descriptions written and optimised for each platform. Nothing was automated or templated - every episode was treated individually. Alongside the audio releases, we worked with the Tiny Changes team to understand what they wanted each episode to communicate, then turned the long-form content into short social media clips. These were distributed across Instagram and Facebook, with each clip crafted to work natively on the platform it was posted to. Four of the six episodes have been released so far. A TikTok rollout is in development to drive a second wave of interest and reach a new audience as the series builds momentum.',
      },
      {
        title: 'The Outcome',
        body: 'In the first 30 days, the campaign generated over 110,000 views on Instagram alone, with an additional 13,000 reach on Facebook. The strongest episode hit over 140 YouTube views within 24 hours of release and continues to grow. For a charity podcast with no existing audience on launch, these are significant numbers - built entirely through organic content strategy, with no paid promotion. The campaign is ongoing. With two episodes still to release and TikTok distribution coming, the numbers will continue to build.',
      },
    ],
    results: [
      'Client quote coming soon.',
      "Case study published with Tiny Changes' permission.",
    ],
  },
  {
    id: 4,
    title: 'Prebio Fibres',
    description: "Supporting one of the UK's first dedicated prebiotic health brands in establishing its retail presence through promotional development and testing.",
    image: '/projects/prebio.avif',
    category: 'Health & Retail',
    tags: ['Retail presence', 'Promotional testing', 'Brand launch'],
    detail: "Prebio Fibres needed to move from early brand promise into a credible retail-facing presence. The work focused on shaping promotional materials, testing positioning, and supporting a clearer commercial route into market.",
  },
  {
    id: 5,
    title: 'Drink Japan',
    description: 'A proof-of-concept campaign designed to draw the next generation of whiskey enjoyers to the luxury feel of Japanese exclusivity.',
    image: '/projects/drink_japan.avif',
    category: 'Luxury Drinks',
    tags: ['Proof of concept', 'Campaign strategy', 'Audience development'],
    detail: 'Drink Japan explored how a younger audience could be introduced to Japanese whiskey through exclusivity, atmosphere, and luxury-led campaign framing.',
  },
  {
    id: 6,
    title: 'Minecraft: In Abstract',
    description: 'A research project analysing physical brand asset placement in commonplace service spaces for a brand as recognisable as Minecraft.',
    image: '/projects/minecraft.avif',
    category: 'Brand Research',
    tags: ['Research', 'Brand placement', 'Servicescapes'],
    detail: 'This research-led project studied how recognisable brand assets behave when placed in everyday physical environments, using Minecraft as a distinctive example of modern visual memory.',
  },
  {
    id: 7,
    title: 'GTA 5: Player Preservation',
    description: "A community-facing concept Newswire dedicated to GTA 5's end-of-product preservation, designed by community coders and written by Consultico.",
    image: '/projects/gta.avif',
    category: 'Community Concept',
    tags: ['Community', 'Concept writing', 'Game preservation'],
    detail: "The GTA 5 concept project focused on community preservation: packaging a player-facing Newswire idea with language that respected the game's audience and long-running culture.",
    pdfHref: '/projects/gta.pdf',
    pdfLabel: 'Open concept PDF',
  },
  {
    id: 8,
    title: 'Hepburn Holistic',
    description: "Delivering one of Scotland's most indulgent massage studios a brand remodel package and bringing them online with a bespoke website.",
    image: '/projects/hepburn_holistic.avif',
    category: 'Brand & Web',
    tags: ['Brand remodel', 'Bespoke website', 'Local services'],
    detail: 'Hepburn Holistic needed a more polished brand presence and a website that reflected the quality of the studio experience. The project combined brand refresh work with a bespoke online presence.',
  },
];

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

function ProjectImageCard({
  project,
  onSelect,
  compact = false,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-lg"
      aria-label={`View ${project.title} project details`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-white dark:bg-gray-900 ${
          compact ? 'mb-3' : 'mb-4'
        }`}
        style={{ aspectRatio: '0.7 / 0.9' }}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes={compact ? '(max-width: 1000px) 45vw, 33vw' : '33vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gray-950/0 transition-colors duration-300 group-hover:bg-gray-950/55 group-focus-visible:bg-gray-950/55" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="font-helvetica text-[clamp(0.72rem,1vw,0.85rem)] uppercase tracking-[0.14em] text-white/75">
            {project.category}
          </p>
          {project.metric && (
            <p className="mt-2 font-futura text-[clamp(1.3rem,2vw,1.9rem)] leading-none text-white">
              {project.metric}
            </p>
          )}
          <p className="mt-2 font-helvetica text-[clamp(0.85rem,1vw,1rem)] font-medium text-white">
            View project
          </p>
        </div>
      </div>
    </button>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: true } }));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent('consultico:project-modal', { detail: { open: false } }));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
        >
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-950"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 bg-white/82 dark:bg-gray-950/86" />
            </div>

            <div
              className="relative grid max-h-[86vh] overflow-y-auto lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              onWheel={(event) => event.stopPropagation()}
              onTouchMove={(event) => event.stopPropagation()}
            >
              <div className="relative min-h-[18rem] lg:min-h-full">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gray-950/25" />
              </div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gray-300 bg-white/85 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/85 dark:text-gray-200 dark:hover:bg-gray-800"
                  aria-label="Close project details"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <p className="mb-3 font-helvetica text-[clamp(0.75rem,1vw,0.9rem)] uppercase tracking-[0.16em] text-brand-blue">
                  {project.category}
                </p>
                <h3
                  id="project-detail-title"
                  className="mb-4 max-w-[16ch] font-futura text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-brand-blue"
                >
                  {project.title}
                </h3>
                <p className="mb-6 font-helvetica text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                  {project.description}
                </p>

                {project.metric && (
                  <div className="mb-6 border-l-2 border-brand-blue pl-4">
                    <p className="font-futura text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-brand-blue">
                      {project.metric}
                    </p>
                    <p className="mt-2 font-helvetica text-[clamp(0.9rem,1vw,1rem)] text-gray-700 dark:text-gray-300">
                      {project.metricLabel}
                    </p>
                  </div>
                )}

                <p className="mb-6 font-helvetica-light text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.65] text-gray-700 dark:text-gray-300">
                  {project.detail}
                </p>

                {project.proofPoints && (
                  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.proofPoints.map((point) => (
                      <div
                        key={`${project.id}-${point.label}`}
                        className="border-l-2 border-brand-blue bg-white/70 px-4 py-3 shadow-sm dark:bg-gray-900/70"
                      >
                        <p className="font-futura text-[clamp(1.45rem,2.2vw,2rem)] font-bold leading-none text-brand-blue">
                          {point.value}
                        </p>
                        <p className="mt-1 font-helvetica text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                          {point.label}
                        </p>
                        <p className="mt-2 font-helvetica-light text-[clamp(0.82rem,0.95vw,0.92rem)] leading-[1.45] text-gray-700 dark:text-gray-300">
                          {point.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {project.caseSections && (
                  <div className="mb-6 space-y-4">
                    {project.caseSections.map((section) => (
                      <section
                        key={`${project.id}-${section.title}`}
                        className="rounded-lg border border-gray-200 bg-white/70 p-4 dark:border-gray-800 dark:bg-gray-900/70"
                      >
                        <h4 className="font-futura text-[clamp(1.1rem,1.35vw,1.3rem)] font-bold text-brand-blue">
                          {section.title}
                        </h4>
                        <p className="mt-2 font-helvetica-light text-[clamp(0.9rem,1vw,0.98rem)] leading-[1.6] text-gray-700 dark:text-gray-300">
                          {section.body}
                        </p>
                      </section>
                    ))}
                  </div>
                )}

                {project.results && (
                  <ul className="mb-6 space-y-3">
                    {project.results.map((result) => (
                      <li
                        key={result}
                        className="relative pl-6 font-helvetica text-[clamp(0.9rem,1vw,1rem)] leading-[1.5] text-gray-800 before:absolute before:left-0 before:text-brand-blue before:content-['•'] dark:text-gray-200"
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                )}

                {project.testimonial && (
                  <figure className="mb-6 border-l-2 border-brand-blue bg-brand-blue/5 px-4 py-3">
                    <blockquote className="font-helvetica-light text-[clamp(0.95rem,1.05vw,1.05rem)] leading-[1.6] text-gray-800 dark:text-gray-200">
                      &quot;{project.testimonial.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-3 font-helvetica text-[clamp(0.85rem,0.95vw,0.95rem)] text-gray-600 dark:text-gray-400">
                      {project.testimonial.attribution}
                    </figcaption>
                  </figure>
                )}

                {project.resultCards && (
                  <div className="mb-6 grid grid-cols-1 gap-3">
                    {project.resultCards.map((card) => (
                      <article
                        key={`${project.id}-${card.title}`}
                        className="rounded-lg border border-brand-blue/20 bg-brand-blue/5 p-4"
                      >
                        <div className="mb-3 flex flex-wrap items-end gap-x-3 gap-y-1">
                          <p className="font-futura text-[clamp(1.65rem,2.5vw,2.35rem)] font-bold leading-none text-brand-blue">
                            {card.value}
                          </p>
                          <p className="font-helvetica text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-400">
                            {card.label}
                          </p>
                        </div>
                        <h4 className="font-futura text-[clamp(1.05rem,1.25vw,1.2rem)] font-bold text-gray-900 dark:text-gray-100">
                          {card.title}
                        </h4>
                        <p className="mt-2 font-helvetica-light text-[clamp(0.88rem,1vw,0.96rem)] leading-[1.55] text-gray-700 dark:text-gray-300">
                          {card.body}
                        </p>
                      </article>
                    ))}
                  </div>
                )}

                {project.pdfHref && (
                  <div className="mb-6 flex flex-wrap gap-3">
                    <a
                      href={project.pdfHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 font-helvetica text-[clamp(0.9rem,1vw,1rem)] font-medium text-white transition-colors duration-200 hover:bg-[#006FE6] active:bg-[#0067D6] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                    >
                      {project.pdfLabel ?? 'Open project file'}
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
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                    <a
                      href={project.pdfHref}
                      download
                      className="inline-flex items-center justify-center rounded-lg border border-brand-blue/35 bg-white/80 px-5 py-2.5 font-helvetica text-[clamp(0.9rem,1vw,1rem)] font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue/10 active:bg-brand-blue/15 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:bg-gray-950/70"
                    >
                      Download PDF
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 font-helvetica text-[0.8rem] text-brand-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [desktopStep, setDesktopStep] = useState(0);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const maxIndex = Math.max(projects.length - 3, 0);
  const desktopProgressItems = Array.from({ length: maxIndex + 1 }, (_, index) => index);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < maxIndex;
  const mobilePages = chunkItems(projects, 4);

  useEffect(() => {
    const measureDesktopStep = () => {
      const track = desktopTrackRef.current;
      const firstCard = track?.firstElementChild as HTMLElement | null;
      if (!track || !firstCard) return;

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      setDesktopStep(firstCard.getBoundingClientRect().width + gap);
    };

    measureDesktopStep();
    window.addEventListener('resize', measureDesktopStep);
    return () => window.removeEventListener('resize', measureDesktopStep);
  }, []);

  const handleMobileScroll = () => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;
    const nextPage = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setMobilePage(Math.min(mobilePages.length - 1, Math.max(0, nextPage)));
  };

  return (
    <Container className="py-16">
      <div className="relative hidden [@media(min-width:1001px)]:block">
        {/* Project Track */}
        <div className="overflow-hidden">
          <motion.div
            ref={desktopTrackRef}
            className="flex gap-12"
            animate={{ x: -currentIndex * desktopStep }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="flex flex-none flex-col"
                style={{ width: 'calc((100% - 6rem) / 3)' }}
              >
                <ProjectImageCard project={project} onSelect={setSelectedProject} />

                {/* Project Title */}
                <h3 className="font-helvetica font-bold text-[clamp(1.125rem,1.4vw,1.5rem)] text-black dark:text-gray-100 mb-2">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="font-helvetica text-[clamp(0.875rem,1vw,1.125rem)] text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {maxIndex > 0 && (
          <div
            className="mt-8 flex justify-center gap-2"
            aria-label="Project carousel progress"
          >
            {desktopProgressItems.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25 hover:bg-brand-blue/45'
                }`}
                aria-label={`Show project set ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        )}

        {/* Left Arrow - Absolutely Positioned */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePrev}
              className="absolute left-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
              aria-label="Previous projects"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Arrow - Absolutely Positioned */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleNext}
              className="absolute right-[-5rem] top-[40%] -translate-y-1/2 text-brand-blue transition-[opacity,transform] duration-200 hover:opacity-80 hover:scale-110 active:scale-95 z-10"
              aria-label="Next projects"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="[@media(min-width:1001px)]:hidden">
        <div
          ref={mobileScrollerRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {mobilePages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full flex-none snap-start px-1"
            >
              <div className="mx-auto grid max-w-[40rem] grid-cols-2 gap-5 sm:gap-6">
                {page.map((project) => (
                  <div key={project.id} className="flex flex-col">
                    <ProjectImageCard project={project} onSelect={setSelectedProject} compact />
                    <h3 className="font-helvetica font-bold text-[clamp(0.95rem,2.4vw,1.1rem)] text-black dark:text-gray-100 mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-helvetica text-[clamp(0.8rem,2vw,0.95rem)] leading-[1.45] text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {mobilePages.length > 1 && (
          <div className="mt-8 flex justify-center gap-2" aria-hidden="true">
            {mobilePages.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  mobilePage === index ? 'w-8 bg-brand-blue' : 'w-3 bg-brand-blue/25'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Container>
  );
}
