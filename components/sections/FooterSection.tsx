'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

export default function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-12" ref={ref}>
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div className="text-white font-semibold text-sm mb-1">
              Tejaswini<span className="text-[#2dd4bf]">.</span>
            </div>
            <div className="text-[#334155] text-xs">Pharm.D Candidate · Bengaluru, India</div>
          </motion.div>

          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-6"
          >
            <a href="mailto:tejaswinisomisetty22@gmail.com" className="text-[#475569] text-xs hover:text-[#2dd4bf] transition-colors">
              Email
            </a>
            <a href="https://www.linkedin.com/in/tejaswini-somisetty" target="_blank" rel="noopener noreferrer" className="text-[#475569] text-xs hover:text-[#2dd4bf] transition-colors">
              LinkedIn
            </a>
          </motion.div>

          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-[#1e293b] text-xs"
          >
            © {new Date().getFullYear()} Tejaswini Somisetty
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
