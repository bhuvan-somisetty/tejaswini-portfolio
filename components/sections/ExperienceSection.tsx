'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section band theme-wine">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Milestones & Rotations"
          title="Clinical"
          accent="experience."
          intro="Hospital-based clerkships across six clinical departments, from the general medicine ward to critical care and the healthcare quality department."
        />

        <div className="relative lg:pl-16">
          {/* Progress rail */}
          <div className="absolute bottom-0 left-[22px] top-0 hidden w-px bg-line lg:block" aria-hidden>
            <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top bg-gradient-to-b from-gold via-gold/60 to-transparent" />
          </div>

          <ol ref={listRef} className="flex flex-col gap-6 lg:gap-10">
            {experiences.map((exp, i) => (
              <li key={exp.role} className="relative lg:sticky" style={{ top: `${110 + i * 18}px` }}>
                <span className="absolute -left-[49px] top-12 hidden h-3 w-3 rounded-full border-2 border-ink bg-gold lg:block" aria-hidden />
                <Reveal>
                  <article className="relative overflow-hidden rounded-[28px] border border-line bg-ink-2 p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] md:p-10">
                    <div className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[140px] leading-none text-ice/[0.035] md:text-[180px]" aria-hidden>
                      {exp.code}
                    </div>

                    <div className="relative grid gap-8 md:grid-cols-12">
                      <div className="md:col-span-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                            {exp.type}
                          </span>
                          <span className="font-mono text-[11px] text-mist">{exp.period}</span>
                        </div>
                        <h3 className="mt-5 font-display text-3xl leading-tight text-ice md:text-4xl">{exp.role}</h3>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{exp.org}</p>
                        <p className="mt-5 font-serif text-lg italic leading-snug text-ice-2/90">{exp.summary}</p>
                      </div>
                      <ul className="flex flex-col gap-3.5 md:col-span-7 md:border-l md:border-line md:pl-8">
                        {exp.points.map(pt => (
                          <li key={pt} className="flex gap-3.5 text-[14.5px] leading-relaxed text-ice-2/90">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
