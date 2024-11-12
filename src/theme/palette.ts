import { PaletteOptions } from '@mui/material/styles';

// Custom color definitions
const colors = {
  // Brand colors
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1e40af',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#4f46e5',
    light: '#818cf8',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  // Ticket status colors
  status: {
    new: '#22c55e',
    inProgress: '#eab308',
    blocked: '#ef4444',
    resolved: '#3b82f6',
    closed: '#6b7280',
  },
  // Ticket priority colors
  priority: {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#991b1b',
  },
};

// Light mode palette
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: colors.primary,
  secondary: colors.secondary,
  background: {
    default: '#f9fafb',
    paper: '#ffffff',
  },
  text: {
    primary: '#111827',
    secondary: '#4b5563',
  },
};

// Dark mode palette
const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: colors.primary,
  secondary: colors.secondary,
  background: {
    default: '#111827',
    paper: '#1f2937',
  },
  text: {
    primary: '#f9fafb',
    secondary: '#d1d5db',
  },
};

export { colors, lightPalette, darkPalette };
