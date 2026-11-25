'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Lock } from 'lucide-react';
import { thesis } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { CountUp, EASE, Reveal } from '@/components/ui/Motion';
import TiltCard from '@/components/ui/TiltCard';
import ThesisViewer from '@/components/ui/ThesisViewer';

const R = 84;
const C = 2 * Math.PI * R;

// Each segment starts where the previous one ended.
const segments = thesis.aware.map((seg, i) => ({
  ...seg,
  len: (seg.pct / 100) * C,
  start: thesis.aware.slice(0, i).reduce((sum, s) => sum + (s.pct / 100) * C, 0),
}));

/** Donut of the AWaRe split with a marker at the WHO 60% Access target. */
function AwareDonut() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const targetAngle = (thesis.target / 100) * 360 - 90;
  const rad = (targetAngle * Math.PI) / 180;
  const inner = { x: 110 + Math.cos(rad) * (R - 16), y: 110 + Math.sin(rad) * (R - 16) };
  const outer = { x: 110 + Math.cos(rad) * (R + 16), y: 110 + Math.sin(rad) * (R + 16) };

  return (
    <figure className="relative mx-auto w-full max-w-[300px]">
      <svg ref={ref} viewBox="0 0 220 220" className="w-full" role="img" aria-label="AWaRe split: Access 6.74%, Watch 70.09%, Reserve 23.17%. WHO target is at least 60% Access.">
        <circle cx="110" cy="110" r={R} fill="none" stroke="rgb(233 240 245 / 0.06)" strokeWidth="18" />
        <g transform="rotate(-90 110 110)">
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.name}
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDashoffset={-seg.start}
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={inView ? { strokeDasharray: `${Math.max(seg.len - 2, 0)} ${C}` } : undefined}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: EASE }}
            />
          ))}
        </g>
        <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="font-display text-5xl text-ice">
          <CountUp value={6.74} decimals={2} suffix="%" />
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Access use</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Target ≥ {thesis.target}%</div>
      </div>
    </figure>
  );
}

function Methodology() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mt-20">
      <Reveal>
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <h3 className="eyebrow">Research methodology</h3>
        </div>
      </Reveal>
      <ol ref={ref} className="relative grid gap-8 md:grid-cols-5 md:gap-5">
        <div className="absolute left-[15px] top-2 hidden h-px w-[calc(100%-30px)] bg-line md:block" aria-hidden>
          <motion.div style={{ scaleX: grow }} className="h-full origin-left bg-gold" />
        </div>
        {thesis.methodology.map((m, i) => (
          <Reveal as="li" key={m.name} delay={i * 0.08} className="relative flex gap-4 md:block">
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 bg-ink font-mono text-[10px] text-gold md:mb-5 md:-mt-2">
              0{i + 1}
            </span>
            <div>
              <h4 className="font-display text-2xl text-ice">{m.name}</h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ice-2/80">{m.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function ResearchSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="research" className="section band theme-steel">
      <div className="shell">
        <SectionHeading index="05" label="Clinical Studies & Audits" title="Research" accent="& thesis." />

        {/* Thesis spotlight */}
        <Reveal>
          <TiltCard max={2.5} className="glass overflow-hidden rounded-[36px]">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
            <div className="relative p-7 md:p-12">
              <div className="flex flex-wrap items-center gap-2.5">
                {thesis.tags.map(t => (
                  <span key={t} className="rounded-full border border-ice/12 bg-ice/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ice-2">
                    {t}
                  </span>
                ))}
                <span className="font-mono text-[11px] text-mist">{thesis.location}</span>
              </div>

              <h3 className="mt-7 max-w-5xl font-display text-[30px] leading-[1.12] text-ice md:text-5xl">{thesis.title}</h3>
              <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-mist">{thesis.meta}</p>
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ice-2/85">{thesis.description}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
                >
                  <BookOpen className="h-4 w-4" />
                  View full thesis
                </button>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-mist">
                  <Lock className="h-3.5 w-3.5" /> 112 pages · view only
                </span>
              </div>

              {/* Key findings */}
              <div className="mt-12 grid grid-cols-1 items-center gap-10 border-t border-line pt-10 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-4">
                  <AwareDonut />
                </div>
                <div className="min-w-0 lg:col-span-8">
                  <span className="eyebrow">Key findings</span>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {thesis.aware.map(a => (
                      <li key={a.name} className="flex items-center gap-2 text-[14px]">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                        <span className="text-ice-2">{a.name}</span>
                        <span className="font-mono font-medium text-ice">{a.pct}%</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[14.5px] leading-relaxed text-ice-2/85">{thesis.findingNote}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {thesis.stats.map(s => (
                      <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-ice/[0.02] p-4 last:col-span-2 sm:last:col-span-1">
                        <dt className="order-last mt-1 font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-mist">{s.label}</dt>
                        <dd className="font-display text-3xl text-ice">
                          <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Methodology />

        {/* WHO AWaRe framework */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <h3 className="eyebrow">WHO AWaRe classification framework</h3>
            </div>
          </Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {thesis.framework.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 0.08}>
                <TiltCard max={6} className="h-full overflow-hidden rounded-3xl border border-line bg-ink-2/70">
                  <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                  <div className="relative p-7">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.color, boxShadow: `0 0 16px ${f.color}` }} />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: f.color }}>
                        {f.name} classification
                      </span>
                    </div>
                    <p className="mt-5 font-display text-2xl leading-snug text-ice">{f.desc}</p>
                    <p className="mt-5 font-mono text-[11px] text-mist">
                      Examples: <span className="text-ice-2">{f.drugs}</span>
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Research expertise */}
        <Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <span className="eyebrow mr-2">Research expertise</span>
            {thesis.expertise.map(t => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <ThesisViewer open={open} onClose={() => setOpen(false)} title={thesis.title} />
    </section>
  );
}
