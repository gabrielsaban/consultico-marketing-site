import ImageFilledText from './ImageFilledText';

export default function HeroSection() {
  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Brand name - positioned higher and more to the right with better spacing */}
      <div className="absolute top-18 left-24">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-futura">
          <span className="text-blue-primary">Consult</span>
          <span className="text-blue-secondary">ico</span>
        </h1>
      </div>
      
      {/* Hero headline - positioned absolutely for better control */}
      <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* First line container - exactly one line */}
          <div className="text-blue-primary text-5xl md:text-7xl lg:text-8xl font-bold font-futura whitespace-nowrap">
            <span>in a world of </span>
            <ImageFilledText 
              text="noise" 
              className="text-8xl md:text-[10rem] lg:text-[16rem] font-bold font-futura inline-block"
            />
          </div>
          {/* Second line container - exactly one line */}
          <div className="text-blue-primary text-5xl md:text-7xl lg:text-8xl font-bold font-futura whitespace-nowrap">
            we make your brand heard
          </div>
        </div>
      </div>
      
      {/* Call to action - positioned below hero text */}
      <div className="absolute bottom-40 left-9/12 transform -translate-x-1/2">
        <button className="bg-blue-primary hover:bg-blue-700 text-white font-semibold py-5 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-futura">
          Get in touch
        </button>
      </div>
      
      {/* Social media icons - positioned absolutely like in the image */}
      <div className="absolute top-24 right-24 flex space-x-4">
        <div className="w-15 h-15 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors cursor-pointer font-futura">
          <span className="text-sm font-bold">IG</span>
        </div>
        <div className="w-15 h-15 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors cursor-pointer font-futura">
          <span className="text-sm font-bold">FB</span>
        </div>
        <div className="w-15 h-15 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors cursor-pointer font-futura">
          <span className="text-sm font-bold">LI</span>
        </div>
      </div>
    </div>
  );
}
