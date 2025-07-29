'use client';

import HeroSection from '@/components/HeroSection';
import KeywordCarousel from '@/components/KeywordCarousel';
import HeroCTA from '@/components/HeroCTA';
import AnimatedCounter from '@/components/AnimatedCounter';
import AnimatedLine from '@/components/AnimatedLine';
import AnimatedText from '@/components/AnimatedText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  // Ref for the marketing section
  const marketingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: marketingRef,
    offset: ["start center", "end center"]
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <main className="min-h-screen">
      <section id="home" className="min-h-screen">
        <HeroSection />
      </section>
      
      {/* Marketing made for you section */}
      <section className="py-30" ref={marketingRef}>
        <div className="max-w-7xl mx-auto px-1 relative">
          <div className="text-right ml-auto" style={{ maxWidth: '87%' }}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-primary mb-8 font-futura whitespace-nowrap">
              Marketing made for you
            </h3>
            <AnimatedText 
              paragraphs={[
                "Marketing works best when it's customised to your business. Our digital marketing consultants build tailored strategies for you.",
                "To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you meaning we take what your business stands for without stepping on your toes.",
                "We use our specialised marketing process to build your business a lead generation framework that doesn't rely on guesswork."
              ]}
              className="text-xl md:text-2xl lg:text-4xl text-gray-700 font-helvetica-light"
              highlightWords={["tailored strategies", "done-for-you", "specialised marketing process"]}
            />
          </div>
          {/* Animated thick blue vertical line on the right of the content */}
          <motion.div
            className="absolute right-0 top-26 bottom-1 w-1 bg-blue-primary opacity-60"
            style={{ left: '100%', height }}
          />
        </div>
      </section>
      
      {/* Keyword Carousel section */}
      <section className="py-20">
        <KeywordCarousel />
      </section>
      
      {/* Stats and Services section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">


            {/* flex row, centered, with even gaps */}
            <div className="
                flex 
                flex-col 
                md:flex-row 
                items-start 
                justify-center 
                gap-x-32
                space-y-12 md:space-y-0 
                mb-16
              ">
              {[
                { value: '1134%',    label: 'Visibility Increase',       note: 'Using SEO for search engine results.' },
                { value: '200,000%', label: 'More Daily Traffic',         note: 'For our SEO clients, curated over 2 years.' },
                { value: '50x',      label: 'Return on Ad Spend',         note: 'Bringing new life to PPC client lead generation.' },
                { value: '£1.2M',    label: "Increase in Clients' Work", note: "Increase in our clients' quotes resulting from our work." },
              ].map((stat) => (
                <div key={stat.label} className="text-center max-w-xs hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 rounded-lg">
                  <AnimatedCounter value={stat.value} duration={2} />
                  <div className="text-xl text-gray-600 font-helvetica mb-6">
                    {stat.label}
                  </div>
                  <AnimatedLine />
                  <div className="text-sm text-gray-500 font-helvetica">
                    {stat.note}
                  </div>
                </div>
                             ))}
              </div>
              <div className="flex justify-center w-full">
                <HeroCTA 
                  text="Browse Services" 
                  width="230px" 
                  hoverWidth="280px" 
                  position="stats"
                />
              </div>
            </div>
        </div>
      </section>


      
      <section id="about" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">About</h2>
          <p className="text-lg text-gray-600">About section coming soon...</p>
        </div>
      </section>
      
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Projects</h2>
          <p className="text-lg text-gray-600">Projects section coming soon...</p>
        </div>
      </section>
      
      <section id="services" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-blue-600 mb-4">Services</h3>
          <p className="text-lg text-gray-600">Services section coming soon...</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Contact</h2>
          <p className="text-lg text-gray-600">Contact section coming soon...</p>
        </div>
      </section>
    </main>
  );
}
