import HomeSection from './HomeSection';
import ServicesSection from './ServicesSection';
import ProjectsSocialProof from './ProjectsSocialProof';
import LatestArticlesSection from './LatestArticlesSection';
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
      <LatestArticlesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

