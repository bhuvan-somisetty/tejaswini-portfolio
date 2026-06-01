'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // 1–20, default 10
  glowColor?: string;
}

/**
 * Premium 3D tilt card with cursor-reactive lighting.
 * Wraps any content with physics-based tilt + mouse-position glow.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  intensity = 10,
  glowColor = '#00F5D4',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 200, damping: 25 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    rotateX.set(-dy * intensity);
    rotateY.set(dx * intensity);

    // Glow follows cursor within card
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [intensity, rotateX, rotateY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${glowColor}18 0%, transparent 65%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...style,
      }}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 30 } }}
    >
      {/* Cursor-reactive glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
        style={{ background: glowBackground }}
      />
      {children}
    </motion.div>
  );
}
