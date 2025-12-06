import React from 'react';
import { notFound } from 'next/navigation';
import { getDayById } from '@/lib/data';
import { DaySection } from '@/components/trip/DaySection/DaySection';
import { getDayStatus } from '@/lib/utils';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './page.module.css';

interface DayPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ trip?: string }>;
}

export default async function DayPage({
  params,
  searchParams,
}: DayPageProps): Promise<JSX.Element> {
  const { id } = await params;
  const { trip } = await searchParams;
  const slug = trip === 'valencia' ? 'valencia' : undefined;
  const day = await getDayById(id, slug);

  if (!day) {
    notFound();
  }

  const today = new Date();
  const status = getDayStatus(day, today);
  const backHref = slug === 'valencia' ? '/valencia' : '/';

  return (
    <div className={styles.container}>
      <Link href={backHref} className={styles.backLink}>
        <Icon name="arrow_back" size={20} aria-hidden="true" />
        Volver al itinerario completo
      </Link>
      <DaySection day={day} status={status} />
    </div>
  );
}

