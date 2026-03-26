import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { MAX_ACTIVE_NPCS } from './eventScheduler';

describe('MAX_ACTIVE_NPCS cap', () => {
  it('never exceeds MAX_ACTIVE_NPCS after multiple time advances', () => {
    const s = useGameStore.getState();
    s.startGame();
    const times = ['10:00', '11:30', '12:30', '13:00', '19:30', '20:00', '21:00'];
    for (const t of times) s.updateTime(t);
    expect(useGameStore.getState().npcs.length).toBeLessThanOrEqual(MAX_ACTIVE_NPCS);
  });
});

