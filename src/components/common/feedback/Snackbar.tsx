import React from 'react';
import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
  Alert,
  AlertProps,
} from '@mui/material';

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'message'> {
  message: string;
  severity?: AlertProps['severity'];
}

/**
 * Custom Snackbar component with Alert integration
 *
 * @param {SnackbarProps} props - The props for the snackbar
 * @returns {JSX.Element} A customized snackbar component
 *
 * @example
 * <Snackbar
 *   message="Changes saved successfully"
 *   severity="success"
 *   open={isOpen}
 *   onClose={handleClose}
 * />
 */
export const Snackbar: React.FC<SnackbarProps> = ({ message, severity = 'info', ...props }) => {
  return (
    <MuiSnackbar {...props}>
      <Alert severity={severity} elevation={6} variant='filled'>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
