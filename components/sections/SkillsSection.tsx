'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const categories = [
  {
    title: 'Clinical Practice & Care',
    color: '#2dd4bf',
    description: 'Core clinical capabilities in direct patient care, counseling, and safety monitoring.',
    skills: [
      'Medication Reconciliation',
      'Patient Counselling & Education',
      'ADR Monitoring & Reporting',
      'Drug Information Services',
      'Therapeutic Drug Monitoring',
    ],
    highlights: [
      'Trained in General Medicine & Intensive Care environments',
      'Proficient in assessing complex patient medication regimens',
    ],
  },
  {
    title: 'Pharmacology & Therapeutics',
    color: '#60a5fa',
    description: 'Scientific knowledge base applied to patient-specific therapeutic planning.',
    skills: [
      'Clinical Pharmacology',
      'Pharmacokinetics & Pharmacodynamics',
      'Drug Interaction Review',
      'Evidence-Based Medicine',
      'Standard Treatment Guidelines (STGs)',
    ],
    highlights: [
      'Strong academic foundation in pediatric & cardiology pharmacotherapy',
      'Applied clinical guidelines to ensure rational drug selection',
    ],
  },
  {
    title: 'Research & Data Assessment',
    color: '#a78bfa',
    description: 'Methodologies and analysis tools for literature evaluation and clinical auditing.',
    skills: [
      'Study Design & Protocol Writing',
      'Clinical Data Collection & Auditing',
      'Literature Appraisal & Review',
      'Medical & Scientific Documentation',
    ],
    highlights: [
      'Conducted a prospective study on WHO AWaRe classification',
      'Assessed elder patient prescribing trends and drug burdens',
    ],
  },
  {
    title: 'Quality & Professionalism',
    color: '#fb923c',
    description: 'Collaborative, quality improvement, and safety monitoring practices in hospitals.',
    skills: [
      'Multidisciplinary Teamwork',
      'Clinical Audit Design & Execution',
      'Incident Reporting Systems',
      'Healthcare Quality Indicator Monitoring',
    ],
    highlights: [
      'Participated in Bangalore Baptist Hospital, Bangalore quality department initiatives',
      'Committed advocate for medication safety policy compliance',
    ],
  },
];

const tools = [
  { name: 'PubMed', cat: 'Research' },
  { name: 'Medscape', cat: 'Clinical Reference' },
  { name: 'UpToDate', cat: 'Clinical Reference' },
  { name: 'WHO Essential Medicines', cat: 'Guidelines' },
  { name: 'PvPI Portal', cat: 'Pharmacovigilance' },
  { name: 'BNF / CIMS', cat: 'Drug Reference' },
  { name: 'MS Office', cat: 'Productivity' },
  { name: 'SPSS / Excel', cat: 'Data Analysis' },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Header */}
        {/* Centered Chapter Heading */}
        <div className="text-center w-full max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Skills &amp; Competencies
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            SKILLS &amp; COMPETENCIES
          </motion.h2>
        </div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              custom={ci + 2} variants={fadeUp}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <h3 className="text-white font-semibold text-sm">{cat.title}</h3>
                </div>

                <p className="text-[#64748b] text-xs mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.skills.map(sk => (
                    <span key={sk} className="tag text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths / Highlights */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.04)]">
                <div className="text-[10px] tracking-wider text-[#475569] uppercase font-semibold mb-3">Highlights</div>
                <ul className="flex flex-col gap-2">
                  {cat.highlights.map((hl, hi) => (
                    <li key={hi} className="flex items-start gap-2.5 text-[#94a3b8] text-xs leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat.color, opacity: 0.7 }} />
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Platforms */}
        <motion.div
          custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mb-5"
        >
          <span className="text-[#475569] text-xs tracking-widest uppercase">Tools &amp; Platforms</span>
        </motion.div>
        <motion.div
          custom={7} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2.5"
        >
          {tools.map(t => (
            <div key={t.name} className="card-subtle px-4 py-2.5 flex items-center gap-2">
              <span className="text-[#94a3b8] text-xs font-medium">{t.name}</span>
              <span className="text-[#1e293b] text-[0.6rem]">{t.cat}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
