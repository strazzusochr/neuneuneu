import * as THREE from 'three';
import { useMemo, useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { presetProps } from '../../../systems/MaterialPresets';
import { CULL_DISTANCES } from '../../../systems/LODManager';

export const LandmarkHero = ({ position = [0, 0, -30] as [number, number, number] }) => {
  const towerCount = 64;
  const towerRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const towers = useMemo(() => {
    const arr: { x: number; z: number; h: number; w: number; d: number }[] = [];
    const radius = 18;
    for (let i = 0; i < towerCount; i++) {
      const a = (i / towerCount) * Math.PI * 2;
      const r = radius + (i % 4);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const h = 8 + (i % 5);
      arr.push({ x, z, h, w: 1.2, d: 1.2 });
    }
    return arr;
  }, []);

  const tmp = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!towerRef.current || !glowRef.current) return;
    for (let i = 0; i < towers.length; i++) {
      const t = towers[i];
      tmp.position.set(position[0] + t.x, position[1] + t.h / 2, position[2] + t.z);
      tmp.rotation.set(0, 0, 0);
      tmp.scale.set(t.w, t.h, t.d);
      tmp.updateMatrix();
      towerRef.current.setMatrixAt(i, tmp.matrix);

      tmp.position.set(position[0] + t.x, position[1] + 0.1, position[2] + t.z);
      tmp.scale.set(t.w * 0.9, 0.2, t.d * 0.9);
      tmp.updateMatrix();
      glowRef.current.setMatrixAt(i, tmp.matrix);
    }
    towerRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  }, [towers, position, tmp]);

  useFrame(() => {
    if (!groupRef.current) return;
    const dx = camera.position.x - position[0];
    const dz = camera.position.z - position[2];
    const dist = Math.hypot(dx, dz);
    groupRef.current.visible = dist <= CULL_DISTANCES.landmark;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={towerRef} args={[undefined, undefined, towers.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...presetProps('#333333', { roughness: 0.5, metalness: 0.2 })} />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, towers.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...presetProps('#111111', { emissive: '#ffaa00', emissiveIntensity: 1.5 })} />
      </instancedMesh>
    </group>
  );
};
