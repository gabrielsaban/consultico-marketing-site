'use client';

import Container from '@/components/Container';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ContactMap = dynamic(() => import('@/components/ContactMap'), { ssr: false });

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-950 shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-16 md:py-20 lg:py-24 scroll-mt-24">
      <Container>
        {/* Heading */}
        <h2 className="text-[clamp(2rem,3vw,3.125rem)] font-bold text-brand-blue font-futura text-center mb-8">
          Contact us
        </h2>

        {/* Contact Info - Center Aligned with Spacing */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-24 mb-12 md:mb-16">
          <a
            href="mailto:email@consultico.co.uk"
            className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300 hover:text-brand-blue transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            email@consultico.co.uk
          </a>
          
          {/* Decorative Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          </div>
          
          <a
            href="tel:01414291351"
            className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300 hover:text-brand-blue transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            0141 429 1351
          </a>
          
          {/* Decorative Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          </div>
          
          <div className="flex items-center gap-3 text-[clamp(0.95rem,1.1vw,1.125rem)] font-helvetica text-gray-700 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0 text-brand-blue"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Glasgow, Scotland
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left Column - Marketing Clarity Info */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[clamp(1.75rem,2.5vw,2.5rem)] font-bold text-brand-blue font-futura mb-6">
              Discover Your Marketing Clarity Score & Register for the Free Webinar
            </h3>
            <p className="text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.6] text-gray-700 dark:text-gray-300 font-helvetica mb-8">
              You&apos;ll instantly discover where your marketing stands, what growth opportunities you&apos;re missing, and get a personalised roadmap based on your current stage.
            </p>

            {/* How it works box - expanded */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-brand-blue rounded-lg p-8 mb-6 flex-grow w-full flex flex-col justify-around">
              <p className="font-helvetica font-bold text-[clamp(1rem,1.1vw,1.125rem)] text-gray-700 dark:text-gray-200 mb-8">
                Here&apos;s how it works:
              </p>
              
              <div className="flex flex-col gap-6 text-left">
                <div>
                  <p className="text-[clamp(0.95rem,1.05vw,1.05rem)] text-gray-800 dark:text-gray-200 font-helvetica mb-2">
                    <span className="text-brand-blue font-bold">Step 1: </span>Fill in your contact details
                  </p>
                  <div className="flex justify-start pl-4">
                    <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <p className="text-[clamp(0.95rem,1.05vw,1.05rem)] text-gray-800 dark:text-gray-200 font-helvetica mb-2">
                    <span className="text-brand-blue font-bold">Step 2: </span>Answer 6 quick questions about your marketing
                  </p>
                  <div className="flex justify-start pl-4">
                    <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <p className="text-[clamp(0.95rem,1.05vw,1.05rem)] text-gray-800 dark:text-gray-200 font-helvetica">
                    <span className="text-brand-blue font-bold">Step 3: </span>Get your personalized score and choose your webinar time
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              className="bg-brand-blue text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 mb-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 w-full"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              Start registration
            </motion.button>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="business" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10" />
                  </svg>
                  Business Name
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica text-black dark:text-gray-100"
                />
              </div>

              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-[clamp(0.9rem,1vw,1rem)] font-helvetica font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all duration-200 font-helvetica resize-none text-black dark:text-gray-100"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-brand-blue text-white font-helvetica font-medium text-[clamp(1rem,1.2vw,1.125rem)] px-8 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
              >
                Send message
              </motion.button>
            </form>
          </div>
        </div>

        <ContactMap />
      </Container>
    </section>
  );
}
