import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { NPCType } from '../types/enums';

describe('24H_HYPER_DETAIL weitere stichproben', () => {
  it('uses correct phase labels at 12:04 / 12:15 / 19:00 / 21:30 / 22:00', () => {
    const s = useGameStore.getState();
    s.startGame();

    s.updateTime('12:04');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Wut-Explosion');

    s.updateTime('12:15');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Frontkollision');

    s.updateTime('19:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Black Bloc Assault');

    s.updateTime('21:30');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Mob-Rückzug');

    s.updateTime('22:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Aftermath');
  });

  it('spawns firefighters and medics at 22:00', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('22:00');
    const ff = useGameStore.getState().npcs.filter(n => n.type === NPCType.FIREFIGHTER);
    const med = useGameStore.getState().npcs.filter(n => n.type === NPCType.MEDIC);
    expect(ff.length).toBeGreaterThan(0);
    expect(med.length).toBeGreaterThan(0);
  });

  it('reduces extremists by 21:30 (despawn events)', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('19:03');
    const before = useGameStore.getState().npcs.filter(n => n.type === NPCType.EXTREMIST).length;
    s.updateTime('21:30');
    const after = useGameStore.getState().npcs.filter(n => n.type === NPCType.EXTREMIST).length;
    expect(before).toBeGreaterThan(0);
    expect(after).toBeLessThan(before);
  });
});

