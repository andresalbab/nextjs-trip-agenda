'use client';

import { useEffect } from 'react';
import { isToday } from '@/lib/utils';
import type { Day } from '@/lib/types';

interface AutoScrollToTodayProps {
  days: Day[];
}

export function AutoScrollToToday({ days }: AutoScrollToTodayProps): null {
  useEffect(() => {
    // Wait for page to fully load
    const timer = setTimeout(() => {
      const todayDay = days.find((day) => isToday(day.date));
      if (todayDay) {
        const element = document.getElementById(todayDay.id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [days]);

  return null;
}

