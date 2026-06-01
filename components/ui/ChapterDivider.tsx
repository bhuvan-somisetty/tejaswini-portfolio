'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

/**
 * Chapter divider between sections — a futuristic horizontal separator
 * with animated glow lines, hex markers, and data stream dots.
 */
export default function ChapterDivider({ className = '' }: Props) {
  return (
    <div className={`relative flex items-center justify-center py-8 overflow-hidden ${className}`}>
      {/* Left line */}
      <motion.div
        className="flex-1 h-[1px] max-w-xs"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.3))' }}
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Center cluster */}
      <div className="flex items-center gap-3 mx-6">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-6 h-6 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z"
              fill="none"
              stroke="rgba(0,245,212,0.5)"
              strokeWidth="1"
            />
            <circle cx="12" cy="12" r="2" fill="#00F5D4" />
          </svg>
        </motion.div>
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
        />
      </div>

      {/* Right line */}
      <motion.div
        className="flex-1 h-[1px] max-w-xs"
        style={{ background: 'linear-gradient(90deg, rgba(0,245,212,0.3), transparent)' }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 100% at 50% 50%, rgba(0,245,212,0.04), transparent)',
        }}
      />
    </div>
  );
}
