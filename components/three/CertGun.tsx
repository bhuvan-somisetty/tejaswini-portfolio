'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

const VERMILLION = '#ff493d';
const PORCELAIN = '#fff0d5';
const CHERRY = '#2b0a13';

/** Side label drawn to a canvas, so no font file has to be downloaded. */
function useLabel(text: string) {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (ctx) {
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-archivo').trim() || 'Arial Black';
      ctx.fillStyle = PORCELAIN;
      ctx.font = `800 150px ${family}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 512, 136, 980);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [text]);
}

function Gun({ shots }: { shots: number }) {
  const group = useRef<THREE.Group>(null);
  const trigger = useRef<THREE.Mesh>(null);
  const kick = useRef(0);
  const label = useLabel('CERTIFIED');

  useEffect(() => {
    if (shots > 0) kick.current = 1;
  }, [shots]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    kick.current = Math.max(0, kick.current - delta * 7);
    const k = kick.current;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.position.x = 0.35 + k * 0.35;
    g.position.y = Math.sin(t * 1.1) * 0.06;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, 0.12 + k * 0.22 + py * 0.06, 0.15);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.42 + px * 0.18, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.08 - py * 0.08, 0.08);
    if (trigger.current) trigger.current.position.x = 0.2 + k * 0.12;
  });

  const red = <meshPhysicalMaterial color={VERMILLION} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />;
  const dark = <meshStandardMaterial color={CHERRY} roughness={0.6} />;

  return (
    <group ref={group} scale={0.9}>
      {/* Body */}
      <RoundedBox args={[3.4, 1.05, 0.82]} radius={0.14} smoothness={5} position={[0, 0.35, 0]}>
        {red}
      </RoundedBox>
      {/* Barrel block with the slot the certificates fly out of */}
      <RoundedBox args={[0.7, 0.8, 0.7]} radius={0.12} smoothness={4} position={[-1.85, 0.38, 0]}>
        {red}
      </RoundedBox>
      <mesh position={[-2.21, 0.38, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.46]} />
        {dark}
      </mesh>
      {/* Top rail */}
      <RoundedBox args={[2.4, 0.16, 0.5]} radius={0.06} smoothness={3} position={[0.2, 0.95, 0]}>
        {red}
      </RoundedBox>
      {/* Grip */}
      <RoundedBox args={[0.82, 1.75, 0.74]} radius={0.16} smoothness={5} position={[0.95, -0.75, 0]} rotation={[0, 0, -0.28]}>
        {red}
      </RoundedBox>
      {/* Trigger guard and trigger */}
      <mesh position={[0.15, -0.38, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.36, 0.07, 16, 40, Math.PI]} />
        {red}
      </mesh>
      <mesh ref={trigger} position={[0.2, -0.38, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.1, 0.42, 0.16]} />
        <meshStandardMaterial color={PORCELAIN} roughness={0.35} />
      </mesh>
      {/* Side labels */}
      <mesh position={[-0.05, 0.35, 0.415]}>
        <planeGeometry args={[2.7, 0.68]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
      <mesh position={[-0.05, 0.35, -0.415]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.7, 0.68]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A glossy launcher that recoils each time `shots` goes up. */
export default function CertGun({ shots }: { shots: number }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 7], fov: 34 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color={PORCELAIN} />
      <pointLight position={[-4, -2, 3]} intensity={14} color={VERMILLION} distance={12} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.4} color={VERMILLION} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 0, -6]} scale={4} />
      </Environment>
      <Gun shots={shots} />
    </SceneCanvas>
  );
}
