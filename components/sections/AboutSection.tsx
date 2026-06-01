'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const credentials = [
  { icon: '🎓', label: 'Institution', val: 'Karnataka College of Pharmacy' },
  { icon: '📄', label: 'Program', val: 'Doctor of Pharmacy (Pharm.D)' },
  { icon: '🏆', label: 'Academic Standing', val: 'Distinction — All Years' },
  { icon: '👑', label: 'Leadership', val: 'Class Representative' },
  { icon: '🌐', label: 'Languages', val: 'Telugu • English • Kannada • Hindi' },
  { icon: '💖', label: 'Volunteer', val: 'NSS • Medical Camps' },
];

const expertise = [
  'Clinical Pharmacy',
  'Healthcare Quality',
  'Patient Safety',
  'Clinical Research',
  'Pharmacovigilance',
  'Medication Safety',
  'Antibiotic Stewardship',
  'Evidence-Based Medicine',
];

const clinicalPathway = [
  {
    stage: '01',
    name: 'General Medicine Ward',
    desc: 'Medication reconciliation, adverse drug reaction audits, and patient counseling.',
  },
  {
    stage: '02',
    name: 'Intensive Care Unit (ICU)',
    desc: 'Pharmacokinetic dosing support, reviewing high-alert medications, and critical rounds.',
  },
  {
    stage: '03',
    name: 'HICU (High Dependency ICU)',
    desc: 'Management of step-down critical care patients and safety-sensitive titration.',
  },
  {
    stage: '04',
    name: 'Cardiology Division',
    desc: 'Appraising antithrombotic therapies and assessing guideline adherence.',
  },
  {
    stage: '05',
    name: 'Paediatric Ward',
    desc: 'Weight-based dosing checks, child pharmacotherapy review, and immunization guidelines.',
  },
  {
    stage: '06',
    name: 'Healthcare Quality Dept',
    desc: 'Designing hospital audit sheets and auditing compliance with safety indicators.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding scroll-mt-24" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Centered Chapter Heading */}
        <div className="text-center max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Biography &amp; Dossier
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            ABOUT
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ── Left Column: Biography & Areas of Specialization ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full justify-between">
            {/* Biography Card */}
            <motion.div
              custom={2} variants={fadeUp}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="relative card p-8 flex flex-col border border-[#2dd4bf]/20 bg-[#0f0f1a]/50 h-full"
            >
              <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[SYS.BIO // CLN.SCI]</span>
              <h3 className="text-[#2dd4bf] text-[10px] tracking-wider uppercase font-bold font-mono mb-6 pb-3 border-b border-[#2dd4bf]/15 text-center">
                BIOGRAPHY
              </h3>
              <div className="text-left flex flex-col gap-4">
                <p className="text-[#cbd5e1] text-xs md:text-sm leading-[1.8]">
                  I am a <strong>Final-Year Pharm.D Candidate</strong> at Karnataka College of Pharmacy, Bengaluru, specializing in clinical clerkships and drug safety operations in hospital wards. My clinical rotations span general medicine, critical care, pediatrics, and cardiology departments.
                </p>
                <p className="text-[#cbd5e1] text-xs md:text-sm leading-[1.8]">
                  My work concentrates on the intersection of clinical pharmacy and evidence-based practice. I collaborate directly with hospital medical teams on clinical rounds to reconcile medication regimens, report adverse drug events, and audit antibiotic compliance.
                </p>
              </div>
            </motion.div>

            {/* Areas of Expertise Card */}
            <motion.div
              custom={3} variants={fadeUp}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="relative card p-8 flex flex-col border border-[#2dd4bf]/20 bg-[#0f0f1a]/50"
            >
              <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[SPEC.VAL // 08.DOM]</span>
              <h3 className="text-[#475569] text-[10px] tracking-wider uppercase font-bold font-mono mb-4 text-center">
                AREAS OF SPECIALIZATION
              </h3>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="tag tag-teal text-[10px] font-semibold py-1.5 px-3"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Credentials ── */}
          <div className="lg:col-span-5 flex flex-col h-full">
            {/* Dossier Credentials Card */}
            <motion.div
              custom={4} variants={fadeUp}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="relative card p-8 flex flex-col border border-[#2dd4bf]/20 bg-[#0f0f1a]/50 h-full justify-between"
            >
              <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[DOS.LEVEL // AUTH.01]</span>
              <h3 className="text-[#2dd4bf] text-[10px] tracking-wider uppercase font-bold font-mono mb-6 pb-3 border-b border-[#2dd4bf]/15 text-center">
                CLINICAL DOSSIER
              </h3>

              <div className="flex flex-col gap-5 justify-between h-full">
                {credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-left">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/[0.04] flex items-center justify-center text-sm flex-shrink-0">
                      {cred.icon}
                    </div>
                    <div>
                      <div className="text-[#475569] text-[9px] font-mono font-bold uppercase tracking-wider">{cred.label}</div>
                      <div className="text-[#f1f5f9] text-xs font-semibold mt-0.5">{cred.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Centered Heading for Clinical Rotation Pathway ── */}
        <div className="text-center w-full mb-5 mt-16 flex flex-col items-center">
          <span className="eyebrow block mb-3 font-mono font-bold">ROTATION TIMELINE</span>
          <h3 className="display-lg text-white font-extrabold tracking-tight uppercase">
            CLINICAL ROTATION PATHWAY
          </h3>
        </div>

        {/* Centered Clinical Clerkship Pathway (Scientific Flowchart/Diagram) */}
        <div className="w-full max-w-3xl mx-auto text-left relative mt-5">
          {/* Visual vertical connector line down the middle/left */}
          <div className="absolute left-[15px] sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#2dd4bf]/40 via-[#a78bfa]/20 to-transparent -translate-x-1/2" />
          
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 w-full relative">
            {clinicalPathway.map((path, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 * idx, duration: 0.5 }}
                  className={`flex gap-6 items-start relative z-10 w-full ${
                    isEven ? 'sm:pr-4 sm:text-right sm:flex-row-reverse' : 'sm:pl-4 sm:col-start-2'
                  }`}
                >
                  {/* Glowing Node in the center or left */}
                  <div className="w-8 h-8 rounded-full bg-[#0f0f1a] border border-[#2dd4bf]/40 flex items-center justify-center text-[10px] text-[#2dd4bf] font-mono font-bold flex-shrink-0 shadow-[0_0_10px_rgba(45,212,191,0.15)]">
                    {path.stage}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold font-mono tracking-tight uppercase">{path.name}</h4>
                    <p className="text-[#cbd5e1] text-[11px] leading-relaxed mt-1">{path.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
