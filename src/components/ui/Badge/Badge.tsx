import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'today' | 'default';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps): JSX.Element {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}

