'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    period: 'Jan 2025 – Present',
    role: 'Healthcare Quality Department Member',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Quality & Safety',
    color: '#2dd4bf',
    points: [
      'Collaborating on healthcare quality initiatives and patient safety protocols',
      'Supporting clinical audits and quality improvement projects',
      'Participating in multidisciplinary rounds and medication review committees',
    ],
  },
  {
    period: '2024',
    role: 'ICU Clinical Pharmacy Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Clinical Training',
    color: '#60a5fa',
    points: [
      'Monitored critically ill patients for drug-related problems',
      'Participated in ICU rounds; provided pharmacokinetic dosing recommendations',
      'Reviewed complex medication regimens for therapeutic duplications and interactions',
    ],
  },
  {
    period: '2024',
    role: 'HICU Clinical Pharmacy Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Clinical Training',
    color: '#14b8a6',
    points: [
      'Monitored step-down critical care patients for medication safety and compliance',
      'Collaborated with the healthcare team on ward rounds to optimize drug therapy',
      'Assessed high-alert drug infusions and titration protocols',
    ],
  },
  {
    period: '2024',
    role: 'General Medicine Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Clinical Training',
    color: '#a78bfa',
    points: [
      'Conducted medication reconciliation and patient counselling sessions',
      'Assessed prescription rationality and reported ADRs via PvPI system',
      'Participated in WHO AWaRe antibiotic classification data collection',
    ],
  },
  {
    period: '2023 – 2024',
    role: 'Cardiology & Paediatrics Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Clinical Training',
    color: '#f43f5e',
    points: [
      'Assisted in antithrombotic therapy monitoring for cardiac patients',
      'Reviewed paediatric dosing, weight-based calculations, and immunisation schedules',
      'Presented drug information bulletins to the medical team',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section-padding scroll-mt-24" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Centered Chapter Heading */}
        <div className="text-center max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Milestones &amp; Rotations
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            CLINICAL EXPERIENCE
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative text-left">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-[1px] hidden lg:block"
            style={{ background: 'linear-gradient(180deg, rgba(45,212,191,0.3), rgba(45,212,191,0.05) 80%, transparent)' }}
          />

          <div className="flex flex-col gap-12 lg:gap-16 lg:pl-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                custom={i + 2} variants={fadeUp}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[2.65rem] top-2.5 w-2.5 h-2.5 rounded-full hidden lg:block"
                  style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}50` }}
                />

                <div className="relative card p-8">
                  <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[EXP.SYS // {i === 0 ? 'QLT.SFT' : i === 1 ? 'ICU.TRN' : i === 2 ? 'HIC.TRN' : i === 3 ? 'GEN.TRN' : 'CRD.TRN'}]</span>
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="tag text-[0.65rem]"
                        style={{
                          borderColor: `${exp.color}30`,
                          color: exp.color,
                          background: `${exp.color}0f`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="text-[#334155] text-xs font-mono">{exp.period}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-base mb-1">{exp.role}</h3>
                  <p className="text-[#94a3b8] text-xs mb-5 font-mono">{exp.org}</p>

                  {/* Points */}
                  <ul className="flex flex-col gap-2.5">
                    {exp.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-3 text-[#cbd5e1] text-xs leading-relaxed">
                        <span
                          className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                          style={{ background: exp.color }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
