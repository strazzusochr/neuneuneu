import { describe, expect, it } from 'vitest';
import { useGameStore } from './gameStore';

describe('HUD controls smoke', () => {
  it('toggle time pause and set speed', () => {
    const s = useGameStore.getState();
    s.startGame();
    expect(useGameStore.getState().gameState.isTimePaused).toBe(false);
    s.toggleTimePause();
    expect(useGameStore.getState().gameState.isTimePaused).toBe(true);
    s.setTimeSpeed(5);
    expect(useGameStore.getState().gameState.timeSpeed).toBe(5);
  });
});

