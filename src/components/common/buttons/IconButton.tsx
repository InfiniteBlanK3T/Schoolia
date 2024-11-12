import React, { MouseEvent, ReactNode } from 'react';
import { IconButton as MuiIconButton, CircularProgress } from '@mui/material';
import { BaseButtonProps } from './types';

export interface IconButtonProps
  extends Omit<BaseButtonProps, 'children' | 'startIcon' | 'endIcon'> {
  icon: ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'primary',
  size = 'medium',
  color = 'default',
  disabled = false,
  loading = false,
  onClick,
  ariaLabel,
  className,
}) => {
  const muiColor = color === 'default' ? 'primary' : color;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!loading && !disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <MuiIconButton
      color={muiColor}
      size={size}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={className}
    >
      {loading ? (
        <CircularProgress
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          color='inherit'
        />
      ) : (
        icon
      )}
    </MuiIconButton>
  );
};
