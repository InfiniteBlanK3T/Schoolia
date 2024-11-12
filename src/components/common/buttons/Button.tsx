import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { BaseButtonProps } from './types';

export const Button: React.FC<BaseButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  color = 'default',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  startIcon,
  endIcon,
  ariaLabel,
  className,
}) => {
  // Map our variants to Material UI variants
  const muiVariant =
    variant === 'text' ? 'text' : variant === 'secondary' ? 'outlined' : 'contained';

  // Map our colors to Material UI colors
  const muiColor = color === 'default' ? 'primary' : color;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !disabled && onClick) {
      onClick(event);
    }
  };

  const buttonContent = loading ? (
    <>
      <CircularProgress
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        color='inherit'
        className='mr-2'
      />
      {children}
    </>
  ) : (
    children
  );

  return (
    <MuiButton
      variant={muiVariant}
      size={size}
      color={muiColor}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={handleClick}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      className={className}
    >
      {buttonContent}
    </MuiButton>
  );
};
