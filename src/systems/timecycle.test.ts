import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';

describe('time cycle continuity', () => {
  it('does not reset to 06:00 when advancing sequential times', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('06:05');
    s.updateTime('06:10');
    s.updateTime('06:15');
    expect(useGameStore.getState().gameState.inGameTime).toBe('06:15');
  });
});

