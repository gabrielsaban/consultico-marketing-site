'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

type PreloaderContextValue = {
  /** true once the preloader is done (or was skipped) */
  ready: boolean;
  /** called by SitePreloader when reveal begins */
  markReady: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  ready: false,
  markReady: () => {},
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
}
