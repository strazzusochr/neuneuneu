import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { countTriangles } from '../../../systems/PolygonValidator';
import { useGameStore } from '../../../stores/gameStore';

export const PolyStatsProbe = () => {
  const { scene } = useThree();
  const setStats = useGameStore((s) => s.setPolyStats);
  useEffect(() => {
    const run = () => {
      let totalTris = 0;
      let instancedVisible = 0;

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        // Instanced Mesh
        if ((mesh as any).isInstancedMesh && mesh.geometry) {
          const tris = countTriangles(mesh.geometry);
          const count = (mesh as any).count ?? 0;
          totalTris += tris * count;
          instancedVisible += count;
        } else if (mesh.isMesh && mesh.geometry) {
          totalTris += countTriangles(mesh.geometry);
        }
      });

      setStats({ totalTriangles: Math.round(totalTris), visibleInstances: instancedVisible });
    };

    run();
    const id = window.setInterval(run, 3000);
    return () => window.clearInterval(id);
  }, [scene, setStats]);
  return null;
};

