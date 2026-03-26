import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Sky, KeyboardControls } from '@react-three/drei';
import { workerManager } from '../../managers/WorkerManager';
import { useGameStore } from '../../stores/gameStore';
import { InstancedHumanoid } from '../characters/InstancedHumanoid';
import { NPCSigns } from '../characters/NPCSigns';
import { CityEnvironment } from '../3d/environment/CityEnvironment';
import { SpawnMarkers } from '../3d/environment/SpawnMarkers';
import { VisualEffects } from '../3d/effects/VisualEffects';
import { Player } from '../characters/Player';
import { PolyStatsProbe } from '../3d/diagnostics/PolyStatsProbe';

const SceneContent = () => {
    const isPlaying = useGameStore(state => state.gameState.isPlaying);
    const inGameTime = useGameStore(state => state.gameState.inGameTime);
    const npcs = useGameStore(state => state.npcs);

    // Calculate Sun Position from time
    const [h, m] = inGameTime.split(':').map(Number);
    const totalMinutes = h * 60 + m;
    const angle = (totalMinutes / 1440) * Math.PI * 2 - Math.PI / 2;
    const sunPos = [Math.cos(angle) * 100, Math.sin(angle) * 100, 20] as [number, number, number];
    const isDay = h > 6 && h < 20;

    // 🌅 Time-of-day atmosphere (from 24H Master Plan)
    const isSunrise = h >= 6 && h < 8;      // orangefarbenes Licht
    const isDusk = h >= 17 && h < 20;        // Dämmerung
    const isNight = h >= 20 || h < 6;        // Nacht

    // Background sky color
    const bgColor = isSunrise ? '#c4784a' : isDusk ? '#7a4a3a' : isNight ? '#1a2a4a' : '#4a90c2';
    // Directional light color
    const sunColor = isSunrise ? '#ff9944' : isDusk ? '#ff7744' : isNight ? '#8899cc' : '#fffaf0';
    // Ambient intensity - sunrise is soft, day is bright
    const ambientIntensity = isSunrise ? 0.5 : isDusk ? 0.5 : isNight ? 0.7 : 0.8;
    const sunIntensity = isSunrise ? 1.2 : isDusk ? 1.0 : isNight ? 0.6 : 2.0;

    useEffect(() => {
        if (isPlaying) {
            workerManager.init();
            workerManager.startSimulation(500, npcs);
        }
        return () => workerManager.stopSimulation();
    }, [isPlaying]);

    return (
        <>
            <color attach="background" args={[bgColor]} />
            {/* NO FOG - clear visibility at all times */}
            
            <Sky sunPosition={sunPos} />
            <ambientLight intensity={ambientIntensity} />
            <directionalLight 
                position={sunPos} 
                intensity={sunIntensity} 
                color={sunColor}
            />
            {/* Hemisphere fill light - warm orange at sunrise, cool blue at night */}
            <hemisphereLight 
                args={[
                    isSunrise ? '#ff8844' : isNight ? '#4466aa' : '#6688cc', 
                    isSunrise ? '#442211' : '#1a1a2a', 
                    isSunrise ? 0.4 : isDay ? 0.3 : 0.8
                ]} 
            />
            
            <CityEnvironment />
            <SpawnMarkers />

            <InstancedHumanoid />
            <NPCSigns />
            <Player />
            <VisualEffects />
            <PolyStatsProbe />
        </>
    );
};

export const GameCanvas = () => {
    const [renderKey, setRenderKey] = useState(0);
    const startGame = useGameStore(state => state.startGame);
    const initSocket = useGameStore(state => state.initSocket);
    
    useEffect(() => { 
        initSocket();
        startGame(); 
        
        // WebGPU Detection
        if ('gpu' in navigator) {
            console.log("🚀 WebGPU detected in browser. Project is ready for Cloud (WebGPU-optimized) deployment.");
        } else {
            console.warn("⚠️ WebGPU not detected. Falling back to WebGL.");
        }
    }, []);
    return (
        <KeyboardControls map={[
            { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
            { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        ]}>
            <Canvas 
                key={renderKey} 
                dpr={1}
                gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'low-power' }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextrestored', () => setRenderKey(prev => prev + 1));
                }}
            >
                <Suspense fallback={<Html>Loading Engine...</Html>}><SceneContent /></Suspense>
            </Canvas>
        </KeyboardControls>
    );
};
