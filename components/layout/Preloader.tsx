'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/ui/Motion';

/** Short intro: a capsule fills with the load percentage, then the curtain lifts. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 300 : 1700;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = setTimeout(() => {
          setVisible(false);
          root.style.overflow = '';
          onDone();
        }, reduce ? 0 : 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      root.style.overflow = '';
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: EASE }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Capsule loader */}
            <div className="relative h-[120px] w-[52px] rotate-[24deg] overflow-hidden rounded-full border border-ice/20">
              <div className="absolute bottom-0 left-0 right-0 bg-tangerine" style={{ height: `${progress}%` }} />
              <div className="absolute inset-x-0 top-1/2 h-px bg-ice/25" />
            </div>
            <div className="text-center">
              <div className="font-display text-3xl tracking-tight text-ice">
                Tejaswini <span className="italic text-tangerine-soft">Somisetty</span>
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.3em] text-mist tabular-nums">
                PHARM.D · {String(progress).padStart(3, '0')}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
