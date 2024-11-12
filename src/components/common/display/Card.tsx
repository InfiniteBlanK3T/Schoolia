import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';

export interface CardProps extends Omit<MuiCardProps, 'title'> {
  title?: string;
  loading?: boolean;
  error?: string;
}

/**
 * Custom Card component with loading and error states
 *
 * @param {CardProps} props - The props for the card component
 * @returns {JSX.Element} A customized card component
 *
 * @example
 * <Card
 *   title="Ticket Details"
 *   loading={isLoading}
 *   error={error}
 * >
 *   <TicketContent />
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  title,
  loading = false,
  error,
  children,
  ...props
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <MuiCard {...props}>
        <CardContent>
          <Skeleton variant='text' width='60%' height={32} />
          <Skeleton variant='rectangular' height={100} />
        </CardContent>
      </MuiCard>
    );
  }

  if (error) {
    return (
      <MuiCard
        {...props}
        sx={{
          borderColor: theme.palette.error.main,
          ...props.sx,
        }}
      >
        <CardContent>
          <Typography color='error'>{error}</Typography>
        </CardContent>
      </MuiCard>
    );
  }

  return (
    <MuiCard {...props}>
      {title && (
        <CardContent>
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
        </CardContent>
      )}
      {children}
    </MuiCard>
  );
};
