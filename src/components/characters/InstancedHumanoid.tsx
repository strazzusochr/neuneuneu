import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';
import { workerManager } from '../../managers/WorkerManager';
import { computeLOD } from '../../systems/LODManager';

export const InstancedHumanoid = () => {
    const bodyRef = useRef<THREE.InstancedMesh>(null);
    const auraRef = useRef<THREE.InstancedMesh>(null);
    const temp = useMemo(() => new THREE.Object3D(), []);
    const hidden = useMemo(() => {
        const o = new THREE.Object3D();
        o.position.set(0, -1000, 0); // Far below ground
        o.scale.set(0, 0, 0);
        o.updateMatrix();
        return o.matrix.clone();
    }, []);

    // Body geometry (größer skalieren, damit es zum Spieler passt)
    const bodyGeo = useMemo(() => new THREE.CapsuleGeometry(0.35, 0.7, 4, 8), []);
    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 0.5 }), []);

    // Aura geometry (larger transparent sphere passend zur neuen Body-Größe)
    const auraGeo = useMemo(() => new THREE.SphereGeometry(1.0, 8, 8), []);
    const auraMat = useMemo(() => new THREE.MeshBasicMaterial({ 
        transparent: true, 
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    }), []);

    const MAX = 500;

    useFrame(() => {
        if (!bodyRef.current || !auraRef.current) return;
        const npcs = useGameStore.getState().npcs;
        const buffer = workerManager.latestNPCBuffer;
        const count = npcs.length;
        const cam = (window as any).__r3f ? (window as any).__r3f.camera : null;
        let camPos: THREE.Vector3 | null = null;
        if (cam && cam.position) camPos = cam.position as THREE.Vector3;

        // Update visible NPCs
        for (let i = 0; i < count; i++) {
            const npc = npcs[i];
            let x = npc.position[0];
            let y = 1.35; // Höher setzen wegen größerer Capsule (vorher 1.2)
            let z = npc.position[2];
            
            if (buffer && buffer.length > i * 12 + 4) {
                x = buffer[i * 12 + 2];
                y = buffer[i * 12 + 3];
                z = buffer[i * 12 + 4];
            }

            // Zero-Lite LOD: entfernte Instanzen reduzieren
            let dist = 0;
            if (camPos) dist = Math.hypot(camPos.x - x, camPos.z - z);
            const lod = camPos ? computeLOD(dist) : 'near';

            if (lod === 'far') {
                bodyRef.current.setMatrixAt(i, hidden);
                auraRef.current.setMatrixAt(i, hidden);
                continue;
            }

            // Body (scale by distance)
            temp.position.set(x, y, z);
            temp.scale.set(lod === 'near' ? 1 : 0.7, lod === 'near' ? 1 : 0.7, lod === 'near' ? 1 : 0.7);
            temp.updateMatrix();
            bodyRef.current.setMatrixAt(i, temp.matrix);

            // Aura (slightly below body center for ground glow effect)
            if (lod === 'mid') {
                temp.position.set(x, y - 0.35, z);
                temp.scale.set(0.6, 0.3, 0.6);
                temp.updateMatrix();
                auraRef.current.setMatrixAt(i, temp.matrix);
            } else if (lod === 'near') {
                temp.position.set(x, y - 0.35, z);
                temp.scale.set(1, 0.5, 1);
                temp.updateMatrix();
                auraRef.current.setMatrixAt(i, temp.matrix);
            } else {
                auraRef.current.setMatrixAt(i, hidden);
            }

            // Colors
            const color = new THREE.Color(npc.outfitColor);
            bodyRef.current.setColorAt(i, color);
            auraRef.current.setColorAt(i, color);
        }

        // Hide all unused instances
        for (let i = count; i < MAX; i++) {
            bodyRef.current.setMatrixAt(i, hidden);
            auraRef.current.setMatrixAt(i, hidden);
        }

        bodyRef.current.instanceMatrix.needsUpdate = true;
        auraRef.current.instanceMatrix.needsUpdate = true;
        if (bodyRef.current.instanceColor) bodyRef.current.instanceColor.needsUpdate = true;
        if (auraRef.current.instanceColor) auraRef.current.instanceColor.needsUpdate = true;

        // Update visible count for performance
        bodyRef.current.count = count;
        auraRef.current.count = count;
    });

    return (
        <>
            {/* NPC Bodies */}
            <instancedMesh ref={bodyRef} args={[bodyGeo, bodyMat, MAX]} castShadow />
            {/* Glowing Auras */}
            <instancedMesh ref={auraRef} args={[auraGeo, auraMat, MAX]} />
        </>
    );
};
