import { ReactNode } from 'react';

export type Severity = 'error' | 'warning' | 'info' | 'success';
export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';
export type Size = 'small' | 'medium' | 'large';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export interface AlertProps extends BaseProps {
  severity: Severity;
  title?: string;
  content: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  action?: ReactNode;
  autoHideDuration?: number;
}

export interface LoadingSpinnerProps extends BaseProps {
  size?: Size;
  color?: string;
  overlay?: boolean;
  message?: string;
  customAnimation?: string;
}

export interface SnackbarProps extends BaseProps {
  open: boolean;
  message: string;
  position?: Position;
  action?: ReactNode;
  autoHideDuration?: number;
  onClose?: () => void;
}
