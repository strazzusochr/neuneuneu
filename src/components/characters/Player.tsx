import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/gameStore';

export const Player = () => {
    const meshRef = useRef<THREE.Group>(null);
    const [, getKeys] = useKeyboardControls();
    const [position] = useState(new THREE.Vector3(0, 1.2, 10));
    const [rotation, setRotation] = useState({ yaw: 0, pitch: -0.5 });
    const [zoom, setZoom] = useState(8);
    const updatePlayerPosition = useGameStore(state => state.updatePlayerPosition);
    const lastSyncMs = useRef(0);
    
    // STRG + Pfeiltasten: Kamera-Panning
    const ctrlHeld = useRef(false);
    const arrowKeys = useRef({ up: false, down: false, left: false, right: false });
    const panOffset = useRef(new THREE.Vector3(0, 0, 0));
    
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();
    const speed = 10;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Nur Kamera drehen (kein Panning mehr)
            if (document.pointerLockElement || e.buttons === 1) {
                setRotation(r => ({
                    yaw: r.yaw - e.movementX * 0.003,
                    pitch: Math.max(-1.4, Math.min(1.4, r.pitch - e.movementY * 0.003))
                }));
            }
        };
        const handleWheel = (e: WheelEvent) => {
            // Sehr geschmeidiger Zoom: Faktor von 0.08 auf 0.015 reduziert
            setZoom(z => Math.max(1, Math.min(200, z + e.deltaY * 0.015)));
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') ctrlHeld.current = true;
            if (e.key === 'ArrowUp') arrowKeys.current.up = true;
            if (e.key === 'ArrowDown') arrowKeys.current.down = true;
            if (e.key === 'ArrowLeft') arrowKeys.current.left = true;
            if (e.key === 'ArrowRight') arrowKeys.current.right = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') ctrlHeld.current = false;
            if (e.key === 'ArrowUp') arrowKeys.current.up = false;
            if (e.key === 'ArrowDown') arrowKeys.current.down = false;
            if (e.key === 'ArrowLeft') arrowKeys.current.left = false;
            if (e.key === 'ArrowRight') arrowKeys.current.right = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame((state, delta) => {
        const { forward, backward, left, right } = getKeys();
        
        // STRG + Pfeiltasten → Kamera-Panning
        if (ctrlHeld.current) {
            const panSpeed = 15 * delta;
            const yawRot = new THREE.Euler(0, rotation.yaw, 0);
            
            if (arrowKeys.current.up) {
                const fwd = new THREE.Vector3(0, 0, -panSpeed).applyEuler(yawRot);
                panOffset.current.add(fwd);
            }
            if (arrowKeys.current.down) {
                const bwd = new THREE.Vector3(0, 0, panSpeed).applyEuler(yawRot);
                panOffset.current.add(bwd);
            }
            if (arrowKeys.current.left) {
                const lft = new THREE.Vector3(-panSpeed, 0, 0).applyEuler(yawRot);
                panOffset.current.add(lft);
            }
            if (arrowKeys.current.right) {
                const rgt = new THREE.Vector3(panSpeed, 0, 0).applyEuler(yawRot);
                panOffset.current.add(rgt);
            }
        } else {
            // Kein STRG: Pan-Offset sanft zum Spieler zurückfedern
            panOffset.current.lerp(new THREE.Vector3(0, 0, 0), 0.04);
        }
        
        // WASD bewegt IMMER den Spieler (Pfeiltasten ohne STRG auch)
        const fwdInput = (backward ? 1 : 0) - (forward ? 1 : 0);
        const sideInput = (left ? 1 : 0) - (right ? 1 : 0);
        
        if (!ctrlHeld.current) {
            frontVector.set(0, 0, fwdInput);
            sideVector.set(sideInput, 0, 0);
            const moveRot = new THREE.Euler(0, rotation.yaw, 0);
            direction.subVectors(frontVector, sideVector).normalize().applyEuler(moveRot).multiplyScalar(speed * delta);
            position.add(direction);
        }
        
        if (meshRef.current) {
            meshRef.current.position.copy(position);
            meshRef.current.rotation.y = rotation.yaw;

            // Kamera folgt Spieler + Pan-Offset
            const camPos = new THREE.Vector3(0, 0, zoom);
            const pitchEuler = new THREE.Euler(rotation.pitch, rotation.yaw, 0, 'YXZ');
            camPos.applyEuler(pitchEuler);
            
            const lookTarget = position.clone().add(panOffset.current).add(new THREE.Vector3(0, 1.5, 0));
            const targetCamPos = lookTarget.clone().add(camPos);
            
            state.camera.position.lerp(targetCamPos, 0.06);
            state.camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
        }

        const now = performance.now();
        if (now - lastSyncMs.current > 200) {
            lastSyncMs.current = now;
            updatePlayerPosition([position.x, position.y, position.z]);
        }
    });

    return (
        <group ref={meshRef} onClick={(e) => (e.target as HTMLElement).requestPointerLock()}>
            <mesh position={[0, 0.5, 0]}>
                <capsuleGeometry args={[0.3, 1, 4, 8]} />
                <meshStandardMaterial color="#1a237e" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.8, 0.1]}>
                <boxGeometry args={[0.5, 0.4, 0.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
};
