/**
 * 📍 SPAWN MARKERS MIT LABELN
 * Zeigt an jedem Spawn-Punkt: Uhrzeit, Anzahl und NPC-Typ als 3D-Text.
 * FLACKER-FIX: Y weit über Park-Boden (0.05), polygonOffset aktiv.
 */

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { EVENT_TIMELINE, NPC_COLORS } from '../../../systems/eventScheduler';
import { useFrame, useThree } from '@react-three/fiber';
import { CULL_DISTANCES } from '../../../systems/LODManager';

interface SpawnPoint {
    position: [number, number, number];
    color: string;
    radius: number;
    id: string;
    label: string;      // z.B. "8× DEMONSTRATOR"
    shortType: string;   // z.B. "DEMO"
    time: string;
    mission: string;
}

const SHORT_NAMES: Record<string, string> = {
    'CIVILIAN': 'ZIV',
    'POLICE': 'POL',
    'DEMONSTRATOR': 'DEMO',
    'RIOT_POLICE': 'RIOT',
    'MEDIC': 'SANI',
    'EXTREMIST': 'EXTR',
    'SEK': 'SEK',
    'FIREFIGHTER': 'FEU',
    'RIOTER': 'RAND',
    'JOURNALIST': 'JOUR',
    'KRAUSE': 'KRAU',
    'TOURIST': 'TOUR',
};

export const SpawnMarkers = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    useFrame(() => {
        if (!groupRef.current) return;
        // Simple distance culling for performance
        const dx = camera.position.x - 0;
        const dz = camera.position.z - 0;
        const dist = Math.hypot(dx, dz);
        groupRef.current.visible = dist <= CULL_DISTANCES.markers;
    });
    const markers = useMemo(() => {
        const seen = new Map<string, SpawnPoint>();

        EVENT_TIMELINE.forEach((event, i) => {
            if (event.action !== 'SPAWN' || !event.position) return;
            
            const key = `${Math.round(event.position[0])},${Math.round(event.position[2])},${event.npcType}`;
            const shortName = SHORT_NAMES[event.npcType] || event.npcType;
            const newLabel = `${event.count}× ${shortName}`;
            const missionLabel = event.description || event.phaseLabel || "Einsatz";
            
            if (seen.has(key)) {
                // Merge: append additional spawn info
                const existing = seen.get(key)!;
                existing.label += `\n${newLabel}`;
            } else {
                seen.set(key, {
                    position: event.position,
                    color: NPC_COLORS[event.npcType] || '#888',
                    radius: Math.min(event.radius || 5, 15),
                    id: `marker-${i}`,
                    label: newLabel,
                    shortType: shortName,
                    time: event.time,
                    mission: missionLabel
                });
            }
        });

        return Array.from(seen.values());
    }, []);

    return (
        <group ref={groupRef}>
            {markers.map((m, idx) => (
                <group key={m.id} position={[m.position[0], 0, m.position[2]]}>
                    {/* Ring on ground - elevated above park surface */}
                    <mesh 
                        rotation={[-Math.PI / 2, 0, 0]} 
                        position={[0, 0.25 + idx * 0.01, 0]}
                    >
                        <ringGeometry args={[m.radius - 0.3, m.radius, 48]} />
                        <meshBasicMaterial 
                            color={m.color} 
                            transparent 
                            opacity={0.35}
                            depthWrite={false}
                            polygonOffset={true}
                            polygonOffsetFactor={-1}
                            polygonOffsetUnits={-1}
                        />
                    </mesh>
                    
                    {/* 🕒 SCHWEBENDE DIGITALE UHRZEIT & MISSION */}
                    <group position={[0, 4.5, 0]}>
                        {/* Uhrzeit */}
                        <Text
                            position={[0, 1.2, 0]}
                            fontSize={1.4}
                            color="#ffff00" // "Time-Yellow"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.1}
                            outlineColor="#000000"
                        >
                            {m.time}
                        </Text>
                        
                        {/* NPC Typ & Anzahl */}
                        <Text
                            position={[0, 0, 0]}
                            fontSize={1.0}
                            color={m.color}
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.08}
                            outlineColor="#000000"
                        >
                            {m.label}
                        </Text>

                        {/* Mission / Akt */}
                        <Text
                            position={[0, -1.2, 0]}
                            fontSize={0.7}
                            color="#fff"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.05}
                            outlineColor="#000000"
                            maxWidth={12}
                            textAlign="center"
                        >
                            {m.mission}
                        </Text>
                    </group>
                </group>
            ))}
        </group>
    );
};
