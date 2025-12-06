'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, Mode } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS, THEMES } from '@/lib/constants';

interface ThemeContextType {
  theme: ThemeName;
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  cycleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'earthy',
  defaultMode = 'light',
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: Mode;
}): JSX.Element {
  const [theme, setThemeState] = useLocalStorage<ThemeName>(
    STORAGE_KEYS.THEME,
    defaultTheme
  );
  const [mode, setModeState] = useLocalStorage<Mode>(
    STORAGE_KEYS.MODE,
    defaultMode
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Apply theme and mode to document root
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
  }, [theme, mode, isMounted]);

  // Prevent flash of unstyled content
  useEffect(() => {
    if (!isMounted) return;

    // Apply theme immediately to prevent FOUC
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
  }, [theme, mode, isMounted]);

  const toggleMode = (): void => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setMode = (newMode: Mode): void => {
    setModeState(newMode);
  };

  const cycleTheme = (): void => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setThemeState(THEMES[nextIndex] ?? 'earthy');
  };

  const setTheme = (newTheme: ThemeName): void => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        toggleMode,
        setMode,
        cycleTheme,
        setTheme,
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

