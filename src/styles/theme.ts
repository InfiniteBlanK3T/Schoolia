import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const useThemeUtils = () => {
  const theme = useTheme();

  const getSpacing = (value: number) => theme.spacing(value);

  const getBreakpointUp = (breakpoint: keyof Theme['breakpoints']['values']) =>
    theme.breakpoints.up(breakpoint);

  const getPaletteColor = (
    color: keyof Theme['palette'],
    variant: 'main' | 'light' | 'dark' = 'main'
  ) => {
    const palette = theme.palette[color];
    return palette && typeof palette === 'object' && 'main' in palette ? palette[variant] : palette;
  };

  return {
    getSpacing,
    getBreakpointUp,
    getPaletteColor,
  };
};
