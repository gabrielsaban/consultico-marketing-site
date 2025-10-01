import HomeSection from './HomeSection';
import ServicesSection from './ServicesSection';
import ProjectsSocialProof from './ProjectsSocialProof';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';

export default function ComposedPage() {
  return (
    <main className="min-h-screen">
      <HomeSection />
      <ServicesSection />
      <ProjectsSocialProof />
      <AboutSection />
      <ContactSection />
    </main>
  );
}


