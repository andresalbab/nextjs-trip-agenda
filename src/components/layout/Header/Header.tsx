import React from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps): JSX.Element {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <ThemeToggle />
    </header>
  );
}

