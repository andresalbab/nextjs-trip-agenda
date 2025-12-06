import { type ClassValue, clsx } from 'clsx';
import { Day, DayStatus } from './types';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, locale = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date range
 */
export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
  locale = 'es-ES'
): string {
  const start = formatDate(startDate, locale);
  const end = formatDate(endDate, locale);
  return `${start} - ${end}`;
}

/**
 * Get day status (past, current, future)
 */
export function getDayStatus(day: Day, today: Date = new Date()): DayStatus {
  const dayDate = new Date(day.date);
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const dayStart = new Date(dayDate);
  dayStart.setHours(0, 0, 0, 0);

  if (dayStart < todayStart) {
    return 'past';
  }
  if (dayStart.getTime() === todayStart.getTime()) {
    return 'current';
  }
  return 'future';
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date, today: Date = new Date()): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const dateStart = new Date(dateObj);
  dateStart.setHours(0, 0, 0, 0);

  return dateStart.getTime() === todayStart.getTime();
}

/**
 * Group days by location
 */
export function groupDaysByLocation(days: Day[]): Array<{
  name: string;
  days: Day[];
  indices: number[];
}> {
  const groups: Array<{ name: string; days: Day[]; indices: number[] }> = [];
  let currentGroup: { name: string; days: Day[]; indices: number[] } | null =
    null;

  days.forEach((day, index) => {
    if (!currentGroup || currentGroup.name !== day.location) {
      currentGroup = {
        name: day.location,
        days: [day],
        indices: [index],
      };
      groups.push(currentGroup);
    } else {
      currentGroup.days.push(day);
      currentGroup.indices.push(index);
    }
  });

  return groups;
}

/**
 * Generate calendar event URL (Google Calendar)
 */
export function generateCalendarUrl(
  title: string,
  description: string,
  startDate: string,
  endDate?: string,
  location?: string
): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    dates: `${formatDateForCalendar(startDate)}/${endDate ? formatDateForCalendar(endDate) : formatDateForCalendar(startDate)}`,
  });

  if (location) {
    params.append('location', location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Format date for Google Calendar (YYYYMMDDTHHmmssZ)
 */
function formatDateForCalendar(date: string): string {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}T000000Z`;
}

