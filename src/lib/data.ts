import { TripData } from './types';
import tripData from '@/data/trip-data.json';
import valenciaTripData from '@/data/valencia-trip-data.json';

/**
 * Get trip data (server-side)
 * @param slug - Optional trip slug ('valencia' for Valencia trip, undefined for Granada)
 */
export async function getTripData(slug?: string): Promise<TripData> {
  // In a real app, this might fetch from an API or database
  if (slug === 'valencia') {
    return valenciaTripData as TripData;
  }
  return tripData as TripData;
}

/**
 * Get a specific day by ID
 * @param dayId - Day ID to find
 * @param slug - Optional trip slug
 */
export async function getDayById(
  dayId: string,
  slug?: string
): Promise<TripData['days'][0] | null> {
  const data = await getTripData(slug);
  return data.days.find((day) => day.id === dayId) ?? null;
}

/**
 * Get day by day number
 * @param dayNumber - Day number to find
 * @param slug - Optional trip slug
 */
export async function getDayByNumber(
  dayNumber: number,
  slug?: string
): Promise<TripData['days'][0] | null> {
  const data = await getTripData(slug);
  return data.days.find((day) => day.dayNumber === dayNumber) ?? null;
}

