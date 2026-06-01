'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

interface DomainData {
  id: string;
  title: string;
  icon: string;
  description: string;
  workflow: WorkflowStep[];
}

const domains: DomainData[] = [
  {
    id: 'clinical-pharmacy',
    title: 'Clinical Pharmacy',
    icon: '💊',
    description: 'Bedside pharmacy clerkship operations focusing on optimizing pharmacotherapy on medical ward rounds.',
    workflow: [
      { step: '01', title: 'Medication Reconciliation', desc: 'Appraising home medication lists on admission for correctness.' },
      { step: '02', title: 'Chart Assessment', desc: 'Evaluating clinical lab records for drug dosage and interactions.' },
      { step: '03', title: 'Rounds Collaboration', desc: 'Proposing dosage adjustments directly to ICU/medicine teams.' },
      { step: '04', title: 'Inpatient Counseling', desc: 'Conducting patient counseling and discharge briefings.' },
    ],
  },
  {
    id: 'patient-safety',
    title: 'Patient Safety',
    icon: '🛡️',
    description: 'Clinical safety checkpoints designed to limit drug-related errors and ensure safe pharmacotherapy.',
    workflow: [
      { step: '01', title: 'Toxicity Monitoring', desc: 'Monitoring inpatient files for drug side-effects and warnings.' },
      { step: '02', title: 'Causality Appraisal', desc: 'Evaluating drug causality indexing using standard clinical algorithms.' },
      { step: '03', title: 'LASA Inspection', desc: 'Reviewing Look-Alike Sound-Alike medication lists to prevent mistakes.' },
      { step: '04', title: 'Ward Safeguards', desc: 'Integrating double-check systems on high-alert medications.' },
    ],
  },
  {
    id: 'healthcare-quality',
    title: 'Healthcare Quality',
    icon: '📋',
    description: 'Analyzing institutional clinical data against standard guidelines to refine hospital quality standards.',
    workflow: [
      { step: '01', title: 'Record Auditing', desc: 'Reviewing active patient files for medical record keeping.' },
      { step: '02', title: 'Formulary Checks', desc: 'Verifying hospital medication compliance with formulary lists.' },
      { step: '03', title: 'Audit Aggregation', desc: 'Compiling audit sheets to locate practice gaps.' },
      { step: '04', title: 'Protocol Updates', desc: 'Proposing safe prescribing procedures to clinical boards.' },
    ],
  },
  {
    id: 'clinical-research',
    title: 'Clinical Research',
    icon: '🔬',
    description: 'Designing study protocols, collecting patient statistics, and writing clinical summaries.',
    workflow: [
      { step: '01', title: 'Protocol Design', desc: 'Defining study parameters, inclusion criteria, and institutional approvals.' },
      { step: '02', title: 'Data Extraction', desc: 'Appraising files to compile clinical data.' },
      { step: '03', title: 'Statistical Modeling', desc: 'Evaluating clinical indicators using research software.' },
      { step: '04', title: 'Manuscript Review', desc: 'Drafting research papers and scientific abstracts.' },
    ],
  },
  {
    id: 'pharmacovigilance',
    title: 'Pharmacovigilance',
    icon: '🔍',
    description: 'Adverse Drug Reaction monitoring, documentation, and reporting to regulatory platforms.',
    workflow: [
      { step: '01', title: 'Event Detection', desc: 'Detecting ADRs during routine rounds or file audits.' },
      { step: '02', title: 'Severity Grading', desc: 'Grading event severity using clinical algorithms.' },
      { step: '03', title: 'Vigiflow Reporting', desc: 'Drafting regulatory reports for IPC reporting portals.' },
      { step: '04', title: 'Staff Briefings', desc: 'Sharing ADR safety alerts with the medical team.' },
    ],
  },
  {
    id: 'antibiotic-stewardship',
    title: 'Antibiotic Stewardship',
    icon: '🦠',
    description: 'Reviewing antibiotic prescriptions to align with global stewardship guidelines and combat drug resistance.',
    workflow: [
      { step: '01', title: 'Critique & Screen', desc: 'Screening antibiotic orders in the ICU.' },
      { step: '02', title: 'AWaRe Classification', desc: 'Categorizing agents as Access, Watch, or Reserve.' },
      { step: '03', title: 'Culture Review', desc: 'Matching therapy orders against lab microbiology cultures.' },
      { step: '04', title: 'Pathogen De-escalation', desc: 'Proposing transitions to narrow-spectrum antibiotic agents.' },
    ],
  },
  {
    id: 'evidence-based-medicine',
    title: 'Evidence-Based Medicine',
    icon: '📖',
    description: 'Accessing and appraising medical literature to solve complex pharmacotherapy challenges.',
    workflow: [
      { step: '01', title: 'Define Challenge', desc: 'Defining complex clinical queries during ward rounds.' },
      { step: '02', title: 'Database Appraisal', desc: 'Searching PubMed, Medscape, and WHO databases for answers.' },
      { step: '03', title: 'Appraise Strength', desc: 'Evaluating evidence grading for hospital application.' },
      { step: '04', title: 'Therapeutic Advice', desc: 'Recommending evidence-based therapy modifications.' },
    ],
  },
  {
    id: 'medication-safety',
    title: 'Medication Safety',
    icon: '🛡️',
    description: 'Ward checks on looking, labeling, storing, and dispensing drugs safely.',
    workflow: [
      { step: '01', title: 'Storage Appraisal', desc: 'Auditing high-alert drug storage cabinets.' },
      { step: '02', title: 'Verification checks', desc: 'Double-checking dosing calculations.' },
      { step: '03', title: 'Dispensing Audit', desc: 'Reviewing inpatient drug tray prep.' },
      { step: '04', title: 'Counseling Rounds', desc: 'Educating ward nurses on administration guidelines.' },
    ],
  },
];

const milestones = [
  { term: 'Clerkships', label: '6 CLINICAL DEPARTMENTS COMPLETE' },
  { term: 'Rounds', label: '1000+ Bedside Cases Logged' },
  { term: 'Stewardship', label: 'WHO AWaRe Research Completed' },
  { term: 'Quality Audits', label: 'Clinical Safety Audits Conducted' },
];

export default function HealthcareCommandCenter() {
  const [activeTab, setActiveTab] = useState(domains[0].id);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const activeDomain = domains.find(d => d.id === activeTab) || domains[0];

  return (
    <section id="command-center" className="section-padding scroll-mt-24" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Centered Chapter Heading */}
        <div className="text-center max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Clinical Competence Mapping
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            HEALTHCARE EXPERTISE
          </motion.h2>
        </div>

        {/* Structured specialties card with 40-50px gap settings */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="relative grid lg:grid-cols-12 gap-8 card p-8 border border-[#2dd4bf]/20 bg-[#0f0f1a]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[CONSOLE.OPS // SYS.RUN]</span>
          {/* Left domain tab selector */}
          <div className="lg:col-span-4 flex flex-col gap-2 border-r border-white/[0.04] pr-0 lg:pr-6">
            <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-4 text-left">
              CLINICAL SPECIALTIES
            </span>
            <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {domains.map(domain => {
                const isActive = domain.id === activeTab;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveTab(domain.id)}
                    className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? 'bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-white shadow-[0_0_15px_rgba(45,212,191,0.02)]'
                        : 'bg-transparent border border-transparent text-[#cbd5e1] hover:bg-white/[0.02] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{domain.icon}</span>
                      <span className="text-xs font-bold tracking-tight">{domain.title}</span>
                    </div>
                    {isActive && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"
                        layoutId="activeTabDot"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right details pane showing Clinical Workflow pathway */}
          <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6 pt-6 lg:pt-0">
            <div>
              {/* Header (Centered) */}
              <div className="flex flex-col items-center justify-center mb-6 text-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/[0.01] border border-white/[0.05] flex items-center justify-center text-lg">
                  {activeDomain.icon}
                </div>
                <div>
                  <span className="text-[#2dd4bf] text-[9px] font-mono font-bold tracking-widest uppercase block text-center">PRACTICE DOMAIN</span>
                  <h3 className="text-white text-base font-bold tracking-tight mt-0.5 text-center">{activeDomain.title}</h3>
                </div>
              </div>

              {/* Description (Centered) */}
              <p className="text-[#cbd5e1] text-xs leading-relaxed mb-8 bg-white/[0.005] border border-white/[0.03] p-4 rounded-xl text-center max-w-2xl mx-auto">
                {activeDomain.description}
              </p>

              {/* Clinical Protocol Workflow Diagram */}
              <div className="text-center">
                <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-4 text-center">
                  CLINICAL ACTION WORKFLOW
                </span>
                
                {/* 4-step flowchart block (Enforced 24px/28px vertical gap grid) */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {activeDomain.workflow.map((step, idx) => (
                    <div key={idx} className="bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl flex items-start gap-4 transition-colors hover:bg-white/[0.02]">
                      <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf] flex items-center justify-center font-mono font-bold text-[9px] flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="text-white text-xs font-bold font-mono tracking-tight">{step.title}</h4>
                        <p className="text-[#cbd5e1] text-[10px] leading-normal mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Increased vertical spacing (mt-24 = 96px) between the cards and bottom milestones strip */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24 text-center"
        >
          {milestones.map((m, idx) => (
            <div key={idx} className="card-subtle p-5 border border-[#2dd4bf]/10 bg-[#0f0f1a]/20">
              <div className="text-[#2dd4bf] text-xs font-mono font-bold tracking-wider mb-1 uppercase">{m.term}</div>
              <div className="text-[#cbd5e1] text-[10px] leading-tight font-semibold mt-1.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
