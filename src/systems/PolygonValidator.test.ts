import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { countTriangles } from './PolygonValidator';

describe('PolygonValidator', () => {
  it('counts triangles for BoxGeometry', () => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    const tris = countTriangles(g);
    expect(tris).toBeGreaterThan(0);
  });

  it('counts triangles for CapsuleGeometry', () => {
    const g = new (THREE as any).CapsuleGeometry(0.35, 0.7, 4, 8);
    const tris = countTriangles(g);
    expect(tris).toBeGreaterThan(0);
  });
});

