import { describe, expect, it } from 'vitest';
import { EVENT_TIMELINE } from './eventScheduler';
import { NPCType } from '../types/enums';

describe('events align with master plan key times', () => {
  const keyTimes = ['10:00', '13:00', '13:30', '19:30', '20:00', '21:00'];
  it('contains key time entries', () => {
    const times = new Set(EVENT_TIMELINE.map(e => e.time));
    for (const t of keyTimes) {
      expect(times.has(t)).toBe(true);
    }
  });
  it('contains Krause spawn around 10:05', () => {
    expect(EVENT_TIMELINE.some(e => e.time === '10:05' && e.npcType === NPCType.KRAUSE)).toBe(true);
  });
});

