import ProjectsGrid from '@/components/ProjectsGrid';
import BlogCarousel from '@/components/BlogCarousel';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function ProjectsSocialProof() {
  return (
    <section id="projects" className="scroll-mt-24">
      <ProjectsGrid />
      <div className="mt-24 md:mt-28 lg:mt-32 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_1fr] gap-10 lg:gap-16 items-start">
          <div className="justify-self-start">
            <h2 className="text-left text-blue-primary font-futura text-4xl md:text-5xl lg:text-6xl font-extrabold">Our Blogs</h2>
            <BlogCarousel centered={false} className="w-full max-w-[900px]" />
          </div>
          <div className="justify-self-end w-full max-w-[900px]">
            <TestimonialsCarousel className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}


