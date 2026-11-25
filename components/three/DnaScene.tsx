'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

const PAIRS = 26;
const HEIGHT = 6.4;
const R = 0.95;

/** Slowly turning double helix; the scroll position adds a little extra twist. */
function Helix() {
  const group = useRef<THREE.Group>(null);

  const layout = useMemo(() => {
    const dummy = new THREE.Object3D();
    const a: THREE.Matrix4[] = [];
    const b: THREE.Matrix4[] = [];
    const r: THREE.Matrix4[] = [];
    for (let i = 0; i < PAIRS; i++) {
      const t = i / (PAIRS - 1);
      const y = (t - 0.5) * HEIGHT;
      const angle = t * Math.PI * 4;
      const pa = new THREE.Vector3(Math.cos(angle) * R, y, Math.sin(angle) * R);
      const pb = new THREE.Vector3(Math.cos(angle + Math.PI) * R, y, Math.sin(angle + Math.PI) * R);

      dummy.position.copy(pa);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      a.push(dummy.matrix.clone());

      dummy.position.copy(pb);
      dummy.updateMatrix();
      b.push(dummy.matrix.clone());

      // Rung between the two bases
      const mid = pa.clone().add(pb).multiplyScalar(0.5);
      dummy.position.copy(mid);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pb.clone().sub(pa).normalize());
      dummy.scale.set(1, pa.distanceTo(pb), 1);
      dummy.updateMatrix();
      r.push(dummy.matrix.clone());
      dummy.quaternion.identity();
    }
    return { a, b, r };
  }, []);

  // Instance matrices are static, so they are written once when each mesh mounts.
  const apply = (mesh: THREE.InstancedMesh | null, mats: THREE.Matrix4[]) => {
    if (!mesh) return;
    mats.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  };

  useFrame(({ pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = window.scrollY / window.innerHeight;
    g.rotation.y += delta * 0.3;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, 0.35 + pointer.x * 0.12, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, scroll * 0.05 - pointer.y * 0.1, 0.04);
  });

  return (
    <group ref={group} rotation={[0, 0, 0.35]}>
      <instancedMesh
        ref={m => apply(m, layout.a)}
        args={[undefined, undefined, PAIRS]}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshPhysicalMaterial color="#ff693d" roughness={0.2} clearcoat={1} />
      </instancedMesh>
      <instancedMesh
        ref={m => apply(m, layout.b)}
        args={[undefined, undefined, PAIRS]}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshPhysicalMaterial color="#e9f0f5" roughness={0.25} clearcoat={1} />
      </instancedMesh>
      <instancedMesh
        ref={m => apply(m, layout.r)}
        args={[undefined, undefined, PAIRS]}
      >
        <cylinderGeometry args={[0.03, 0.03, 1, 10]} />
        <meshStandardMaterial color="#7d93aa" roughness={0.5} transparent opacity={0.55} />
      </instancedMesh>
    </group>
  );
}

export default function DnaScene() {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 8.5], fov: 38 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-3, -2, 3]} intensity={12} color="#ff693d" distance={12} />
      <pointLight position={[3, 2, -2]} intensity={10} color="#2f6fd1" distance={12} />
      <Helix />
    </SceneCanvas>
  );
}
