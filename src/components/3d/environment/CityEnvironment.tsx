import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '../../../stores/gameStore';
import * as THREE from 'three';
import { CULL_DISTANCES } from '../../../systems/LODManager';
import { Bakery, Cathedral } from './Landmarks';

const Tree = ({ position }: { position: [number, number, number] }) => {
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    useFrame(() => {
        if (!groupRef.current) return;
        const dx = camera.position.x - position[0];
        const dz = camera.position.z - position[2];
        const dist = Math.hypot(dx, dz);
        groupRef.current.visible = dist <= CULL_DISTANCES.environment;
    });
    return (
        <group ref={groupRef} position={position}>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 2]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>
            <mesh position={[0, 3, 0]}>
                <sphereGeometry args={[1.5, 8, 8]} />
                <meshStandardMaterial color="#2e7d32" />
            </mesh>
        </group>
    );
};

const StreetLamp = ({ position }: { position: [number, number, number] }) => {
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const [h] = inGameTime.split(':').map(Number);
    const isDark = h < 7 || h > 19;
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    useFrame(() => {
        if (!groupRef.current) return;
        const dx = camera.position.x - position[0];
        const dz = camera.position.z - position[2];
        const dist = Math.hypot(dx, dz);
        groupRef.current.visible = dist <= CULL_DISTANCES.environment;
    });
    return (
        <group ref={groupRef} position={position}>
            {/* Pole */}
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.05, 0.1, 6]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Top */}
            <mesh position={[0, 6, 0]}>
                <boxGeometry args={[0.4, 0.2, 0.8]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Light Source */}
            {isDark && (
                <>
                    <mesh position={[0, 5.85, 0]}>
                        <boxGeometry args={[0.3, 0.1, 0.5]} />
                        <meshStandardMaterial color="#fff" emissive="#ffcc66" emissiveIntensity={3} />
                    </mesh>
                </>
            )}
        </group>
    );
};

export const CityEnvironment = () => {
    const issueSquadMove = useGameStore(state => state.issueSquadMove);
    const buildings = useMemo(() => {
        return [...Array(144)].map((_, i) => {
            const cols = 12;
            const spacing = 70;
            const x = ((i % cols) - (cols / 2 - 0.5)) * spacing;
            const z = (Math.floor(i / cols) - (cols / 2 - 0.5)) * spacing;
            
            const parkSize = 85;
            const carveOut = parkSize / 2 + 35;
            if (Math.abs(x) < carveOut && Math.abs(z) < carveOut) return null;

            const width = 22 + Math.random() * 18;
            const depth = 22 + Math.random() * 18;
            const height = 10 + (Math.abs(x) + Math.abs(z)) * 0.03 + Math.random() * 18;
            return { x, z, height, id: i, width, depth };
        }).filter(b => b !== null);
    }, []);

    // Create a series of planes for the streets to avoid Z-fighting and ensure visibility
    const streets = useMemo(() => {
        const lines = [];
        const spacing = 70;
        const totalSize = 840;
        const skip = 70;
        
        // Vertical streets
        for (let x = -420; x <= 420; x += spacing) {
            if (Math.abs(x) < skip) continue;
            lines.push({ x, z: 0, w: 15, d: totalSize, id: `v-${x}` });
        }
        // Horizontal streets
        for (let z = -420; z <= 420; z += spacing) {
            if (Math.abs(z) < skip) continue;
            lines.push({ x: 0, z, w: totalSize, d: 15, id: `h-${z}` });
        }
        return lines;
    }, []);

    const gridTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(0, 204, 255, 0.12)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 16; i++) {
            const p = (i / 16) * canvas.width;
            ctx.beginPath();
            ctx.moveTo(p, 0);
            ctx.lineTo(p, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, p);
            ctx.lineTo(canvas.width, p);
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(0, 204, 255, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(25, 25);
        tex.anisotropy = 1;
        tex.needsUpdate = true;
        return tex;
    }, []);

    const buildingCount = buildings.length;
    const streetCount = streets.length;

    const sidewalkRef = useRef<THREE.InstancedMesh>(null);
    const buildingRef = useRef<THREE.InstancedMesh>(null);
    const roofRef = useRef<THREE.InstancedMesh>(null);
    const facadeRef = useRef<THREE.InstancedMesh>(null);
    const streetRef = useRef<THREE.InstancedMesh>(null);

    useLayoutEffect(() => {
        const tmp = new THREE.Object3D();

        if (sidewalkRef.current && buildingRef.current && roofRef.current && facadeRef.current) {
            for (let i = 0; i < buildingCount; i++) {
                const b = buildings[i]!;

                tmp.position.set(b.x, 0.1, b.z);
                tmp.rotation.set(0, 0, 0);
                tmp.scale.set(b.width + 8, 0.2, b.depth + 8);
                tmp.updateMatrix();
                sidewalkRef.current.setMatrixAt(i, tmp.matrix);

                tmp.position.set(b.x, b.height / 2 + 0.3, b.z);
                tmp.rotation.set(0, 0, 0);
                tmp.scale.set(b.width, b.height, b.depth);
                tmp.updateMatrix();
                buildingRef.current.setMatrixAt(i, tmp.matrix);

                tmp.position.set(b.x, b.height + 0.3, b.z);
                tmp.rotation.set(0, 0, 0);
                tmp.scale.set(b.width - 2, 0.2, b.depth - 2);
                tmp.updateMatrix();
                roofRef.current.setMatrixAt(i, tmp.matrix);

                tmp.position.set(b.x, b.height / 2 + 0.3, b.z + b.depth / 2 + 0.1);
                tmp.rotation.set(0, 0, 0);
                tmp.scale.set(b.width * 0.7, b.height * 0.8, 1);
                tmp.updateMatrix();
                facadeRef.current.setMatrixAt(i, tmp.matrix);
            }

            sidewalkRef.current.instanceMatrix.needsUpdate = true;
            buildingRef.current.instanceMatrix.needsUpdate = true;
            roofRef.current.instanceMatrix.needsUpdate = true;
            facadeRef.current.instanceMatrix.needsUpdate = true;
        }

        if (streetRef.current) {
            for (let i = 0; i < streetCount; i++) {
                const s = streets[i];
                tmp.position.set(s.x, -0.05, s.z);
                tmp.rotation.set(-Math.PI / 2, 0, 0);
                tmp.scale.set(s.w, s.d, 1);
                tmp.updateMatrix();
                streetRef.current.setMatrixAt(i, tmp.matrix);
            }
            streetRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [buildings, streets, buildingCount, streetCount]);

    return (
        <group>
            {/* 1. Base Ground (Dirt/Dark) - LOWEST LAYER */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#0a0a0a" roughness={1} />
            </mesh>

            {/* Lightweight grid overlay (single drawcall) */}
            {gridTexture && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]}>
                    <planeGeometry args={[1000, 1000]} />
                    <meshBasicMaterial map={gridTexture} transparent opacity={0.22} depthWrite={false} />
                </mesh>
            )}

            {/* 2. Asphalt World (Streets Layer) - MIDDLE LAYER (-0.05) */}
            <instancedMesh ref={streetRef} args={[undefined, undefined, streetCount]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.1} />
            </instancedMesh>

            {/* 3. Central Park Area (Green Square) - TOP LAYER (0.05) */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.05, 0]}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    const p = e.point;
                    issueSquadMove([p.x, 1.2, p.z]);
                }}
            >
                <planeGeometry args={[85, 85]} />
                <meshStandardMaterial color="#2a4d2c" roughness={1} />
            </mesh>

            {/* 4. Sidewalks & Buildings - ELEVATED LAYER (0.1+) */}
            <instancedMesh ref={sidewalkRef} args={[undefined, undefined, buildingCount]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.1} />
            </instancedMesh>
            <instancedMesh ref={buildingRef} args={[undefined, undefined, buildingCount]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.2} />
            </instancedMesh>
            <instancedMesh ref={roofRef} args={[undefined, undefined, buildingCount]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#050505" roughness={0.6} metalness={0.1} />
            </instancedMesh>
            <instancedMesh ref={facadeRef} args={[undefined, undefined, buildingCount]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial color="#000000" emissive="#050505" emissiveIntensity={0.2} />
            </instancedMesh>

            {/* ═══ LANDMARKS ═══ */}
            <Bakery position={[53, 0, 36]} />
            <Cathedral position={[0, 0, -80]} />

            {/* Infrastructure Details */}
            <StreetLamp position={[-42, 0, -42]} />
            <StreetLamp position={[42, 0, -42]} />
            <StreetLamp position={[-42, 0, 42]} />
            <StreetLamp position={[42, 0, 42]} />
            
            <Tree position={[-20, 0, 20]} />
            <Tree position={[20, 0, 20]} />
            <Tree position={[-25, 0, -15]} />
            <Tree position={[25, 0, -15]} />
            <Tree position={[0, 0, 30]} />
        </group>
    );
};
