import { useEffect, useState } from 'react';
import colors from 'tailwindcss/colors';

type WidenPrimitiveValues<O extends object> = {
  [K in keyof O]: O[K] extends string
    ? string
    : O[K] extends number
      ? number
      : O[K] extends object
        ? WidenPrimitiveValues<O[K]>
        : never;
};

const dark = {
  bg: colors.slate[800],
  cell: {
    main: colors.slate[700],
    hover: colors.slate[600],
    icon: colors.slate[700],
  },
};

type ThemeColors = WidenPrimitiveValues<typeof dark>;

const light: ThemeColors = {
  bg: colors.slate[100],
  cell: {
    main: colors.slate[200],
    hover: colors.slate[300],
    icon: colors.slate[200],
  },
};

export function useTheme() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const hanldeModeChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };
    prefersDark.addEventListener('change', hanldeModeChange);
    return () => {
      prefersDark.removeEventListener('change', hanldeModeChange);
    };
  }, []);

  return {
    mode,
    colors: {
      dark,
      light,
    }[mode],
  };
}
