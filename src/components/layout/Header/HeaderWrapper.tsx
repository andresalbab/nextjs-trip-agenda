'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import tripData from '@/data/trip-data.json';
import valenciaTripData from '@/data/valencia-trip-data.json';

export function HeaderWrapper(): JSX.Element {
  const pathname = usePathname();
  
  // Determine which trip data to use based on pathname
  const isValencia = pathname === '/valencia';
  const data = isValencia ? valenciaTripData : tripData;

  return (
    <Header
      title={data.metadata.title}
      subtitle={data.metadata.subtitle}
    />
  );
}

