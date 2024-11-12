import React from 'react';
import { CircularProgress, Box, Typography, useTheme } from '@mui/material';

export interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

/**
 * Loading spinner component with optional message and fullscreen mode
 *
 * @param {LoadingSpinnerProps} props - The props for the loading spinner
 * @returns {JSX.Element} A loading spinner component
 *
 * @example
 * <LoadingSpinner
 *   message="Loading tickets..."
 *   fullScreen
 * />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  message,
  fullScreen = false,
}) => {
  const theme = useTheme();

  const content = (
    <>
      <CircularProgress size={size} />
      {message && (
        <Typography variant='body2' color='textSecondary' sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.modal,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      {content}
    </Box>
  );
};
