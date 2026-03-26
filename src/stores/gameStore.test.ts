import { describe, expect, it } from 'vitest';
import { useGameStore } from './gameStore';

describe('gameStore core effects', () => {
  it('tactics effects adjust tension/reputation/moral', () => {
    const s = useGameStore.getState();
    s.setTension(50);
    s.adjustReputation(0);
    s.setMoralScore(50);
    const cur = useGameStore.getState().gameState.tensionLevel;
    s.setTension(Math.max(0, cur - 10));
    s.adjustReputation(5);
    s.setMoralScore(60);
    expect(useGameStore.getState().gameState.tensionLevel).toBe(40);
    expect(useGameStore.getState().gameState.playerReputation).toBe(5);
    expect(useGameStore.getState().gameState.moralScore).toBe(60);
  });

  it('dialog choose option advances dialogStep', () => {
    const s = useGameStore.getState();
    s.openDialog();
    s.chooseDialogOption(3);
    expect(useGameStore.getState().ui.dialogStep).toBe(3);
    s.closeDialog();
    expect(useGameStore.getState().ui.showDialog).toBe(false);
    expect(useGameStore.getState().ui.dialogStep).toBe(0);
  });
});
