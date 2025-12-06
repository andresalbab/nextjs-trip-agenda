import React from 'react';
import type { TripData } from '@/lib/types';
import { DayNavigation } from '@/components/trip/DayNavigation/DayNavigation';
import { DaySection } from '@/components/trip/DaySection/DaySection';
import { AutoScrollToToday } from '@/components/shared/AutoScrollToToday/AutoScrollToToday';
import { getDayStatus } from '@/lib/utils';
import styles from './TripView.module.css';

export interface TripViewProps {
  data: TripData;
}

export function TripView({ data }: TripViewProps): JSX.Element {
  const today = new Date();

  // Add structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Trip',
    name: data.metadata.title,
    startDate: data.metadata.startDate,
    endDate: data.metadata.endDate,
    location: {
      '@type': 'Place',
      name: data.metadata.location,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AutoScrollToToday days={data.days} />
      <div className={styles.mainLayout}>
        <DayNavigation days={data.days} />
        <main className={styles.feed} id="feedContainer">
          {data.days.map((day) => {
            const status = getDayStatus(day, today);
            return (
              <DaySection
                key={day.id}
                day={day}
                status={status}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

