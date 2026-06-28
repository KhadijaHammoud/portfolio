import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Theme } from '../types';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return Theme.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;
}

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === Theme.LIGHT || stored === Theme.DARK) return stored as Theme;
  } catch {
    // ignore storage access failures (e.g. privacy mode)
  }
  return null;
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (getStoredTheme() !== null) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => {
      if (getStoredTheme() !== null) return;
      setThemeState(media.matches ? Theme.DARK : Theme.LIGHT);
    };

    syncSystemTheme();
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, []);

  const toggleTheme = useCallback(
    () =>
      setThemeState((prev) => {
        const next = prev === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore storage access failures
        }
        return next;
      }),
    [],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
