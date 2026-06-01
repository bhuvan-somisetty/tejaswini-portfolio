'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const requestRef = useRef<number>(0);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      // Check if hovering interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovered(!!(el && (
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') ||
        (el as HTMLElement).style?.cursor === 'pointer'
      )));
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.1);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.1);
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          width: hovered ? 48 : clicked ? 20 : 32,
          height: hovered ? 48 : clicked ? 20 : 32,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full rounded-full border border-[#00F5D4] opacity-60"
          style={{
            boxShadow: '0 0 15px rgba(0,245,212,0.4)',
            transition: 'all 0.15s ease',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: targetPos.current.x,
          top: targetPos.current.y,
          transform: 'translate(-50%, -50%)',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00F5D4',
          boxShadow: '0 0 10px rgba(0,245,212,0.8)',
          transition: 'transform 0.05s',
        }}
      />

      {/* Ambient glow trail */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,212,0.04) 0%, rgba(56,189,248,0.02) 40%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </>
  );
}
