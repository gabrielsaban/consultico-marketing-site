import type { Metadata } from 'next';
import ServiceDesktopHeader from '@/components/ServiceDesktopHeader';
import { pageMeta } from '@/lib/seo';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Consultico in Glasgow: send a message, book a call, or request a free SEO audit. The team behind Loop, by Consultico.',
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
