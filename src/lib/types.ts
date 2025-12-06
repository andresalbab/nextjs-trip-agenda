export interface Link {
  label: string;
  url: string;
  icon: string;
  type: 'map' | 'website' | 'booking' | 'external';
}

export interface LocationItem {
  label: string;
  link?: string;
}

export interface Activity {
  id: string;
  time: string; // HH:MM format or "Todo el día"
  title: string;
  icon: string; // Material Symbol name
  description: string;
  location: LocationItem[] | LocationItem | string; // Array of locations, single location object, or legacy string format
  coordinates?: {
    lat: number;
    lng: number;
  };
  image: {
    url: string;
    alt: string;
    credit?: string;
  };
  links?: Link[];
  tags?: string[];
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string; // ISO format
  location: string;
  theme?: string;
  description?: string;
  activities: Activity[];
}

export interface TripMetadata {
  title: string;
  subtitle: string;
  location: string;
  startDate: string; // ISO format
  endDate: string;
  theme: 'earthy' | 'mystical' | 'classic';
}

export interface TripData {
  metadata: TripMetadata;
  days: Day[];
}

export type ThemeName = 'earthy' | 'mystical' | 'classic';
export type Mode = 'light' | 'dark';
export type DayStatus = 'past' | 'current' | 'future';

