import type { Metadata } from 'next';
import React from 'react';
import { getTripData } from '@/lib/data';
import { TripView } from '@/components/trip/TripView';

export const metadata: Metadata = {
  title: 'Valencia Mini-Trip 2025 | Family Adventure',
  description:
    'Valencia, Madrid & Ávila mini-trip before Granada - December 21-24, 2025',
  keywords: ['Valencia', 'Madrid', 'Ávila', 'trip', 'itinerary', 'Spain'],
  authors: [{ name: 'Trip Agenda' }],
  openGraph: {
    title: 'Valencia Mini-Trip 2025',
    description: 'Valencia, Madrid & Ávila adventure',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valencia Mini-Trip 2025',
    description: 'Valencia, Madrid & Ávila adventure',
    images: ['/twitter-image.jpg'],
  },
};

export default async function ValenciaPage(): Promise<JSX.Element> {
  const tripData = await getTripData('valencia');

  return <TripView data={tripData} />;
}

