import React from 'react';
import { Day, DayStatus } from '@/lib/types';
import { ActivityCard } from '../ActivityCard/ActivityCard';
import { Badge } from '@/components/ui/Badge/Badge';
import { formatDate, isToday } from '@/lib/utils';
import styles from './DaySection.module.css';
import { cn } from '@/lib/utils';

interface DaySectionProps {
  day: Day;
  status: DayStatus;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function DaySection({
  day,
  status,
  isCollapsed = false,
  onToggle,
}: DaySectionProps): JSX.Element {
  const dateStr = formatDate(day.date);
  const today = isToday(day.date);

  return (
    <div
      className={cn(styles.dayGroup, status === 'past' && styles.pastDay)}
      id={day.id}
    >
      <div className={styles.dayGroupHeader}>
        <div>
          <h2 className={styles.dayTitle}>{dateStr}</h2>
          <span className={styles.subtitle}>
            Día {day.dayNumber} · {day.description}
          </span>
        </div>
        {today && <Badge variant="today">Hoy</Badge>}
      </div>
      <div className={styles.activities}>
        {day.activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

