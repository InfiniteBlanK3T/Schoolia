import { createTheme, ThemeOptions } from '@mui/material/styles';
import { COLORS, SPACING_UNIT, BREAKPOINTS } from './constants';

const commonThemeOptions: ThemeOptions = {
  spacing: SPACING_UNIT,
  breakpoints: {
    values: BREAKPOINTS,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    error: COLORS.error,
    warning: COLORS.warning,
    info: COLORS.info,
    success: COLORS.success,
    grey: COLORS.grey,
    background: {
      default: COLORS.grey[50],
      paper: '#ffffff',
    },
    text: {
      primary: COLORS.grey[900],
      secondary: COLORS.grey[600],
    },
  },
});

const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    error: COLORS.error,
    warning: COLORS.warning,
    info: COLORS.info,
    success: COLORS.success,
    grey: COLORS.grey,
    background: {
      default: COLORS.grey[900],
      paper: COLORS.grey[800],
    },
    text: {
      primary: COLORS.grey[50],
      secondary: COLORS.grey[400],
    },
  },
});

export { lightTheme, darkTheme };
