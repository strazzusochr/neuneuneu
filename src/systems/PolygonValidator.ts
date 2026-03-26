import * as THREE from 'three';

export function countTriangles(geometry: THREE.BufferGeometry): number {
  const index = geometry.getIndex();
  if (index) return index.count / 3;
  const position = geometry.getAttribute('position');
  return Math.floor(position.count / 3);
}

