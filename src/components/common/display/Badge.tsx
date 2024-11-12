// src/components/common/display/Badge.tsx
import React from 'react';
import {
  Badge as MuiBadge,
  BadgeProps as MuiBadgeProps,
  BadgePropsVariantOverrides,
  styled,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    success: true;
    warning: true;
    error: true;
    info: true;
  }
}

export interface BadgeProps extends Omit<MuiBadgeProps, 'variant'> {
  variant?: OverridableStringUnion<BadgeVariant, BadgePropsVariantOverrides>;
  size?: BadgeSize;
}

const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop as string),
})<BadgeProps>(({ theme, variant = 'info', size = 'medium' }) => {
  const colorMap = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  } as const;

  const textColorMap = {
    success: theme.palette.success.contrastText,
    warning: theme.palette.warning.contrastText,
    error: theme.palette.error.contrastText,
    info: theme.palette.info.contrastText,
  } as const;

  const sizeMap = {
    small: {
      minWidth: 16,
      height: 16,
      fontSize: '0.75rem',
      padding: '0 4px',
    },
    medium: {
      minWidth: 20,
      height: 20,
      fontSize: '0.85rem',
      padding: '0 6px',
    },
    large: {
      minWidth: 24,
      height: 24,
      fontSize: '0.95rem',
      padding: '0 8px',
    },
  } as const;

  return {
    '& .MuiBadge-badge': {
      backgroundColor: colorMap[variant as keyof typeof colorMap],
      color: textColorMap[variant as keyof typeof textColorMap],
      ...sizeMap[size],
    },
  };
});

/**
 * Custom Badge component with predefined variants and sizes
 *
 * @param {BadgeProps} props - The props for the badge
 * @returns {JSX.Element} A customized badge component
 *
 * @example
 * <Badge
 *   variant="success"
 *   size="small"
 *   badgeContent={4}
 * >
 *   <NotificationsIcon />
 * </Badge>
 */
export const Badge: React.FC<BadgeProps> = (props) => {
  return <StyledBadge {...props} />;
};
