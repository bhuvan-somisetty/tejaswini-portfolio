'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { clinicalFocus, heroBio, heroRoles, heroStats, profile } from '@/lib/content';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { CountUp, EASE, MaskText } from '@/components/ui/Motion';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

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
          className="inline-block whitespace-nowrap text-tangerine-soft"
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

export default function HeroSection({ ready }: { ready: boolean }) {
  const { scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLElement>(null);
  const [small, setSmall] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const sceneFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section id="hero" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 lg:pt-24">
      {/* 3D capsule */}
      <motion.div
        style={{ y: sceneY, opacity: sceneFade }}
        className="pointer-events-none absolute inset-x-0 top-20 h-[340px] [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:h-[420px] lg:pointer-events-auto lg:left-auto lg:right-0 lg:top-0 lg:h-[100svh] lg:w-[52%]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={ready ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgb(255_105_61/0.16),transparent)] blur-2xl" />
        {ready && <HeroScene small={small} />}
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="shell relative z-10 mt-[300px] sm:mt-[360px] lg:mt-0">
        <div className="max-w-[760px]">
          <motion.div {...rise(0)} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-ice/10 bg-ice/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ice-2">
              <span className="h-1.5 w-1.5 rounded-full bg-tangerine" />
              {profile.eyebrow}
            </span>
            <span className="eyebrow hidden sm:inline">{profile.status}</span>
          </motion.div>

          <motion.p {...rise(0.1)} className="eyebrow mb-4">
            Welcome to the research portfolio of
          </motion.p>

          <h1 className="font-display leading-[0.88] tracking-[-0.02em] text-ice text-[clamp(64px,13vw,176px)]">
            <MaskText text={profile.firstName} play={ready} delay={0.15} className="block" />
            <MaskText text={profile.lastName} play={ready} delay={0.3} className="block italic text-gradient" />
          </h1>

          <motion.p {...rise(0.55)} className="mt-8 text-lg text-ice sm:text-xl">
            <span className="text-mist">Pharm.D · </span>
            <RoleRotator play={ready} />
          </motion.p>

          <motion.p {...rise(0.7)} className="mt-6 max-w-xl text-[15px] leading-relaxed text-ice-2/85">
            {heroBio}
          </motion.p>

          <motion.blockquote {...rise(0.8)} className="mt-8 max-w-xl border-l border-tangerine/60 pl-5">
            <span className="eyebrow mb-2 block text-tangerine/90">Clinical focus</span>
            <p className="font-display text-xl italic leading-snug text-ice sm:text-2xl">&ldquo;{clinicalFocus}&rdquo;</p>
          </motion.blockquote>

          <motion.div {...rise(0.95)} className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('experience')}
              className="group inline-flex items-center gap-2 rounded-full bg-tangerine px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-tangerine-soft"
            >
              Explore clinical clerkships
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-ice/15 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-ice/40 hover:bg-ice/5"
            >
              Send message
            </button>
          </motion.div>

          <motion.dl {...rise(1.1)} className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
            {heroStats.map(s => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-last mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{s.label}</dt>
                <dd className="font-display text-4xl text-ice sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Caption for the 3D piece */}
      <motion.div
        {...rise(1.2)}
        className="absolute bottom-10 right-10 hidden text-right lg:block"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-tangerine/90">Clinical Research Hub</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{profile.college}</div>
      </motion.div>

    </section>
  );
}
