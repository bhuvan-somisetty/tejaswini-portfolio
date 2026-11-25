'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, type CanvasProps } from '@react-three/fiber';

/**
 * Canvas that only renders while it is on screen, caps the pixel ratio,
 * and renders a single still frame for people who prefer reduced motion.
 */
export default function SceneCanvas({ children, className, camera, ...rest }: CanvasProps & { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Only ever rendered on the client (loaded with ssr: false), so window is available.
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={camera ?? { position: [0, 0, 7], fov: 35 }}
        frameloop={reduce ? 'demand' : visible ? 'always' : 'never'}
        {...rest}
      >
        {children}
      </Canvas>
    </div>
  );
}
