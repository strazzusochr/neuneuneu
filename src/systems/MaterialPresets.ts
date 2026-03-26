export function presetProps(baseColor: string, opts?: { roughness?: number; metalness?: number; emissive?: string; emissiveIntensity?: number }) {
  return {
    color: baseColor,
    roughness: opts?.roughness ?? 0.5,
    metalness: opts?.metalness ?? 0.2,
    emissive: opts?.emissive ?? '#000000',
    emissiveIntensity: opts?.emissiveIntensity ?? 0,
  };
}
