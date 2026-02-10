import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';

export default function Footer() {
  const quickLinks1 = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const quickLinks2 = [
    { name: 'Think-First', href: '#think-first' },
    { name: 'SEO', href: '#seo' },
    { name: 'Marketing', href: '#marketing' },
    { name: 'Paid Ads', href: '#paid-ads' },
    { name: 'Careers', href: '#careers' },
  ];

  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <Container className="py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 items-start justify-items-center">
          {/* Column 1: Logo + Description */}
          <div className="w-full max-w-xs">
            <Image
              src="/brand/logo_main.svg"
              alt="Consultico"
              width={200}
              height={60}
              className="mb-6 brightness-0 invert"
            />
            <p className="text-[clamp(0.875rem,1vw,1rem)] leading-[1.6] font-helvetica-light text-gray-100 mb-6">
              Strategic digital marketing solutions that drive real results. We help businesses grow through data-driven strategies and expert execution.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/consultico_marketing/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="brightness-0 invert" />
              </a>
              <a
                href="https://www.linkedin.com/company/consultico-ltd/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="brightness-0 invert" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562303216944"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="brightness-0 invert" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links - Two columns side by side */}
          <div className="w-full">
            <h3 className="text-[clamp(1.125rem,1.3vw,1.25rem)] font-futura font-bold mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ul className="space-y-2">
                {quickLinks1.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100 hover:text-white transition-colors group"
                    >
                      <svg
                        className="w-3 h-3 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {quickLinks2.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100 hover:text-white transition-colors group"
                    >
                      <svg
                        className="w-3 h-3 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div className="w-full max-w-xs">
            <h3 className="text-[clamp(1.125rem,1.3vw,1.25rem)] font-futura font-bold mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:email@consultico.co.uk"
                className="flex items-start gap-3 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
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
              <a
                href="tel:01414291351"
                className="flex items-start gap-3 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
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
              <div className="flex items-start gap-3 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                <div>
                  Glasgow, Scotland
                  <br />
                  United Kingdom
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white opacity-20" />

      {/* Bottom Section */}
      <div className="py-4">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[clamp(0.75rem,0.9vw,0.875rem)] font-helvetica-light text-gray-200">
            <p>© 2026 Consultico. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

