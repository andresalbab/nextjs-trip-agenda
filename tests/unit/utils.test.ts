import {
  formatDate,
  formatDateRange,
  getDayStatus,
  isToday,
  groupDaysByLocation,
} from '@/lib/utils';
import type { Day } from '@/lib/types';

describe('utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2025-12-24';
      const formatted = formatDate(date);
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });

    it('handles Date objects', () => {
      const date = new Date('2025-12-24');
      const formatted = formatDate(date);
      expect(formatted).toBeTruthy();
    });
  });

  describe('formatDateRange', () => {
    it('formats date range correctly', () => {
      const start = '2025-12-24';
      const end = '2025-12-31';
      const formatted = formatDateRange(start, end);
      expect(formatted).toContain('-');
    });
  });

  describe('getDayStatus', () => {
    const today = new Date('2025-12-28T00:00:00');

    it('returns past for past dates', () => {
      const day: Day = {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-12-24',
        location: 'Test',
        activities: [],
      };
      expect(getDayStatus(day, today)).toBe('past');
    });

    it('returns current for today', () => {
      const day: Day = {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-12-28',
        location: 'Test',
        activities: [],
      };
      expect(getDayStatus(day, today)).toBe('current');
    });

    it('returns future for future dates', () => {
      const day: Day = {
        id: 'day-1',
        dayNumber: 1,
        date: '2025-12-31',
        location: 'Test',
        activities: [],
      };
      expect(getDayStatus(day, today)).toBe('future');
    });
  });

  describe('isToday', () => {
    const today = new Date('2025-12-28T00:00:00');

    it('returns true for today', () => {
      expect(isToday('2025-12-28', today)).toBe(true);
    });

    it('returns false for other dates', () => {
      expect(isToday('2025-12-24', today)).toBe(false);
    });
  });

  describe('groupDaysByLocation', () => {
    it('groups days by location', () => {
      const days: Day[] = [
        {
          id: 'day-1',
          dayNumber: 1,
          date: '2025-12-24',
          location: 'Ávila',
          activities: [],
        },
        {
          id: 'day-2',
          dayNumber: 2,
          date: '2025-12-25',
          location: 'Ávila',
          activities: [],
        },
        {
          id: 'day-3',
          dayNumber: 3,
          date: '2025-12-26',
          location: 'Granada',
          activities: [],
        },
      ];

      const groups = groupDaysByLocation(days);
      expect(groups).toHaveLength(2);
      expect(groups[0]?.name).toBe('Ávila');
      expect(groups[0]?.days).toHaveLength(2);
      expect(groups[1]?.name).toBe('Granada');
      expect(groups[1]?.days).toHaveLength(1);
    });
  });
});

