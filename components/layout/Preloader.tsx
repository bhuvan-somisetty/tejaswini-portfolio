'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 500); }, 200);
          return 100;
        }
        return p + Math.random() * 18 + 6;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#09090f' }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="text-white font-bold text-xl tracking-tight mb-1">
              Tejaswini Somisetty
            </div>
            <div className="text-[#475569] text-xs tracking-[0.2em]">PHARM.D CANDIDATE</div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-48"
          >
            <div className="h-[1px] bg-[#1e293b] rounded overflow-hidden">
              <motion.div
                className="h-full bg-[#2dd4bf]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="text-[#334155] text-[10px] text-right mt-2 tabular-nums">
              {Math.min(Math.round(progress), 100)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
