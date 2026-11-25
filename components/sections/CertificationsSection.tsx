'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, RotateCcw, X } from 'lucide-react';
import { certifications, conference, webinarCertificates, workshops } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { EASE, Reveal } from '@/components/ui/Motion';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';

const CertGun = dynamic(() => import('@/components/three/CertGun'), { ssr: false });

type Slip = { title: string; issuer: string; date?: string; kind: string; image?: string; desc: string };

const slips: Slip[] = [
  ...certifications.map(c => ({ title: c.title, issuer: c.issuer, kind: c.status, desc: c.desc })),
  { title: conference.name, issuer: conference.full, kind: conference.role, desc: conference.outcomes.join(' · ') },
  ...webinarCertificates,
];
const TOTAL = slips.length;

const tones = [
  'bg-ice text-ink border-ice',
  'bg-accent text-ink border-accent',
  'bg-gold text-ink border-gold',
  'bg-emerald-deep text-ice border-gold/35',
  'bg-graphite-2 text-ice border-ice/15',
  'bg-ink-2 text-ice border-accent/40',
];

/** Fixed per-card scatter so the pile looks the same on every visit. */
const jitter = (i: number) => ({ r: Math.sin(i * 7.31) * 6, dx: Math.sin(i * 3.7) * 10, dy: Math.cos(i * 5.3) * 8 });

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

function Lightbox({ slip, onClose }: { slip: Slip; onClose: () => void }) {
  const { stop, start } = useSmoothScroll();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      start();
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, stop, start]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={slip.title}
    >
      <motion.figure
        className="relative w-full max-w-4xl"
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-ice/15 text-ice transition-colors hover:border-accent hover:text-accent"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {slip.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slip.image}
            alt={`Certificate: ${slip.title}`}
            className="mx-auto max-h-[72vh] w-auto rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]"
            draggable={false}
            onContextMenu={e => e.preventDefault()}
          />
        ) : (
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="text-[15px] leading-relaxed text-ice-2">{slip.desc}</p>
          </div>
        )}
        <figcaption className="mt-5 text-center">
          <div className="font-display text-2xl text-ice md:text-3xl">{slip.title}</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
            {slip.issuer}
            {slip.date ? ` · ${slip.date}` : ''}
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body,
  );
}

export default function CertificationsSection() {
  const reduce = useReducedMotion();
  const [stageRef, W] = useWidth<HTMLDivElement>();
  // One launch origin per fired card, measured from the launcher when it fires.
  const [shots, setShots] = useState<{ x: number; y: number }[]>([]);
  const count = shots.length;
  const [open, setOpen] = useState<Slip | null>(null);
  const inView = useRef(false);
  const demoed = useRef(false);
  const hold = useRef<{ t?: ReturnType<typeof setTimeout>; i?: ReturnType<typeof setInterval> }>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wideRef = useRef(true);

  const fire = useCallback(() => {
    const stage = stageRef.current?.getBoundingClientRect();
    const gun = triggerRef.current?.getBoundingClientRect();
    const muzzle =
      stage && gun
        ? { x: gun.left - stage.left + gun.width * (wideRef.current ? 0.2 : 0.18), y: gun.top - stage.top + gun.height * 0.36 }
        : { x: 0, y: 0 };
    setShots(list => (list.length >= TOTAL ? list : [...list, muzzle]));
  }, [stageRef]);
  const release = useCallback(() => {
    clearTimeout(hold.current.t);
    clearInterval(hold.current.i);
    hold.current = {};
  }, []);
  const press = useCallback(() => {
    release();
    fire();
    hold.current.t = setTimeout(() => {
      hold.current.i = setInterval(fire, 110);
    }, 300);
  }, [fire, release]);

  useEffect(() => {
    if (count >= TOTAL) release();
  }, [count, release]);

  // Track visibility; fire one certificate the first time the stage is seen.
  // With reduced motion, lay them all out at once instead.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting && !demoed.current) {
          demoed.current = true;
          if (reduce) setShots(Array.from({ length: TOTAL }, () => ({ x: 0, y: 0 })));
          else setTimeout(fire, 500);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stageRef, fire, reduce]);

  // Space bar: tap fires one, hold fires the rest.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || !inView.current || open) return;
      const t = e.target as HTMLElement | null;
      if (t && t !== triggerRef.current && t.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
      e.preventDefault();
      if (!e.repeat) press();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') release();
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      release();
    };
  }, [press, release, open]);

  const layout = useMemo(() => {
    const wide = W >= 900;
    const cols = wide ? 3 : 2;
    const gap = wide ? 18 : 10;
    const pileW = wide ? W * 0.55 : W;
    const cardW = Math.min(240, (pileW - gap * (cols - 1)) / cols);
    const cardH = wide ? 136 : 150;
    const top = wide ? 10 : 300;
    const rows = Math.ceil(TOTAL / cols);
    const height = Math.max(top + rows * (cardH + gap) + 30, wide ? 620 : 0);
    const targets = slips.map((_, i) => {
      const j = jitter(i);
      return {
        x: (i % cols) * (cardW + gap) + (wide ? j.dx : j.dx * 0.3),
        y: top + Math.floor(i / cols) * (cardH + gap) + j.dy,
        r: j.r,
      };
    });
    return { wide, cardW, cardH, height, targets };
  }, [W]);

  useEffect(() => {
    wideRef.current = layout.wide;
  }, [layout.wide]);

  const done = count >= TOTAL;

  return (
    <section id="certifications" className="section band bg-ink">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Credentials & Milestones"
          title="Certifications &"
          accent="achievements."
          intro={`${TOTAL} certifications, workshops, webinars and conferences. Fire them out of the launcher and tap any card to see the certificate.`}
        />

        <div ref={stageRef} className="relative select-none" style={{ height: W ? layout.height : 900 }}>
          {/* Launcher, with its hint, stays on screen while the pile scrolls past */}
          {W > 0 && (
            <div className={layout.wide ? 'absolute inset-y-0 right-0 w-[45%]' : 'absolute inset-x-0 top-0'}>
              <div className={layout.wide ? 'sticky top-[max(96px,calc(50svh-250px))]' : ''}>
                <button
                  ref={triggerRef}
                  type="button"
                  onPointerDown={e => {
                    e.preventDefault();
                    press();
                  }}
                  onPointerUp={release}
                  onPointerLeave={release}
                  onPointerCancel={release}
                  onKeyDown={e => {
                    if (e.key === 'Enter') fire();
                  }}
                  onContextMenu={e => e.preventDefault()}
                  className={`relative block w-full cursor-pointer touch-none rounded-[32px] outline-offset-4 ${layout.wide ? 'h-[440px]' : 'h-[240px]'}`}
                  aria-label={`Certificate launcher: press to fire one certificate, hold to fire them all (${count} of ${TOTAL} out)`}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(255_73_61/0.2),transparent)] blur-2xl" />
                  <CertGun shots={count} />
                </button>

                <div
                  className="mt-2 flex flex-col items-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mist"
                  aria-live="polite"
                >
                  <span className="text-ice-2">
                    <span className="text-accent">{String(count).padStart(2, '0')}</span> / {TOTAL} out
                  </span>
                  {done ? (
                    <button
                      type="button"
                      onClick={() => setShots([])}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ice/15 px-3 py-1.5 text-ice-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      <RotateCcw className="h-3 w-3" /> Reload
                    </button>
                  ) : (
                    <span>
                      <span className="hidden md:inline">
                        Tap <kbd className="rounded border border-ice/20 px-1.5 py-0.5 text-ice">Space</kbd> or the trigger: one · Hold: all
                      </span>
                      <span className="md:hidden">Tap the launcher: one · Hold: all</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Certificates */}
          {slips.slice(0, count).map((s, i) => {
            const t = layout.targets[i];
            const m = { x: shots[i].x - layout.cardW / 2, y: shots[i].y - layout.cardH / 2 };
            const arcY = Math.min(m.y, t.y) - (layout.wide ? 160 : 90);
            return (
              <motion.button
                key={s.title}
                type="button"
                onClick={() => setOpen(s)}
                className={`absolute left-0 top-0 flex flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left shadow-[0_24px_40px_-20px_rgb(0_0_0/0.85)] transition-shadow hover:shadow-[0_30px_50px_-18px_rgb(255_73_61/0.45)] ${tones[i % tones.length]}`}
                style={{ width: layout.cardW, height: layout.cardH, zIndex: 10 + i }}
                initial={reduce ? false : { x: m.x, y: m.y, rotate: -30, scale: 0.25, opacity: 0 }}
                animate={
                  reduce
                    ? { x: t.x, y: t.y, rotate: t.r, scale: 1, opacity: 1 }
                    : { x: [m.x, (m.x + t.x) / 2, t.x], y: [m.y, arcY, t.y], rotate: [-30, i % 2 ? 24 : -18, t.r], scale: [0.25, 1.06, 1], opacity: [0, 1, 1] }
                }
                transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 60 }}
                aria-label={`${s.title}, ${s.issuer}${s.date ? `, ${s.date}` : ''}. Open details`}
              >
                <span className="flex items-center justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-75">
                  <span className="truncate">{s.kind}</span>
                  <span className="shrink-0">{s.date ?? String(i + 1).padStart(2, '0')}</span>
                </span>
                <span className="line-clamp-3 font-display text-[17px] leading-[1.15] md:text-[18px]">{s.title}</span>
                <span className="flex items-center justify-between gap-2 text-[10.5px] opacity-70">
                  <span className="truncate">{s.issuer.split(' · ')[0]}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </span>
              </motion.button>
            );
          })}

        </div>

        {/* Full list for screen readers and search engines */}
        <ul className="sr-only">
          {slips.map(s => (
            <li key={s.title}>
              {s.title}, {s.issuer}
              {s.date ? `, ${s.date}` : ''}. {s.desc}
            </li>
          ))}
        </ul>

        {/* Seminars & workshops */}
        <Reveal>
          <div className="glass mt-10 flex flex-col gap-6 rounded-[28px] p-7 md:flex-row md:items-center md:p-9">
            <div className="md:w-64 md:shrink-0">
              <h3 className="font-display text-3xl text-ice">
                Seminars &amp; <span className="font-serif italic text-luxe pr-[0.04em]">workshops</span>
              </h3>
              <p className="mt-1.5 text-[13px] text-mist">Academic sessions attended on</p>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {workshops.map(w => (
                <li key={w} className="chip text-[13.5px]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>{open && <Lightbox slip={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
