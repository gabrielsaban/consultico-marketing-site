'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Completion state, shared by the rail and by each action's controls.
 *
 * A client provider wrapping server-rendered children — the same trick
 * SectionPanel already uses — so the playbook's prose never enters a client
 * bundle while the ticks stay interactive.
 *
 * localStorage only at this stage, and the UI is careful never to claim more
 * than that. Server sync arrives with /r/[slug]/progress; this interface is
 * shaped so that lands as an implementation change behind `setDone`, not a
 * refactor of every consumer.
 */

type Ctx = {
  completed: string[];
  isDone: (id: string) => boolean;
  setDone: (id: string, done: boolean) => void;
  storage: 'local' | 'unavailable';
};

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const key = `playbook:${slug}:done`;
  const [completed, setCompleted] = useState<string[]>([]);
  const [storage, setStorage] = useState<'local' | 'unavailable'>('local');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setCompleted(JSON.parse(raw) as string[]);
    } catch {
      setStorage('unavailable');
    }
  }, [key]);

  const setDone = useCallback(
    (id: string, done: boolean) => {
      setCompleted((prev) => {
        const next = done ? [...new Set([...prev, id])] : prev.filter((x) => x !== id);
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          setStorage('unavailable');
        }
        return next;
      });
    },
    [key],
  );

  const value = useMemo<Ctx>(
    () => ({ completed, isDone: (id) => completed.includes(id), setDone, storage }),
    [completed, setDone, storage],
  );

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
