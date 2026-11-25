// Every piece of portfolio content lives here, once. Sections only read from this file.

export const profile = {
  firstName: 'Tejaswini',
  lastName: 'Somisetty',
  status: 'Final-Year Pharm.D Candidate',
  eyebrow: 'Future Clinical Scientist · 2026',
  college: 'Karnataka College of Pharmacy',
  city: 'Bengaluru, Karnataka, India',
  email: 'tejaswinisomisetty22@gmail.com',
  phoneDisplay: '+91 79957 14599',
  phoneHref: 'tel:+917995714599',
  linkedin:
    'https://www.linkedin.com/in/tejaswini-somisetty-1a7776340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  linkedinDisplay: 'linkedin.com/in/tejaswini-somisetty',
};

export const heroRoles = [
  'Clinical Pharmacy Specialist',
  'Antibiotic Stewardship Researcher',
  'Healthcare Quality & Audit Lead',
  'Patient Safety Advocate',
  'Doctor of Pharmacy (Pharm.D)',
];

export const heroBio =
  'Doctor of Pharmacy (Pharm.D) candidate specializing in clinical research, antimicrobial stewardship, and patient-centered pharmacotherapy. Translating complex laboratory data and drug studies into safe hospital rounds and clinical interventions.';

export const clinicalFocus =
  'Bridging the gap between molecular research and bedside clinical pharmacy to optimize drug safety and combat multi-drug resistant pathogens.';

export const heroStats = [
  { value: 5, suffix: '+', label: 'Certifications' },
  { value: 6, suffix: '', label: 'Clinical departments' },
  { value: 200, suffix: '', label: 'Patients in thesis study' },
];

export const specializations = [
  'Clinical Pharmacy',
  'Healthcare Quality',
  'Patient Safety',
  'Clinical Research',
  'Pharmacovigilance',
  'Medication Safety',
  'Antibiotic Stewardship',
  'Evidence-Based Medicine',
];

export const biography = [
  'I am a Final-Year Pharm.D Candidate at Karnataka College of Pharmacy, Bengaluru, specializing in clinical clerkships and drug safety operations in hospital wards. My clinical rotations span general medicine, critical care, pediatrics, and cardiology departments.',
  'My work concentrates on the intersection of clinical pharmacy and evidence-based practice. I collaborate directly with hospital medical teams on clinical rounds to reconcile medication regimens, report adverse drug events, and audit antibiotic compliance.',
  'My goal is to contribute to safer and more effective healthcare systems through clinical pharmacy practice, healthcare quality improvement, patient safety initiatives, and evidence-based research, while continuing to grow my professional expertise and leadership skills.',
];

export type CredentialIcon = 'institution' | 'program' | 'standing' | 'leadership' | 'languages' | 'volunteer';

export const credentials: { icon: CredentialIcon; label: string; value: string }[] = [
  { icon: 'institution', label: 'Institution', value: 'Karnataka College of Pharmacy' },
  { icon: 'program', label: 'Program', value: 'Doctor of Pharmacy (Pharm.D)' },
  { icon: 'standing', label: 'Academic Standing', value: 'Distinction — All Years' },
  { icon: 'leadership', label: 'Leadership', value: 'Class Representative' },
  { icon: 'languages', label: 'Languages', value: 'Telugu • English • Kannada • Hindi' },
  { icon: 'volunteer', label: 'Volunteer', value: 'NSS • Medical Camps' },
];

// Clinical rotations and the quality department, merged with the experience timeline
// so each placement appears once with its summary and its duties.
export const experiences = [
  {
    code: 'QLT',
    period: 'Jan 2025 – Present',
    role: 'Healthcare Quality Department Member',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Quality & Safety',
    summary: 'Designing hospital audit sheets and auditing compliance with safety indicators.',
    points: [
      'Collaborating on healthcare quality initiatives and patient safety protocols',
      'Supporting clinical audits and quality improvement projects',
      'Participating in multidisciplinary rounds and medication review committees',
      'Reviewing documentation and monitoring compliance with hospital quality standards',
      'Tracking quality indicators and supporting process improvement activities',
    ],
  },
  {
    code: 'ICU',
    period: '2024',
    role: 'ICU Clinical Pharmacy Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Intensive Care Unit',
    summary: 'Pharmacokinetic dosing support, reviewing high-alert medications, and critical rounds.',
    points: [
      'Monitored critically ill patients for drug-related problems',
      'Participated in ICU rounds; provided pharmacokinetic dosing recommendations',
      'Reviewed complex medication regimens for therapeutic duplications and interactions',
    ],
  },
  {
    code: 'HICU',
    period: '2024',
    role: 'HICU Clinical Pharmacy Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'High-Intensity Care Unit',
    summary: 'Management of step-down critical care patients and safety-sensitive titration.',
    points: [
      'Monitored step-down critical care patients for medication safety and compliance',
      'Collaborated with the healthcare team on ward rounds to optimize drug therapy',
      'Assessed high-alert drug infusions and titration protocols',
    ],
  },
  {
    code: 'GEN',
    period: '2024',
    role: 'General Medicine Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'General Medicine Ward',
    summary: 'Medication reconciliation, adverse drug reaction audits, and patient counseling.',
    points: [
      'Conducted medication reconciliation and patient counselling sessions',
      'Assessed prescription rationality and reported ADRs via PvPI system',
      'Participated in WHO AWaRe antibiotic classification data collection',
      'Joined ward rounds and case discussions; maintained clinical documentation and patient monitoring notes',
    ],
  },
  {
    code: 'CRD',
    period: '2023 – 2024',
    role: 'Cardiology & Paediatrics Rotation',
    org: 'Bangalore Baptist Hospital, Bangalore',
    type: 'Cardiology · Paediatric Ward',
    summary:
      'Appraising antithrombotic therapies and assessing guideline adherence; weight-based dosing checks, child pharmacotherapy review, and immunization guidelines.',
    points: [
      'Assisted in antithrombotic therapy monitoring for cardiac patients',
      'Reviewed paediatric dosing, weight-based calculations, and immunisation schedules',
      'Presented drug information bulletins to the medical team',
    ],
  },
];

export type DomainIcon =
  | 'pill' | 'shield' | 'clipboard' | 'microscope' | 'search' | 'bug' | 'book' | 'syringe';

export const domains: { id: string; title: string; icon: DomainIcon; description: string; workflow: { title: string; desc: string }[] }[] = [
  {
    id: 'clinical-pharmacy',
    title: 'Clinical Pharmacy',
    icon: 'pill',
    description: 'Bedside pharmacy clerkship operations focusing on optimizing pharmacotherapy on medical ward rounds.',
    workflow: [
      { title: 'Medication Reconciliation', desc: 'Appraising home medication lists on admission for correctness.' },
      { title: 'Chart Assessment', desc: 'Evaluating clinical lab records for drug dosage and interactions.' },
      { title: 'Rounds Collaboration', desc: 'Proposing dosage adjustments directly to ICU/medicine teams.' },
      { title: 'Inpatient Counseling', desc: 'Conducting patient counseling and discharge briefings.' },
    ],
  },
  {
    id: 'patient-safety',
    title: 'Patient Safety',
    icon: 'shield',
    description: 'Clinical safety checkpoints designed to limit drug-related errors and ensure safe pharmacotherapy.',
    workflow: [
      { title: 'Toxicity Monitoring', desc: 'Monitoring inpatient files for drug side-effects and warnings.' },
      { title: 'Causality Appraisal', desc: 'Evaluating drug causality indexing using standard clinical algorithms.' },
      { title: 'LASA Inspection', desc: 'Reviewing Look-Alike Sound-Alike medication lists to prevent mistakes.' },
      { title: 'Ward Safeguards', desc: 'Integrating double-check systems on high-alert medications.' },
    ],
  },
  {
    id: 'healthcare-quality',
    title: 'Healthcare Quality',
    icon: 'clipboard',
    description: 'Analyzing institutional clinical data against standard guidelines to refine hospital quality standards.',
    workflow: [
      { title: 'Record Auditing', desc: 'Reviewing active patient files for medical record keeping.' },
      { title: 'Formulary Checks', desc: 'Verifying hospital medication compliance with formulary lists.' },
      { title: 'Audit Aggregation', desc: 'Compiling audit sheets to locate practice gaps.' },
      { title: 'Protocol Updates', desc: 'Proposing safe prescribing procedures to clinical boards.' },
    ],
  },
  {
    id: 'clinical-research',
    title: 'Clinical Research',
    icon: 'microscope',
    description: 'Designing study protocols, collecting patient statistics, and writing clinical summaries.',
    workflow: [
      { title: 'Protocol Design', desc: 'Defining study parameters, inclusion criteria, and institutional approvals.' },
      { title: 'Data Extraction', desc: 'Appraising files to compile clinical data.' },
      { title: 'Statistical Modeling', desc: 'Evaluating clinical indicators using research software.' },
      { title: 'Manuscript Review', desc: 'Drafting research papers and scientific abstracts.' },
    ],
  },
  {
    id: 'pharmacovigilance',
    title: 'Pharmacovigilance',
    icon: 'search',
    description: 'Adverse Drug Reaction monitoring, documentation, and reporting to regulatory platforms.',
    workflow: [
      { title: 'Event Detection', desc: 'Detecting ADRs during routine rounds or file audits.' },
      { title: 'Severity Grading', desc: 'Grading event severity using clinical algorithms.' },
      { title: 'Vigiflow Reporting', desc: 'Drafting regulatory reports for IPC reporting portals.' },
      { title: 'Staff Briefings', desc: 'Sharing ADR safety alerts with the medical team.' },
    ],
  },
  {
    id: 'antibiotic-stewardship',
    title: 'Antibiotic Stewardship',
    icon: 'bug',
    description: 'Reviewing antibiotic prescriptions to align with global stewardship guidelines and combat drug resistance.',
    workflow: [
      { title: 'Critique & Screen', desc: 'Screening antibiotic orders in the ICU.' },
      { title: 'AWaRe Classification', desc: 'Categorizing agents as Access, Watch, or Reserve.' },
      { title: 'Culture Review', desc: 'Matching therapy orders against lab microbiology cultures.' },
      { title: 'Pathogen De-escalation', desc: 'Proposing transitions to narrow-spectrum antibiotic agents.' },
    ],
  },
  {
    id: 'evidence-based-medicine',
    title: 'Evidence-Based Medicine',
    icon: 'book',
    description: 'Accessing and appraising medical literature to solve complex pharmacotherapy challenges.',
    workflow: [
      { title: 'Define Challenge', desc: 'Defining complex clinical queries during ward rounds.' },
      { title: 'Database Appraisal', desc: 'Searching PubMed, Medscape, and WHO databases for answers.' },
      { title: 'Appraise Strength', desc: 'Evaluating evidence grading for hospital application.' },
      { title: 'Therapeutic Advice', desc: 'Recommending evidence-based therapy modifications.' },
    ],
  },
  {
    id: 'medication-safety',
    title: 'Medication Safety',
    icon: 'syringe',
    description: 'Ward checks on looking, labeling, storing, and dispensing drugs safely.',
    workflow: [
      { title: 'Storage Appraisal', desc: 'Auditing high-alert drug storage cabinets.' },
      { title: 'Verification Checks', desc: 'Double-checking dosing calculations.' },
      { title: 'Dispensing Audit', desc: 'Reviewing inpatient drug tray prep.' },
      { title: 'Counseling Rounds', desc: 'Educating ward nurses on administration guidelines.' },
    ],
  },
];

export const milestones = [
  { term: 'Clerkships', label: '6 Clinical Departments Complete' },
  { term: 'Rounds', label: '1000+ Bedside Cases Logged' },
  { term: 'Stewardship', label: 'WHO AWaRe Research Completed' },
  { term: 'Quality Audits', label: 'Clinical Safety Audits Conducted' },
];

export const thesis = {
  title:
    'A Prospective Observational Study on Compliance with WHO AWaRe Classification in Prescribing Antibiotics in Critical Care Units at a Tertiary Care Hospital',
  tags: ['Prospective Observational Study', 'WHO AWaRe Classification', 'Critical Care'],
  location: 'Bengaluru, India',
  meta: 'Pharm.D Dissertation · Rajiv Gandhi University of Health Sciences · Guide: Dr. Balakeshwa Ramaiah, HOD, Dept. of Pharmacy Practice',
  description:
    'Assessed whether antibiotic prescribing in the ICU and HICU of a tertiary care teaching hospital followed the WHO AWaRe (Access, Watch, Reserve) classification, and evaluated prescribing appropriateness, the microbiological and resistance profile, adverse drug reactions, IV-to-oral conversion and therapeutic duplication.',
  findingNote:
    'Access antibiotics made up only 6.74% of prescriptions, far below the WHO target. Klebsiella pneumoniae and E. coli were the main isolates, with high resistance to early-generation cephalosporins and ampicillin and emerging colistin resistance.',
  target: 60,
  aware: [
    { name: 'Access', pct: 6.74, color: '#5FD3A6' },
    { name: 'Watch', pct: 70.09, color: '#F5C451' },
    { name: 'Reserve', pct: 23.17, color: '#F4574B' },
  ],
  stats: [
    { value: 200, decimals: 0, suffix: '', label: 'ICU & HICU patients' },
    { value: 341, decimals: 0, suffix: '', label: 'Antibiotics assessed' },
    { value: 5.0, decimals: 1, suffix: '%', label: 'Patients with an ADR' },
    { value: 6.5, decimals: 1, suffix: '%', label: 'IV-to-oral conversion' },
    { value: 8.5, decimals: 1, suffix: '%', label: 'Therapeutic duplication' },
  ],
  methodology: [
    { name: 'Literature Review', detail: 'Reviewed WHO, ICMR and published ICU studies on antibiotic use and resistance.' },
    { name: 'Data Collection', detail: 'Enrolled 200 ICU and HICU patients prospectively using a structured data collection form.' },
    { name: 'Data Documentation', detail: 'Recorded 341 antibiotics with culture, susceptibility, ADR and IV-to-oral details.' },
    { name: 'Research Analysis', detail: 'Classified drugs by WHO AWaRe 2023/2025; chi-square, Fisher’s exact and t-tests.' },
    { name: 'Report Preparation', detail: 'Wrote and submitted the dissertation to RGUHS for the Pharm.D degree.' },
  ],
  framework: [
    { name: 'Access', desc: 'First-line options with lower resistance potential.', drugs: 'Amoxicillin, Ampicillin, Cephalexin', color: '#5FD3A6' },
    { name: 'Watch', desc: 'Restricted options with higher resistance potential.', drugs: 'Ciprofloxacin, Azithromycin, Ceftriaxone', color: '#F5C451' },
    { name: 'Reserve', desc: 'Last-resort options for multi-drug resistant strains.', drugs: 'Colistin, Linezolid, Polymyxin B', color: '#F4574B' },
  ],
  expertise: ['Antibiotic Stewardship', 'Rational Drug Use', 'Evidence-Based Medicine', 'Clinical Research', 'Healthcare Outcomes'],
};

export type SkillIcon = 'clinical' | 'quality' | 'research' | 'technical';

export const skillCategories: { title: string; icon: SkillIcon; skills: string[] }[] = [
  {
    title: 'Clinical Skills',
    icon: 'clinical',
    skills: [
      'Medication Review',
      'Prescription Assessment',
      'ADR Monitoring',
      'Medication Reconciliation',
      'Patient Counselling',
      'Drug Information Services',
      'Clinical Documentation',
      'Patient Monitoring',
    ],
  },
  {
    title: 'Healthcare Quality',
    icon: 'quality',
    skills: [
      'Clinical Audit Support',
      'Documentation Review',
      'Compliance Monitoring',
      'Quality Indicator Assessment',
      'Patient Safety Practices',
      'Quality Improvement Activities',
    ],
  },
  {
    title: 'Research Skills',
    icon: 'research',
    skills: [
      'Literature Review',
      'Data Collection',
      'Scientific Writing',
      'Research Documentation',
      'Evidence-Based Medicine',
      'Research Analysis',
    ],
  },
  {
    title: 'Technical Skills',
    icon: 'technical',
    skills: [
      'Microsoft Word / Excel',
      'Microsoft PowerPoint',
      'Medical Documentation',
      'Healthcare Data Mgmt',
      'Medical Coding (ICD-10)',
    ],
  },
];

export const strengths = [
  'Analytical Thinking',
  'Communication Skills',
  'Team Collaboration',
  'Attention to Detail',
  'Adaptability',
  'Problem Solving',
  'Professionalism',
  'Time Management',
  'Leadership Potential',
];

export type CertIcon = 'heart' | 'scale' | 'pen' | 'bot' | 'binary';

export const certifications: { title: string; issuer: string; status: string; icon: CertIcon; desc: string }[] = [
  {
    title: 'Basic Life Support (BLS)',
    issuer: 'Hands-on Resuscitation Training',
    status: 'Trained',
    icon: 'heart',
    desc: 'High-quality CPR for adults, children and infants, early AED use, rescue breaths with a barrier device, choking relief, the Chain of Survival and team-based resuscitation.',
  },
  {
    title: 'Ethics Review of Health Research',
    issuer: 'Healthcare Research Authority',
    status: 'Professional',
    icon: 'scale',
    desc: 'Research ethics, ethical review processes, and responsible conduct of health research.',
  },
  {
    title: 'Scientific Writing in Health Research',
    issuer: 'Academic Medical Consortium',
    status: 'Advanced',
    icon: 'pen',
    desc: 'Scientific communication, research writing, manuscript preparation, and academic publication.',
  },
  {
    title: 'AI in Women’s Health',
    issuer: 'Healthcare Innovation Summit',
    status: 'Participation',
    icon: 'bot',
    desc: 'Artificial Intelligence applications in women’s health and future healthcare innovations.',
  },
  {
    title: 'Medical Coding Certification',
    issuer: 'E-Cell IIT Hyderabad · Skill Duniya',
    status: 'Certified',
    icon: 'binary',
    desc: 'Medical coding fundamentals, healthcare documentation, and coding systems (ICD/CPT).',
  },
];

export const conference = {
  name: 'IPCON International Conference',
  full: 'International Pharmacy Conference (IPCON)',
  role: 'Participant',
  outcomes: [
    'International academic exposure',
    'Professional networking',
    'Current healthcare developments',
    'Learning from healthcare experts',
  ],
};

/** Webinar, workshop and bootcamp certificates, newest first. Images live in public/certificates. */
export const webinarCertificates: { title: string; issuer: string; date: string; kind: string; image: string; desc: string }[] = [
  {
    title: 'Digital Therapeutics (DTx): Economics, HEOR & Reimbursement Pathways',
    issuer: 'Institute of Health Economics and Policy Research (IHEPR) · CliMed Research Solutions · Dual Sphere Consulting',
    date: '5 Jul 2026',
    kind: 'Live workshop',
    image: '/certificates/digital-therapeutics-heor.webp',
    desc: 'Two-hour live online workshop on digital health market access, health economics and outcomes research, and reimbursement pathways.',
  },
  {
    title: 'Advanced Hypertension Management',
    issuer: 'CliMed.Edu · CliMed Research Solutions',
    date: '2 Jul 2026',
    kind: 'Webinar',
    image: '/certificates/advanced-hypertension.webp',
    desc: 'Navigating complex hypertension cases with clinical excellence.',
  },
  {
    title: 'AI Bootcamp: Python Programming for Pharmaceutical Sciences',
    issuer: 'CliMed Research Solutions · Geetanjali University · Geetanjali Institute of Pharmacy',
    date: '1 Jul 2026',
    kind: 'Bootcamp',
    image: '/certificates/ai-bootcamp-python.webp',
    desc: 'Bootcamp demo class and webinar on Python programming for pharmaceutical sciences, under the Skill Development Program.',
  },
  {
    title: 'Pharmacy Practice for Better Health Outcomes',
    issuer: 'HealthFirst Academy · HealthTech Innovations · PharmaCare Foundation',
    date: '18 Mar 2026',
    kind: 'Webinar',
    image: '/certificates/pharmacy-practice-outcomes.webp',
    desc: 'Ensuring quality, safety and innovation in pharmacy practice.',
  },
  {
    title: 'Clinical Trials',
    issuer: 'Community Pharmacist Aid (CPA), Scientific Division',
    date: '27 Jan 2026',
    kind: 'Live webinar',
    image: '/certificates/clinical-trials-cpa.webp',
    desc: 'Live webinar on the design and conduct of clinical trials.',
  },
  {
    title: 'Pharmacist in ICU & Emergency Care · Gateway to UAE Licensing',
    issuer: 'CliMed Research Solutions · RxEdu',
    date: '20 Jan 2026',
    kind: 'Webinar',
    image: '/certificates/pharmacist-icu-emergency-uae.webp',
    desc: 'The pharmacist’s role in ICU and emergency care, and the UAE licensing exams (BHA, HAAD, MOH).',
  },
  {
    title: 'Digital Health & Technology Innovations in Pharmacy Practice',
    issuer: 'CliMed Research Solutions · RxEdu · MedTech Innovations',
    date: '18 Jan 2026',
    kind: 'Webinar',
    image: '/certificates/digital-health-technology.webp',
    desc: 'Advancing knowledge at the intersection of healthcare, pharmacy and technology.',
  },
  {
    title: 'Future of Pharmacy: Integrating Healthcare, Technology & Patient-Centered Care',
    issuer: 'CliMed Research Solutions · RxEdu · HealthTech Innovations',
    date: '15 Jan 2026',
    kind: 'Webinar',
    image: '/certificates/future-of-pharmacy.webp',
    desc: 'How technology and patient-centred care are reshaping pharmacy practice.',
  },
];

export const workshops = [
  'Clinical Pharmacy',
  'Pharmacovigilance',
  'Healthcare Quality',
  'Medication Safety',
  'AI in Healthcare',
  'Research Methodology',
  'Emerging Healthcare Technologies',
];

export const contactIntro =
  'Doctor of Pharmacy candidate seeking to contribute to clinical pharmacy, pharmacotherapy research, and hospital quality management. Get in touch to discuss research collaborations or clinical vacancies.';

export const availability = {
  heading: 'Focus Clinical Areas',
  note: 'Completing Pharm.D studies in mid-2026 · Available for full-time roles',
  roles: [
    'Clinical Research Associate Positions',
    'Hospital Pharmacy Residency',
    'Healthcare Quality & Accreditation',
    'Pharmacovigilance & Drug Safety Roles',
    'Academic & Teaching Positions',
  ],
  relocation: 'Bengaluru, India · Willing to relocate for clinical pharmacy or safety roles.',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
