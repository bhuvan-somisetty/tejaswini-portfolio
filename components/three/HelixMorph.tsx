'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

/** Small seeded PRNG so the particle layout is the same on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertex = /* glsl */ `
  attribute vec3 aText;
  attribute float aRand;
  attribute float aStrand;
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vRed;
  varying float vGold;
  varying float vAlpha;

  void main() {
    // Helix: spin around its own axis, then tilt across the screen.
    vec3 h = position;
    float a = uTime * 0.35;
    h.yz = mat2(cos(a), -sin(a), sin(a), cos(a)) * h.yz;
    float tilt = -0.28;
    h.xy = mat2(cos(tilt), -sin(tilt), sin(tilt), cos(tilt)) * h.xy;

    // Each particle leaves at its own moment, swirls, and lands on the word.
    float p = clamp((uProgress - aRand * 0.3) / 0.7, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);
    float lift = sin(p * 3.14159);
    vec3 swirl = vec3(sin(aRand * 40.0 + uTime) * 0.9, cos(aRand * 23.0 + uTime * 0.8) * 0.9, sin(aRand * 11.0) * 2.2) * lift;
    vec3 t = aText + vec3(0.0, sin(uTime * 1.6 + aRand * 30.0) * 0.012, 0.0);
    vec3 pos = mix(h, t, p) + swirl;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * mix(0.7 + aRand * 0.9, 1.25, p) / -mv.z;

    float strandRed = aStrand < 0.5 ? 1.0 : 0.0;
    vRed = mix(strandRed, step(0.9, aRand), p);
    vGold = (aStrand > 1.5 ? 1.0 : 0.0) * (1.0 - p) + step(0.55, aRand) * step(aRand, 0.75) * p;
    float rung = aStrand > 1.5 ? 0.7 : 1.0;
    vAlpha = mix(0.55 * rung, 0.95, p);
  }
`;

const fragment = /* glsl */ `
  varying float vRed;
  varying float vGold;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    vec3 porcelain = vec3(1.0, 0.941, 0.835);
    vec3 red = vec3(1.0, 0.286, 0.239);
    vec3 gold = vec3(0.839, 0.698, 0.431);
    vec3 c = mix(mix(porcelain, gold, vGold), red, vRed);
    gl_FragColor = vec4(c, glow * glow * vAlpha);
  }
`;

function Particles({ progress, word, small }: { progress: MotionValue<number>; word: string; small: boolean }) {
  const count = small ? 3200 : 6500;
  const viewport = useThree(s => s.viewport);
  const dpr = useThree(s => s.viewport.dpr);
  const invalidate = useThree(s => s.invalidate);
  const geo = useRef<THREE.BufferGeometry>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { helix, rand, strand } = useMemo(() => {
    const r = seeded(11);
    const helix = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const strand = new Float32Array(count);
    const length = 13;
    const radius = 1.05;
    const turns = 3.2;
    const rungs = 40;
    for (let i = 0; i < count; i++) {
      const kind = i % 5 === 4 ? 2 : i % 2;
      let x: number, y: number, z: number;
      if (kind < 2) {
        const t = r();
        const ang = t * turns * Math.PI * 2 + kind * Math.PI;
        x = (t - 0.5) * length;
        y = Math.cos(ang) * radius;
        z = Math.sin(ang) * radius;
      } else {
        const t = (Math.floor(r() * rungs) + 0.5) / rungs;
        const ang = t * turns * Math.PI * 2;
        const s = r() * 2 - 1;
        x = (t - 0.5) * length;
        y = Math.cos(ang) * radius * s;
        z = Math.sin(ang) * radius * s;
      }
      helix[i * 3] = x + (r() - 0.5) * 0.12;
      helix[i * 3 + 1] = y + (r() - 0.5) * 0.12;
      helix[i * 3 + 2] = z + (r() - 0.5) * 0.12;
      rand[i] = r();
      strand[i] = kind;
    }
    return { helix, rand, strand };
  }, [count]);

  // Target layout starts on the helix; the effect below fills it with the word's pixels.
  const text = useMemo(() => helix.slice(), [helix]);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !geo.current) return;
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-instrument').trim() || 'serif';
      const W = 1200;
      const H = 300;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.font = `italic 400 250px ${family}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.fillText(word, W / 2, H / 2 + 10);
      const data = ctx.getImageData(0, 0, W, H).data;
      const pts: number[] = [];
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
      const measured = ctx.measureText(word).width || W;
      const worldW = Math.min(viewport.width * 0.88, 11);
      const scale = worldW / measured;
      const attr = geo.current.getAttribute('aText') as THREE.BufferAttribute;
      const text = attr.array as Float32Array;
      const r = seeded(29);
      const offsetY = -viewport.height * 0.1;
      for (let i = 0; i < count; i++) {
        const k = Math.floor(r() * (pts.length / 2)) * 2;
        text[i * 3] = (pts[k] - W / 2) * scale + (r() - 0.5) * 0.02;
        text[i * 3 + 1] = -(pts[k + 1] - H / 2) * scale + offsetY + (r() - 0.5) * 0.02;
        text[i * 3 + 2] = (r() - 0.5) * 0.25;
      }
      attr.needsUpdate = true;
      invalidate();
    });
    return () => {
      cancelled = true;
    };
  }, [word, count, viewport.width, viewport.height, invalidate]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: small ? 34 : 30 },
      uPixelRatio: { value: 1 },
    }),
    [small],
  );

  // Redraw on scroll even when the frame loop is idle (reduced motion).
  useEffect(() => progress.on('change', () => invalidate()), [progress, invalidate]);

  useFrame((_, delta) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value += Math.min(delta, 0.05);
    u.uProgress.value = progress.get();
    u.uPixelRatio.value = dpr;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[helix, 3]} />
        <bufferAttribute attach="attributes-aText" args={[text, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
        <bufferAttribute attach="attributes-aStrand" args={[strand, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** A particle DNA helix that reassembles into a word as `progress` goes from 0 to 1. */
export default function HelixMorph({ progress, word, small = false }: { progress: MotionValue<number>; word: string; small?: boolean }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 10], fov: 35 }}>
      <Particles progress={progress} word={word} small={small} />
    </SceneCanvas>
  );
}
