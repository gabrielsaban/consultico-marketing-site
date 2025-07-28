'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'projects', href: '#projects' },
  { name: 'services', href: '#services' },
  { name: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  // Handle smooth scrolling to sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar fixed left-0 top-0 h-full w-16 bg-blue-primary z-50 flex flex-col justify-center">
      <div className="flex flex-col items-center space-y-20"> {/* Increased spacing even more */}
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`
              relative group transition-all duration-300 ease-out font-bold font-futura
              ${activeSection === item.href.replace('#', '') 
                ? 'text-white scale-110' 
                : 'text-blue-100 hover:text-white hover:scale-105'
              }
            `}
          >
            {/* Rotated text container */}
            <div className="transform -rotate-90 whitespace-nowrap">
              <span className="text-sm font-bold tracking-widest uppercase font-futura antialiased subpixel-antialiased">
                {item.name}
              </span>
            </div>
            
            {/* Active indicator */}
            {activeSection === item.href.replace('#', '') && (
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-full animate-pulse" />
            )}
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
