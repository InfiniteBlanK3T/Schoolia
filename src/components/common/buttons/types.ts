import { ReactNode, MouseEvent } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonColor = 'default' | 'success' | 'warning' | 'error';

export interface BaseButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
}
