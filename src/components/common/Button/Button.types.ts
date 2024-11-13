import { ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export type CustomButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type MuiVariant = 'text' | 'outlined' | 'contained';

export interface ButtonBaseProps {
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: CustomButtonVariant;

  /**
   * The color scheme of the button
   * @default 'primary'
   */
  color?: ButtonColor;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading spinner component
   */
  loadingIndicator?: ReactNode;

  /**
   * Whether to show the loading spinner
   * @default true when loading=true
   */
  showLoadingIndicator?: boolean;

  /**
   * Text to be shown when loading
   */
  loadingText?: string;

  /**
   * Whether the loading spinner should be shown on the left
   * @default true
   */
  loadingPosition?: 'start' | 'end' | 'center';
}

export type ButtonProps = ButtonBaseProps & Omit<MuiButtonProps, 'size' | 'variant' | 'color'>;
