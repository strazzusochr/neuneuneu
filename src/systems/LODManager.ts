export type LOD = 'near' | 'mid' | 'far';

export const CULL_DISTANCES = {
  environment: 160,
  markers: 160,
  landmark: 180,
  stage: 180,
} as const;

export function computeLOD(distance: number): LOD {
  if (distance <= 60) return 'near';
  if (distance <= 120) return 'mid';
  return 'far';
}
