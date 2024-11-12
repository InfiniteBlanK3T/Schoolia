import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  // Responsive font sizes
  h1: {
    fontSize: 'clamp(2rem, 8vw, 3rem)',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 6vw, 2.25rem)',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    fontWeight: 600,
    lineHeight: 1.3,
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
};

export default typography;
