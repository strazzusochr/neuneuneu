import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { NPCBehavior, NPCMood, NPCType } from '../types/enums';

describe('24H_HYPER_DETAIL stichproben', () => {
  it('uses the correct phase labels at key times', () => {
    const s = useGameStore.getState();
    s.startGame();

    s.updateTime('12:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Polizei-Ultimatum');

    s.updateTime('12:30');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Hundertschaft');

    s.updateTime('13:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Wasserwerfer');

    s.updateTime('13:30');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Tränengas');

    s.updateTime('19:03');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('Frontal-Kollision');

    s.updateTime('21:00');
    expect(useGameStore.getState().gameState.currentPhaseLabel).toContain('TOTALE ESKALATION');
  });

  it('spawns riot police at 12:30', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('12:30');
    const riot = useGameStore.getState().npcs.filter(n => n.type === NPCType.RIOT_POLICE);
    expect(riot.length).toBeGreaterThan(0);
  });

  it('switches extremists to RIOTING/COMBAT by 19:03', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('18:00');
    s.updateTime('19:03');
    const ex = useGameStore.getState().npcs.filter(n => n.type === NPCType.EXTREMIST);
    expect(ex.length).toBeGreaterThan(0);
    expect(ex.every(n => n.mood === NPCMood.RIOTING)).toBe(true);
    expect(ex.every(n => n.behavior === NPCBehavior.COMBAT)).toBe(true);
  });
});

