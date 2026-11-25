'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

const NAV_OFFSET = 88;

interface ScrollApi {
  scrollTo: (target: string | number) => void;
  stop: () => void;
  start: () => void;
}

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (typeof target === 'number') {
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else window.scrollTo({ top: target });
      return;
    }
    const el = document.getElementById(target.replace(/^#/, ''));
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.4 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(top, 0) });
    }
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [scrollTo]
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
