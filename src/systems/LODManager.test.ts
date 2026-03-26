import { describe, expect, it } from 'vitest';
import { computeLOD } from './LODManager';

describe('LODManager', () => {
  it('returns near for <=60', () => {
    expect(computeLOD(0)).toBe('near');
    expect(computeLOD(60)).toBe('near');
  });
  it('returns mid for 61..120', () => {
    expect(computeLOD(61)).toBe('mid');
    expect(computeLOD(120)).toBe('mid');
  });
  it('returns far for >120', () => {
    expect(computeLOD(121)).toBe('far');
  });
});

