'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/ui/Motion';

type Stage = 'dot' | 'name' | 'word' | 'out' | 'done';

/** Deterministic scatter so the letters fly in from the same places on every visit. */
const scatter = (i: number) => ({
  x: Math.sin(i * 12.9898) * 260,
  y: Math.cos(i * 78.233) * 180,
  rotate: Math.sin(i * 4.1) * 70,
  scale: 1.6 + (i % 3) * 0.4,
});

function Letters({ text, from }: { text: string; from: 'scatter' | 'flip' }) {
  return (
    <span className="display-wide flex text-[clamp(44px,12vw,168px)] leading-none" aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="text-chrome inline-block"
          style={{ transformPerspective: 800 }}
          initial={
            from === 'scatter'
              ? { opacity: 0, filter: 'blur(6px)', ...scatter(i) }
              : { opacity: 0, rotateX: -90, y: '40%', filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, rotateX: 90, y: '-40%', transition: { duration: 0.35, delay: i * 0.025, ease: EASE } }}
          transition={{ duration: from === 'scatter' ? 1.1 : 0.6, delay: (from === 'scatter' ? 0.05 : 0.03) * i, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Intro: a glowing dot on black, the name assembles from scattered letters,
 * flips into PORTFOLIO, then the letters fold away under a light grain and the
 * curtain fades. The page is only told to start once the curtain has fully gone,
 * so its entrance animations never compete with the fade.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>('dot');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const plan: [Stage, number][] = reduce
      ? [['word', 0], ['done', 700]]
      : [['name', 800], ['word', 2900], ['out', 4200], ['done', 4750]];
    const timers = plan.map(([s, at]) => setTimeout(() => setStage(s), at));
    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (stage === 'done') document.documentElement.style.overflow = '';
  }, [stage]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Loading the portfolio of Tejaswini Somisetty"
        >
          {/* Soft light behind the lettering */}
          <motion.div
            className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgb(255_240_213/0.16),transparent_65%)]"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: stage === 'dot' ? 0.6 : 1.4, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          />

          <AnimatePresence mode="wait">
            {stage === 'dot' && (
              <motion.span
                key="dot"
                className="h-3 w-3 rounded-full bg-ice shadow-[0_0_30px_8px_rgb(255_240_213/0.55)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            )}
            {stage === 'name' && (
              <motion.div key="name" className="relative">
                <Letters text="TEJASWINI" from="scatter" />
              </motion.div>
            )}
            {stage === 'word' && (
              <motion.div key="word" className="relative flex flex-col items-center">
                <Letters text="PORTFOLIO" from="flip" />
                <motion.span
                  className="mt-3 font-serif text-[clamp(18px,2.4vw,30px)] italic text-gold-soft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                >
                  Doctor of Pharmacy
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grain burst that dissolves the intro into the page */}
          <motion.div
            className="grain-burst pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'out' ? 0.35 : 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
