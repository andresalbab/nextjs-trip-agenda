import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './not-found.module.css';

export default function NotFound(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Página no encontrada</p>
      <Link href="/" className={styles.link}>
        <Icon name="home" size={20} aria-hidden={true} />
        Volver al inicio
      </Link>
    </div>
  );
}

