import React from 'react';
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  Collapse,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface AlertProps extends Omit<MuiAlertProps, 'onClose'> {
  onClose?: () => void;
  autoHideDuration?: number;
}

/**
 * Custom Alert component with auto-hide functionality
 *
 * @param {AlertProps} props - The props for the alert
 * @returns {JSX.Element} A customized alert component
 *
 * @example
 * <Alert
 *   severity="success"
 *   onClose={handleClose}
 *   autoHideDuration={5000}
 * >
 *   Ticket created successfully!
 * </Alert>
 */
export const Alert: React.FC<AlertProps> = ({ onClose, autoHideDuration, children, ...props }) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (autoHideDuration && onClose) {
      const timer = setTimeout(() => {
        setOpen(false);
        setTimeout(onClose, 300); // Wait for collapse animation
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose]);

  return (
    <Collapse in={open}>
      <MuiAlert
        {...props}
        action={
          onClose ? (
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
                setTimeout(onClose, 300);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          ) : null
        }
      >
        {children}
      </MuiAlert>
    </Collapse>
  );
};
