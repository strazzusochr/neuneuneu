import { describe, expect, it } from 'vitest';
import { useGameStore } from '../stores/gameStore';
import { NPCType } from '../types/enums';

describe('24H_LIVE_SYSTEM: Sperrstunde & Konzert (17:30 | 02:30)', () => {
  it('soll um 17:30 die Sperrstunde aktivieren und Zivilisten entfernen', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('17:30');
    
    const state = useGameStore.getState();
    expect(state.gameState.currentPhaseLabel).toContain('Sperrstunde');
    expect(state.npcs.some(n => n.type === NPCType.CIVILIAN)).toBe(false);
  });

  it('soll um 18:00 das Konzert von Christian Strazzuso starten', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('18:00');
    
    const state = useGameStore.getState();
    expect(state.gameState.currentPhaseLabel).toContain('CHRISTIAN STRAZZUSO');
    expect(state.npcs.some(n => n.type === NPCType.MUSICIAN)).toBe(true);
  });

  it('soll um 02:30 das Konzert beenden und den Musiker entfernen', () => {
    const s = useGameStore.getState();
    s.startGame();
    s.updateTime('02:30');
    
    const state = useGameStore.getState();
    expect(state.gameState.currentPhaseLabel).toContain('Konzert vorbei');
    expect(state.npcs.some(n => n.type === NPCType.MUSICIAN)).toBe(false);
  });
});
