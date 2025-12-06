'use client';

import React, { useState, useEffect } from 'react';
import { Day } from '@/lib/types';
import { groupDaysByLocation, getDayStatus } from '@/lib/utils';
import { DayNavItem } from './DayNavItem';
import styles from './DayNavigation.module.css';

interface DayNavigationProps {
  days: Day[];
  currentDayId?: string;
  onDayClick?: (dayId: string) => void;
}

export function DayNavigation({
  days,
  currentDayId,
  onDayClick,
}: DayNavigationProps): JSX.Element {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);
  const groups = groupDaysByLocation(days);

  useEffect(() => {
    if (currentDayId) {
      const dayIndex = days.findIndex((day) => day.id === currentDayId);
      if (dayIndex !== -1) {
        const groupIndex = groups.findIndex((group) =>
          group.indices.includes(dayIndex)
        );
        if (groupIndex !== -1) {
          setActiveGroupIndex(groupIndex);
        }
      }
    }
  }, [currentDayId, days, groups]);

  const handleGroupClick = (groupIndex: number): void => {
    setActiveGroupIndex(groupIndex);
    const group = groups[groupIndex];
    if (group && onDayClick) {
      // Find the first non-past day in the group, or use the first day
      const today = new Date();
      let targetIndex = group.indices[0];
      for (let i = 0; i < group.days.length; i++) {
        const day = group.days[i];
        if (getDayStatus(day, today) !== 'past') {
          targetIndex = group.indices[i] ?? targetIndex;
          break;
        }
      }
      onDayClick(days[targetIndex]?.id ?? '');
    }
  };

  const scrollToDay = (dayId: string): void => {
    const element = document.getElementById(dayId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleClick = (groupIndex: number): void => {
    handleGroupClick(groupIndex);
    const group = groups[groupIndex];
    if (group) {
      const today = new Date();
      let targetIndex = group.indices[0];
      for (let i = 0; i < group.days.length; i++) {
        const day = group.days[i];
        if (getDayStatus(day, today) !== 'past') {
          targetIndex = group.indices[i] ?? targetIndex;
          break;
        }
      }
      scrollToDay(days[targetIndex]?.id ?? '');
    }
  };

  return (
    <nav className={styles.sidebar} aria-label="Day navigation">
      {groups.map((group, index) => (
        <DayNavItem
          key={`${group.name}-${index}`}
          days={group.days}
          indices={group.indices}
          isActive={activeGroupIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </nav>
  );
}

