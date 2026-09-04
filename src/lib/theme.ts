import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getInitialThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = window.localStorage.getItem('journeys-theme-preference');
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') return savedTheme;

  return 'system';
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
