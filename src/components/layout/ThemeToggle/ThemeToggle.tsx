'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './ThemeToggle.module.css';
import { cn } from '@/lib/utils';

export function ThemeToggle(): JSX.Element {
  const { mode, toggleMode, cycleTheme } = useTheme();

  return (
    <div className={styles.controls}>
      <button
        className={cn(styles.iconBtn)}
        onClick={toggleMode}
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        type="button"
      >
        <Icon
          name={mode === 'light' ? 'dark_mode' : 'light_mode'}
          aria-hidden={true}
        />
      </button>
      <button
        className={cn(styles.iconBtn)}
        onClick={cycleTheme}
        aria-label="Cycle theme"
        type="button"
      >
        <Icon name="palette" aria-hidden={true} />
      </button>
    </div>
  );
}

