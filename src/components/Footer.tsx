import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import NewsletterSignup from '@/components/NewsletterSignup';
import {
  CONSULTICO_ADDRESS,
  CONSULTICO_EMAIL,
  CONSULTICO_GBP_URL,
  CONSULTICO_PHONE_DISPLAY,
  CONSULTICO_PHONE_TEL,
} from '@/lib/contact';
import { LOOP_HREF, NAV_SERVICES, getNavIndustries, type NavLink } from '@/lib/nav-services';

// The footer is the one place every page is linked from every page. The new
// menu keeps the services quiet and Google never opens menus, so this has to
// be the complete, crawlable index: every service, every industry page.
const COMPANY_LINKS: NavLink[] = [
  { name: 'Meet Loop', href: LOOP_HREF },
  { name: 'Think First', href: '/think-first' },
  // Sitewide, so every page has a crawlable path to the proof.
  { name: 'Case studies', href: '/case-studies' },
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/#about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Advertise', href: '/sponsored-placements' },
  { name: 'Contact', href: '/contact' },
];

function FooterLinkList({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="text-[clamp(1.125rem,1.3vw,1.25rem)] font-futura font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-start gap-2 text-[clamp(0.875rem,1vw,1rem)] font-helvetica-light text-gray-100 hover:text-white transition-colors group"
            >
              <svg
                className="w-3 h-3 mt-[0.35em] flex-shrink-0 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer data-cursor-theme="light" className="bg-brand-blue text-white mt-auto">
      <Container className="py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.4fr_1fr] gap-8 md:gap-8 lg:gap-12 items-start justify-items-center">
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
              Loop, by Consultico. An extra part of your marketing team that takes a fresh look every week. Sharper every week. Further every year.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/consultico_marketing/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Consultico on Instagram"
              >
                <Image src="/icons/instagram.svg" alt="" width={24} height={24} className="brightness-0 invert" />
              </a>
              <a
                href="https://www.linkedin.com/company/consultico-ltd/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Consultico on LinkedIn"
              >
                <Image src="/icons/linkedin.svg" alt="" width={24} height={24} className="brightness-0 invert" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562303216944"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Consultico on Facebook"
              >
                <Image src="/icons/facebook.svg" alt="" width={24} height={24} className="brightness-0 invert" />
              </a>
            </div>
          </div>

          {/* Column 2: the full index. Company, services, then industries. */}
          <div className="w-full max-w-xs md:max-w-none grid grid-cols-2 lg:grid-cols-[0.8fr_0.8fr_1.4fr] gap-6">
            <FooterLinkList title="Consultico" links={COMPANY_LINKS} />
            <FooterLinkList title="Services" links={NAV_SERVICES} />
            <FooterLinkList title="Industries" links={getNavIndustries()} />
          </div>

          {/* Column 3: Contact Us */}
          <div className="w-full max-w-xs">
            <h3 className="text-[clamp(1.125rem,1.3vw,1.25rem)] font-futura font-bold mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${CONSULTICO_EMAIL}`}
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
                {CONSULTICO_EMAIL}
              </a>
              <a
                href={CONSULTICO_PHONE_TEL}
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
                {CONSULTICO_PHONE_DISPLAY}
              </a>
              <a
                href={CONSULTICO_GBP_URL}
                target="_blank"
                rel="noreferrer"
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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  {CONSULTICO_ADDRESS.display}
                  <br />
                  United Kingdom
                </div>
              </a>
            </div>
          </div>
        </div>

        {/*
          Sitewide signup. The footer is the one place that appears on every
          page including the ones with no other capture, so it is the floor
          under the whole thing rather than the main event — the homepage strip
          and the article copies do the heavy lifting.

          It reports source="footer", so if it turns out to convert on a page we
          did not expect, we will see that rather than guess it.
        */}
        <div className="mt-10 border-t border-white/20 pt-8">
          <div className="max-w-2xl">
            <NewsletterSignup source="footer" variant="footer" />
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
              <Link href="/research-participants" className="hover:text-white transition-colors">
                Research Participants
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
