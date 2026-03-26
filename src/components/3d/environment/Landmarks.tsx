import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../../stores/gameStore';

/**
 * 🏛️ LANDMARKS — 24H MASTER PLAN
 * Spezifische Gebäude mit Logik:
 * - Bäckerei "Goldene Semmel" (öffnet 06:00)
 * - Stephansdom (Glocken-Trigger)
 */

export const Bakery = ({ position }: { position: [number, number, number] }) => {
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const [h] = inGameTime.split(':').map(Number);
    const isOpen = h >= 6 && h < 18;
    const doorRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!doorRef.current) return;
        const targetRotation = isOpen ? -Math.PI / 2 : 0;
        doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, targetRotation, delta * 2);
    });

    return (
        <group position={position}>
            {/* Building Body */}
            <mesh position={[0, 2.5, 0]} castShadow>
                <boxGeometry args={[10, 5, 8]} />
                <meshStandardMaterial color="#5d4037" roughness={0.7} />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 5.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[8, 3, 4]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>
            {/* Sign */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Text
                    position={[0, 4, 4.1]}
                    fontSize={0.6}
                    color="#ffcc00"
                    anchorX="center"
                    anchorY="middle"
                >
                    GOLDENE SEMMEL
                </Text>
            </Float>
            {/* Door */}
            <group ref={doorRef} position={[-1.5, 1, 4]}>
                <mesh position={[0.75, 0, 0]}>
                    <boxGeometry args={[1.5, 2.2, 0.1]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
            </group>
            {/* Windows with light at night */}
            <mesh position={[2, 2, 4.05]}>
                <planeGeometry args={[2, 1.5]} />
                <meshStandardMaterial 
                    color={isOpen ? "#fff" : "#222"} 
                    emissive={isOpen ? "#ffcc00" : "#000"} 
                    emissiveIntensity={isOpen ? 1.5 : 0} 
                />
            </mesh>
        </group>
    );
};

export const Cathedral = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* Main Body */}
            <mesh position={[0, 15, 0]} castShadow>
                <boxGeometry args={[25, 30, 50]} />
                <meshStandardMaterial color="#444444" roughness={0.9} />
            </mesh>
            {/* North Tower */}
            <mesh position={[-8, 40, 20]} castShadow>
                <cylinderGeometry args={[2, 4, 50, 8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            {/* South Tower (Steffl) */}
            <mesh position={[8, 55, 20]} castShadow>
                <cylinderGeometry args={[1, 5, 80, 8]} />
                <meshStandardMaterial color="#222222" />
            </mesh>
            {/* Spire */}
            <mesh position={[8, 100, 20]}>
                <coneGeometry args={[1, 15, 8]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
            {/* Decorative Windows */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[12.6, 10 + i * 5, 0]}>
                    <planeGeometry args={[2, 4]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            ))}
        </group>
    );
};
