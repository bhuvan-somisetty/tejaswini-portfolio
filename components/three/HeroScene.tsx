'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

const TANGERINE = '#ff493d';
const ICE = '#fff0d5';
const COBALT = '#a68d82';

const RADIUS = 0.62;
const BODY = 1.05;

/** Half of a capsule: a cylinder body with a hemispherical cap, opening at y = 0. */
function CapsuleHalf({ children, flip = false }: { children: React.ReactNode; flip?: boolean }) {
  return (
    <group rotation={[flip ? Math.PI : 0, 0, 0]}>
      <mesh position={[0, BODY / 2, 0]}>
        <cylinderGeometry args={[RADIUS, RADIUS, BODY, 64, 1, true]} />
        {children}
      </mesh>
      <mesh position={[0, BODY, 0]}>
        <sphereGeometry args={[RADIUS, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {children}
      </mesh>
    </group>
  );
}

/** Small seeded PRNG so the granule layout is the same on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Small granules suspended inside the clear half of the capsule. */
function Granules({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    const rand = seeded(7);
    const items: { p: THREE.Vector3; s: number; speed: number }[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(rand()) * (RADIUS - 0.16);
      const a = rand() * Math.PI * 2;
      items.push({
        p: new THREE.Vector3(Math.cos(a) * r, -0.15 - rand() * (BODY + 0.25), Math.sin(a) * r),
        s: 0.035 + rand() * 0.035,
        speed: 0.3 + rand() * 0.6,
      });
    }
    return items;
  }, [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    data.forEach((d, i) => {
      dummy.position.set(d.p.x, d.p.y + Math.sin(t * d.speed + i) * 0.035, d.p.z);
      dummy.scale.setScalar(d.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={ICE} roughness={0.35} metalness={0.1} emissive={TANGERINE} emissiveIntensity={0.08} />
    </instancedMesh>
  );
}

function Capsule({ small }: { small: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const scroll = typeof window !== 'undefined' ? window.scrollY / window.innerHeight : 0;
    // Calm idle spin, eased pointer parallax and a gentle turn on scroll.
    g.rotation.y += delta * 0.25;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.55 + pointer.x * 0.25 + scroll * 0.4, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.25 - pointer.y * 0.2, 0.05);
    g.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={group} scale={small ? 0.72 : 0.78}>
      <CapsuleHalf>
        <meshPhysicalMaterial color={TANGERINE} roughness={0.18} metalness={0.05} clearcoat={1} clearcoatRoughness={0.08} side={THREE.DoubleSide} />
      </CapsuleHalf>
      <CapsuleHalf flip>
        {small ? (
          // Phones and tablets: plain translucent glass, far cheaper than real transmission.
          <meshPhysicalMaterial color={ICE} transparent opacity={0.28} roughness={0.1} clearcoat={1} depthWrite={false} side={THREE.DoubleSide} />
        ) : (
          <meshPhysicalMaterial
            color={ICE}
            transmission={1}
            thickness={0.6}
            roughness={0.08}
            ior={1.35}
            clearcoat={1}
            attenuationColor="#cfe3f5"
            attenuationDistance={2.5}
            side={THREE.DoubleSide}
          />
        )}
      </CapsuleHalf>
      {/* Seam band where the two halves meet */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS + 0.004, 0.018, 16, 96]} />
        <meshStandardMaterial color={ICE} metalness={0.6} roughness={0.25} />
      </mesh>
      <Granules count={small ? 24 : 34} />
    </group>
  );
}

/** Ball-and-stick molecule drifting around the capsule. */
function Molecule({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  const atoms = useMemo<[number, number, number][]>(
    () => [
      [0, 0, 0],
      [0.55, 0.3, 0],
      [-0.5, 0.35, 0.1],
      [0.05, -0.6, 0.15],
      [0.95, -0.05, -0.2],
    ],
    []
  );
  const bonds: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ];

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3 * speed;
      ref.current.rotation.x += delta * 0.12 * speed;
    }
  });

  return (
    <Float speed={1.2 * speed} rotationIntensity={0.4} floatIntensity={0.9}>
      <group ref={ref} position={position} scale={scale}>
        {atoms.map((a, i) => (
          <mesh key={i} position={a}>
            <sphereGeometry args={[i === 0 ? 0.2 : 0.13, 32, 32]} />
            <meshPhysicalMaterial
              color={i === 0 ? TANGERINE : i % 2 ? ICE : COBALT}
              roughness={0.2}
              clearcoat={1}
              metalness={0.1}
            />
          </mesh>
        ))}
        {bonds.map(([a, b], i) => {
          const start = new THREE.Vector3(...atoms[a]);
          const end = new THREE.Vector3(...atoms[b]);
          const mid = start.clone().add(end).multiplyScalar(0.5);
          const dir = end.clone().sub(start);
          const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
          return (
            <mesh key={i} position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.035, 0.035, dir.length(), 12]} />
              <meshStandardMaterial color={ICE} roughness={0.4} opacity={0.7} transparent />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} color={ICE} />
      <pointLight position={[-4, -2, 2]} intensity={14} color={TANGERINE} distance={12} />
      <pointLight position={[3, -3, -2]} intensity={10} color={COBALT} distance={12} />
      {/* Studio lighting built locally (no HDR download). */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} color={TANGERINE} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color={COBALT} position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 0, -6]} scale={4} />
      </Environment>
    </>
  );
}

export default function HeroScene({ small = false }: { small?: boolean }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 7.2], fov: 34 }}>
      <Lights />
      <Capsule small={small} />
      <Molecule position={[-1.55, 1.3, -0.6]} scale={0.6} speed={0.9} />
      <Molecule position={[1.5, -1.4, -0.4]} scale={0.5} speed={1.2} />
      {!small && <Molecule position={[1.45, 1.55, -1.4]} scale={0.38} speed={0.7} />}
      <Sparkles count={small ? 40 : 80} scale={[7, 5, 3]} size={2.2} speed={0.25} opacity={0.55} color={ICE} />
    </SceneCanvas>
  );
}
