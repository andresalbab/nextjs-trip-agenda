'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, Mode } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';

interface ThemeContextType {
  theme: ThemeName;
  mode: Mode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Get system color scheme preference
 */
function getSystemPreference(): Mode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'earthy',
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}): JSX.Element {
  // Theme is fixed to the first one from trip data, no cycling
  const [theme] = useLocalStorage<ThemeName>(
    STORAGE_KEYS.THEME,
    defaultTheme
  );

  // Mode: always use system preference, store it for consistency
  const initialMode = getSystemPreference();
  const [systemMode, setSystemMode] = useState<Mode>(initialMode);
  const [isMounted, setIsMounted] = useState(false);

  // Store system preference in localStorage for consistency (read-only, we update it when system changes)
  const [, setStoredMode] = useLocalStorage<Mode>(
    STORAGE_KEYS.MODE,
    initialMode
  );

  // Always use system preference
  const mode = systemMode;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen to system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList): void => {
      const newMode: Mode = e.matches ? 'dark' : 'light';
      setSystemMode(newMode);
      // Store in localStorage for consistency
      setStoredMode(newMode);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [setStoredMode]);

  // Apply theme and mode to document root
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
  }, [theme, mode, isMounted]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

