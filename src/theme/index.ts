import { createTheme, Theme } from '@mui/material/styles';
import { colors, lightPalette, darkPalette } from './palette';
import typography from './typography';
import components from './components';

// Custom theme augmentation
declare module '@mui/material/styles' {
  interface Theme {
    status: typeof colors.status;
    priority: typeof colors.priority;
  }
  interface ThemeOptions {
    status?: typeof colors.status;
    priority?: typeof colors.priority;
  }
}

// Create theme function
const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    components,
    status: colors.status,
    priority: colors.priority,
  });
};

export { createAppTheme };
