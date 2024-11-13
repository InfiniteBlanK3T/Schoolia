import { styled } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';
import { BadgeProps, Status, Priority } from './types';
import { ComponentProps } from 'react';

// Use ComponentProps to get the exact props type from MuiChip
type MuiChipProps = ComponentProps<typeof MuiChip>;

// Define props specifically for styling
interface StyledChipProps extends Omit<MuiChipProps, 'status'> {
  $status?: Status;
  $priority?: Priority;
}

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) => typeof prop === 'string' && !prop.startsWith('$'),
})<StyledChipProps>(({ theme }) => ({
  '&.status-new': {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.contrastText,
  },
  '&.status-open': {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
  '&.status-in-progress': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  '&.status-resolved': {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },
  '&.status-closed': {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.getContrastText(theme.palette.grey[500]),
  },
  '&.priority-urgent': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  // Add other priority styles...
}));

export const Badge = ({
  status,
  priority,
  label,
  variant = 'filled',
  className,
  ...rest
}: BadgeProps) => {
  const classes = [className, status && `status-${status}`, priority && `priority-${priority}`]
    .filter(Boolean)
    .join(' ');

  // Explicitly type and construct the chip props
  const chipProps: MuiChipProps = {
    label,
    variant,
    className: classes,
  };

  // Spread remaining valid props
  return (
    <StyledChip
      {...chipProps}
      {...(rest as Partial<MuiChipProps>)}
      $status={status}
      $priority={priority}
    />
  );
};
