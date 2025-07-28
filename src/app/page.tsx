import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="home" className="min-h-screen">
        <HeroSection />
      </section>
      
      {/* Marketing made for you section */}
      <section className="py-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-right ml-auto" style={{ maxWidth: '80%' }}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-primary mb-8 font-futura whitespace-nowrap">
              Marketing made for you
            </h3>
            <div className="text-xl md:text-2xl lg:text-5xl text-gray-600 font-helvetica space-y-6">
              <p>
                Marketing works best when it&apos;s customised to your business. Our digital marketing consultants build tailored strategies for you.
              </p>
              <p>
                To make your brand excel, we focus on the type of customers you want and exactly how to get there. Our methods are done-for-you, meaning we take what your business stands for without stepping on your toes.
              </p>
              <p>
                We use our specialised marketing process to build your business a lead generation framework that doesn&apos;t rely on guesswork.
              </p>
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
