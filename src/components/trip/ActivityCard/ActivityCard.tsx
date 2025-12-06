'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Activity, LocationItem } from '@/lib/types';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { generateCalendarUrl } from '@/lib/utils';
import styles from './ActivityCard.module.css';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function ActivityCard({
  activity,
  isExpanded: controlledExpanded,
  onToggle,
}: ActivityCardProps): JSX.Element {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledExpanded !== undefined;

  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = (): void => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = '0';
      }
    }
  }, [expanded]);

  const mapLink = activity.links?.find((link) => link.type === 'map');
  const websiteLink = activity.links?.find((link) => link.type === 'website');

  // Normalize location to an array format
  const normalizeLocations = (location: Activity['location']): LocationItem[] => {
    if (Array.isArray(location)) {
      return location;
    }
    if (typeof location === 'string') {
      return location === 'N/A' ? [] : [{ label: location }];
    }
    // Single location object
    return [location];
  };

  const locations = normalizeLocations(activity.location);
  const firstLocationLabel = locations.length > 0 ? locations[0].label : undefined;

  const calendarUrl = generateCalendarUrl(
    activity.title,
    activity.description,
    new Date().toISOString(), // This should be the actual activity date
    undefined,
    firstLocationLabel
  );

  return (
    <div className={cn(styles.card, expanded && styles.open)}>
      <button
        className={styles.cardHeader}
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${activity.title} details`}
        type="button"
      >
        <div className={styles.timeSlot}>{activity.time}</div>
        <div className={styles.cardIcon}>
          <Icon name={activity.icon} aria-hidden="true" />
        </div>
        <div className={styles.cardTitle}>{activity.title}</div>
        <Icon
          name="expand_more"
          className={cn(styles.expandIcon)}
          aria-hidden="true"
        />
      </button>
      <div className={styles.cardContent} ref={contentRef}>
        <div className={styles.contentInner}>
          <div className={styles.imageWrapper}>
            <Image
              src={activity.image.url}
              alt={activity.image.alt}
              width={600}
              height={400}
              className={styles.activityImg}
              loading="lazy"
            />
          </div>
          <div className={styles.activityDetails}>
            <p className={styles.activityDesc}>{activity.description}</p>
            {locations.length > 0 && (
              <div className={styles.locationsList}>
                {locations.map((loc, index) => (
                  loc.link ? (
                    <a
                      key={index}
                      href={loc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.locationRow}
                    >
                      <Icon name="location_on" size={18} aria-hidden="true" />
                      {loc.label}
                    </a>
                  ) : (
                    <div key={index} className={styles.locationRow}>
                      <Icon name="location_on" size={18} aria-hidden="true" />
                      {loc.label}
                    </div>
                  )
                ))}
              </div>
            )}
            <div className={styles.actionButtons}>
              {websiteLink && (
                <Button
                  variant="primary"
                  onClick={() => window.open(websiteLink.url, '_blank')}
                >
                  Visitar Web
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => window.open(calendarUrl, '_blank')}
              >
                <Icon name="calendar_month" size={18} aria-hidden="true" />
                Calendario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

