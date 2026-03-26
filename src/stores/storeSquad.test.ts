import { describe, expect, it } from 'vitest';
import { useGameStore } from './gameStore';
import { NPCType } from '../types/enums';

describe('squad move', () => {
  it('sets squadTarget after issuing move', () => {
    const s = useGameStore.getState();
    s.startGame();
    // Seed a few police to ensure squad has members
    const npcs = useGameStore.getState().npcs;
    // If empty, advance time to spawn police
    if (!npcs.some(n => n.type === NPCType.POLICE)) {
      s.updateTime('10:00');
    }
    s.selectSquad(1);
    const target: [number, number, number] = [5, 1.2, 5];
    s.issueSquadMove(target);
    expect(useGameStore.getState().squadTarget).toEqual(target);
  });
});

