import { Text, Float } from '@react-three/drei';

export const Stage = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Main Stage Structure */}
            <mesh position={[0, 4, -15]} castShadow>
                <boxGeometry args={[30, 8, 10]} />
                <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.8} />
            </mesh>
            
            {/* Screen Backup */}
            <mesh position={[0, 6, -10.1]} castShadow>
                <planeGeometry args={[28, 6]} />
                <meshStandardMaterial color="#000" emissive="#333" />
            </mesh>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    position={[0, 6, -10]}
                    fontSize={3}
                    color="#ff4400"
                    anchorX="center"
                    anchorY="middle"
                >
                    KILL THE BILL
                </Text>
                <Text
                    position={[0, 4, -10]}
                    fontSize={0.8}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    THE ULTIMATE RESISTANCE
                </Text>
            </Float>

            {/* Stage Pillars / Speakers */}
            <mesh position={[-14, 5, -8]} castShadow>
                <boxGeometry args={[3, 10, 3]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[14, 5, -8]} castShadow>
                <boxGeometry args={[3, 10, 3]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Floor of the stage */}
            <mesh position={[0, 0.5, -5]} receiveShadow>
                <boxGeometry args={[32, 1, 15]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            
            {/* Colorful Lights */}
            {[...Array(6)].map((_, i) => (
                <pointLight 
                    key={i}
                    position={[(i - 2.5) * 5, 8, -5]} 
                    color={['#ff00ff', '#00ffff', '#ffff00'][i % 3]} 
                    intensity={100} 
                    distance={15}
                />
            ))}
        </group>
    );
};
