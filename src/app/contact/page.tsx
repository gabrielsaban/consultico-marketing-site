import type { Metadata } from 'next';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = pageMeta({
  title: 'Contact Consultico',
  description:
    'Contact Consultico in Glasgow: send a message, book a call, or request a free SEO audit. Strategy-led digital marketing for UK and US businesses.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main className="relative">
      <ServiceDesktopHeader />
      <ContactPageContent />
    </main>
  );
}
