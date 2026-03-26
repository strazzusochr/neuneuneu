import { describe, expect, it } from 'vitest';
import { EVENT_TIMELINE, MAX_ACTIVE_NPCS, timeToMinutes } from './eventScheduler';
import { NPCType } from '../types/enums';

describe('eventScheduler', () => {
  it('converts time strings to minutes', () => {
    expect(timeToMinutes('06:00')).toBe(360);
    expect(timeToMinutes('00:00')).toBe(0);
    expect(timeToMinutes('23:59')).toBe(23 * 60 + 59);
  });

  it('keeps timeline in non-decreasing time order', () => {
    for (let i = 1; i < EVENT_TIMELINE.length; i++) {
      const prev = timeToMinutes(EVENT_TIMELINE[i - 1].time);
      const cur = timeToMinutes(EVENT_TIMELINE[i].time);
      expect(cur).toBeGreaterThanOrEqual(prev);
    }
  });

  it('contains Krause dialog NPC spawn', () => {
    expect(EVENT_TIMELINE.some(e => e.action === 'SPAWN' && e.npcType === NPCType.KRAUSE)).toBe(true);
  });

  it('uses capped max active NPCs', () => {
    expect(MAX_ACTIVE_NPCS).toBeGreaterThan(0);
    expect(MAX_ACTIVE_NPCS).toBeLessThanOrEqual(500);
  });
});

