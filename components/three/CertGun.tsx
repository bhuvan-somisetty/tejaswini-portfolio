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
      ctx.font = `800 112px ${family}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 512, 132, 990);
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
  const label = useLabel('CERTIFICATIONS');

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
    g.position.x = 0.3 + k * 0.3;
    g.position.y = 0.15 + Math.sin(t * 1.1) * 0.06;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, 0.12 + k * 0.22 + py * 0.06, 0.15);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.42 + px * 0.18, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.08 - py * 0.08, 0.08);
    if (trigger.current) trigger.current.position.x = 0.32 + k * 0.1;
  });

  const red = <meshPhysicalMaterial color={VERMILLION} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />;
  const dark = <meshStandardMaterial color={CHERRY} roughness={0.6} />;

  return (
    <group ref={group}>
      {/* Body: one long block, with the slot the certificates fly out of on its front face */}
      <RoundedBox args={[3.5, 1.1, 0.84]} radius={0.12} smoothness={5} position={[0, 0.45, 0]}>
        {red}
      </RoundedBox>
      <mesh position={[-1.755, 0.45, 0]}>
        <boxGeometry args={[0.02, 0.62, 0.5]} />
        {dark}
      </mesh>
      {/* Grip: drops from the back of the body and rakes backwards */}
      <RoundedBox args={[0.92, 1.75, 0.76]} radius={0.14} smoothness={5} position={[1.12, -0.5, 0]} rotation={[0, 0, 0.2]}>
        {red}
      </RoundedBox>
      {/* Trigger guard: an open loop in front of the grip */}
      <RoundedBox args={[0.12, 0.62, 0.3]} radius={0.05} smoothness={3} position={[-0.05, -0.36, 0]}>
        {red}
      </RoundedBox>
      <RoundedBox args={[0.86, 0.12, 0.3]} radius={0.05} smoothness={3} position={[0.32, -0.64, 0]}>
        {red}
      </RoundedBox>
      <mesh ref={trigger} position={[0.32, -0.28, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.09, 0.38, 0.14]} />
        <meshStandardMaterial color="#a3201a" roughness={0.4} />
      </mesh>
      {/* Side labels */}
      <mesh position={[-0.12, 0.45, 0.425]}>
        <planeGeometry args={[3.0, 0.75]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
      <mesh position={[-0.12, 0.45, -0.425]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.0, 0.75]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A glossy launcher that recoils each time `shots` goes up. */
export default function CertGun({ shots }: { shots: number }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 6.6], fov: 34 }}>
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
