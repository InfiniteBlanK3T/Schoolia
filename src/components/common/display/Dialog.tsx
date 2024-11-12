import React from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogProps extends Omit<MuiDialogProps, 'title'> {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  fullScreenOnMobile?: boolean;
}

/**
 * Custom Dialog component with responsive behavior
 *
 * @param {DialogProps} props - The props for the dialog
 * @returns {JSX.Element} A customized dialog component
 *
 * @example
 * <Dialog
 *   title="Create Ticket"
 *   open={isOpen}
 *   onClose={handleClose}
 *   actions={<Button onClick={handleSubmit}>Submit</Button>}
 * >
 *   <TicketForm />
 * </Dialog>
 */
export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  actions,
  closeOnBackdropClick = true,
  fullScreenOnMobile = true,
  onClose,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (!closeOnBackdropClick && reason === 'backdropClick') return;
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <MuiDialog
      {...props}
      fullScreen={fullScreenOnMobile && isMobile}
      onClose={handleClose}
      aria-labelledby='dialog-title'
    >
      {title && (
        <DialogTitle
          id='dialog-title'
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
          {onClose && (
            <IconButton
              aria-label='close'
              onClick={(e) => onClose(e, 'escapeKeyDown')}
              sx={{ ml: 2 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};
