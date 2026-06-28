import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Theme } from '../types';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return Theme.LIGHT;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === Theme.LIGHT || stored === Theme.DARK) return stored as Theme;
  } catch {
    // ignore storage access failures (e.g. privacy mode)
  }
  return Theme.LIGHT;
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
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage access failures
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () =>
      setThemeState((prev) =>
        prev === Theme.DARK ? Theme.LIGHT : Theme.DARK,
      ),
    [],
  );

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
