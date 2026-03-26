import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { NPCType } from '../types/enums';

describe('24H_HYPER_DETAIL stichproben (spaet / nacht)', () => {
  it('sets Sperrstunde at 17:30 and removes civilians', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('17:30');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Sperrstunde');
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.CIVILIAN)).toBe(false);
  });

  it('sets Konzert vorbei at 02:30 and musician is gone', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('02:30');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Konzert vorbei');
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.MUSICIAN)).toBe(false);
  });
});

