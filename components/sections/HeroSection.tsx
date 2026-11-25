'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { heroRoles, profile } from '@/lib/content';
import { EASE, MaskText } from '@/components/ui/Motion';

const HelixMorph = dynamic(() => import('@/components/three/HelixMorph'), { ssr: false });

function RoleRotator({ play }: { play: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setI(n => (n + 1) % heroRoles.length), 2800);
    return () => clearInterval(id);
  }, [play]);
  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom" aria-live="off">
      <span className="sr-only">{heroRoles.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={heroRoles[i]}
          aria-hidden
          className="inline-block whitespace-nowrap text-ice"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {heroRoles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Opening screen: the name over a particle DNA helix. The screen stays pinned while
 * the visitor scrolls, and the helix reassembles into the heading of the next section.
 */
export default function HeroSection({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [small, setSmall] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Function transforms keep these on the JS scroll value; the accelerated
  // scroll-timeline path misreads this pinned 'start start' to 'end end' range.
  const ramp = (a: number, b: number) => (v: number) => Math.min(Math.max((v - a) / (b - a), 0), 1);
  const morph = useTransform(scrollYProgress, ramp(0.05, 0.9));
  const nameFade = useTransform(scrollYProgress, v => 1 - ramp(0, 0.3)(v));
  const nameScale = useTransform(scrollYProgress, v => 1 - 0.14 * ramp(0, 0.3)(v));
  // 'none' at rest so the name is not kept on a filter layer while idle.
  const nameBlur = useTransform(scrollYProgress, v => (v <= 0 ? 'none' : `blur(${10 * ramp(0, 0.3)(v)}px)`));

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section id="hero" ref={ref} className="relative h-[260svh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE }}
        >
          {/* Mounted from the start so WebGL warms up behind the intro, not during the handover. */}
          <HelixMorph progress={morph} word="About" small={small} />
        </motion.div>

        <motion.div
          style={{ opacity: nameFade, scale: nameScale, filter: nameBlur }}
          className="shell relative z-10 flex h-full flex-col items-center justify-center text-center"
        >
          <motion.p {...rise(0)} className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {profile.eyebrow}
          </motion.p>

          <h1 className="leading-[0.9]">
            <MaskText
              text={profile.firstName}
              play={ready}
              delay={0.05}
              className="block font-display text-[clamp(64px,16vw,236px)] tracking-[-0.02em]"
              wordClassName="text-chrome"
            />
            <MaskText
              text={profile.lastName}
              play={ready}
              delay={0.22}
              className="-mt-[0.1em] block font-display text-[clamp(40px,7vw,104px)] italic"
              wordClassName="text-luxe pr-[0.04em]"
            />
          </h1>

          <motion.p {...rise(0.4)} className="mt-8 text-base text-mist sm:text-lg">
            Pharm.D · <RoleRotator play={ready} />
          </motion.p>
          <motion.p {...rise(0.5)} className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fog">
            {profile.college} · {profile.city}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div style={{ opacity: nameFade }} className="absolute inset-x-0 bottom-8 z-10" aria-hidden>
          <motion.div {...rise(0.7)} className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-gold"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
