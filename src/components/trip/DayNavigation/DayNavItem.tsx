import React from 'react';
import { Day } from '@/lib/types';
import { formatDate, isToday } from '@/lib/utils';
import styles from './DayNavigation.module.css';
import { cn } from '@/lib/utils';

interface DayNavItemProps {
  days: Day[];
  indices: number[];
  isActive: boolean;
  onClick: () => void;
}

export function DayNavItem({
  days,
  indices,
  isActive,
  onClick,
}: DayNavItemProps): JSX.Element {
  const startDay = days[0];
  const endDay = days[days.length - 1];

  const dayRange =
    days.length > 1
      ? `Días ${startDay.dayNumber} - ${endDay.dayNumber}`
      : `Día ${startDay.dayNumber}`;

  const sDate = formatDate(startDay.date);
  const eDate = formatDate(endDay.date);
  const dateRange = days.length > 1 ? `${sDate} - ${eDate}` : sDate;

  const hasToday = days.some((day) => isToday(day.date));

  return (
    <button
      className={cn(styles.navItem, isActive && styles.active)}
      onClick={onClick}
      type="button"
      aria-label={`Navigate to ${days[0].location}`}
    >
      <div className={styles.navDayNum}>{dayRange}</div>
      <div className={styles.navDate}>{dateRange}</div>
      <div className={styles.navDesc}>{days[0].location}</div>
      {hasToday && <div className={styles.todayIndicator} />}
    </button>
  );
}

