import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
} from '@mui/material';
import { DialogProps } from './types';

export const Dialog = ({
  open,
  onClose,
  title,
  description,
  actions,
  children,
  maxWidth = 'sm',
  fullScreen,
  loading,
  ...props
}: DialogProps) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      aria-labelledby='dialog-title'
      aria-describedby='dialog-description'
      {...props}
    >
      <DialogTitle id='dialog-title'>{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id='dialog-description'>{description}</DialogContentText>
        )}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <CircularProgress />
          </div>
        ) : (
          children
        )}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};
