import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { NPCBehavior, NPCMood, NPCType } from '../types/enums';

describe('24H_LIVE_SYSTEM stichproben', () => {
  it('updates extremist mob state at 18:45', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('18:45');
    const ex = useGameStore.getState().npcs.filter(n => n.type === NPCType.EXTREMIST);
    expect(ex.length).toBeGreaterThan(0);
    expect(ex.every(n => n.mood === NPCMood.RIOTING)).toBe(true);
    expect(ex.every(n => n.behavior === NPCBehavior.FOLLOW)).toBe(true);
  });

  it('spawns SEK at 20:30 with surround behavior', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('20:30');
    const sek = useGameStore.getState().npcs.filter(n => n.type === NPCType.SEK);
    expect(sek.length).toBeGreaterThan(0);
    expect(sek.every(n => n.behavior === NPCBehavior.SURROUND)).toBe(true);
  });

  it('despawns cleanup teams by 23:00', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('22:00');
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.FIREFIGHTER)).toBe(true);
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.MEDIC)).toBe(true);
    s.updateTime('23:00');
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.FIREFIGHTER)).toBe(false);
    expect(useGameStore.getState().npcs.some(n => n.type === NPCType.MEDIC)).toBe(false);
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Nächtliche Ruhe');
  });
});

