import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';

describe('night samples (00:00/01:00)', () => {
  it('sets phase label and tension at 00:00', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('00:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Mitternacht');
    expect(useGameStore.getState().gameState.tensionLevel).toBe(15);
  });

  it('sets phase label and tension at 01:00', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('01:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Nachtruhe');
    expect(useGameStore.getState().gameState.tensionLevel).toBe(10);
  });
});

