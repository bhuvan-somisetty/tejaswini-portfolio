'use client';

import { skillCategories, strengths } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';
import { skillIcons } from '@/components/ui/Icons';
import TiltCard from '@/components/ui/TiltCard';

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeading index="05" label="Verified Skillsets" title="Skills &" accent="competencies." />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => {
            const Icon = skillIcons[cat.icon];
            return (
              <Reveal as="li" key={cat.title} delay={i * 0.08}>
                <TiltCard max={7} className="glass h-full rounded-[28px]">
                  <div className="relative flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[11px] text-fog">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-[28px] leading-tight text-ice">{cat.title}</h3>
                    <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                      {cat.skills.map(s => (
                        <li key={s} className="flex items-center gap-3 text-[14px] text-ice-2/90">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal>
          <div className="mt-16 text-center">
            <h3 className="eyebrow">Professional strengths</h3>
            <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {strengths.map(s => (
                <li key={s} className="chip text-[13.5px]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
