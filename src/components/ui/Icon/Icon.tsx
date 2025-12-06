import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export function Icon({
  name,
  className,
  size = 24,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: IconProps): JSX.Element {
  return (
    <span
      className={cn('material-symbols-rounded', className)}
      style={{ fontSize: size }}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      {name}
    </span>
  );
}

