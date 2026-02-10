import HomeSection from './HomeSection';
import ServicesSection from './ServicesSection';
import ProjectsSocialProof from './ProjectsSocialProof';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import ScrollToSectionOnLoad from '@/components/ScrollToSectionOnLoad';

export default function ComposedPage() {
  return (
    <main className="min-h-screen">
      <ScrollToSectionOnLoad />
      <HomeSection />
      <ServicesSection />
      <ProjectsSocialProof />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

