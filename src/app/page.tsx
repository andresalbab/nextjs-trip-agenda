import type { Metadata } from 'next';
import React from 'react';
import { getTripData } from '@/lib/data';
import { TripView } from '@/components/trip/TripView';

export const metadata: Metadata = {
  title: 'Agenda de Viaje 2025 | Navidad en España',
  description:
    'Planifica tu viaje perfecto por Granada y Sierra Nevada con itinerarios diarios, actividades y más.',
  keywords: [
    'Granada',
    'Sierra Nevada',
    'trip',
    'itinerary',
    'Spain',
    'Alhambra',
    'Navidad',
  ],
  authors: [{ name: 'Trip Agenda' }],
  openGraph: {
    title: 'Agenda de Viaje 2025 - Granada',
    description: 'Aventura familiar en Granada y Sierra Nevada',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenda de Viaje 2025 - Granada',
    description: 'Planifica tu aventura en Granada',
    images: ['/twitter-image.jpg'],
  },
};

export default async function HomePage(): Promise<JSX.Element> {
  const tripData = await getTripData(); // No slug = Granada (default)

  return <TripView data={tripData} />;
}

