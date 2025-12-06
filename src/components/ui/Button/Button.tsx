import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

