'use client';

import { useEffect, useState } from 'react';

type ThemeToggleProps = {
  className?: string;
};

const THEME_KEY = 'theme';

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    sync();
    window.addEventListener('themechange', sync);
    return () => window.removeEventListener('themechange', sync);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextIsDark);
    try {
      localStorage.setItem(THEME_KEY, nextIsDark ? 'dark' : 'light');
    } catch {
      // no-op
    }
    window.dispatchEvent(new Event('themechange'));
    setIsDark(nextIsDark);
  };

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue/10 transition-colors ${className}`}
    >
      {isDark ? (
        <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM1 13h3v-2H1v2zm20 0h3v-2h-3v2zM4.22 19.78l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM19.78 4.22l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM12 7a5 5 0 0 0 0 10 5 5 0 0 0 0-10zm0-5h-2v3h2V2zm0 19h-2v3h2v-3z" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M21.64 13.65A9 9 0 0 1 10.35 2.36a1 1 0 0 0-1.23 1.23A7 7 0 0 0 20.41 14.88a1 1 0 0 0 1.23-1.23z" />
        </svg>
      )}
    </button>
  );
}
