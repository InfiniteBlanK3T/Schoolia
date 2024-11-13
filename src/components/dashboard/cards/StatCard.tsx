import React, { memo } from 'react';
import { Card, CardContent, Typography, Box, Skeleton, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { StatCardProps } from './types';

export const StatCard = memo(
  ({ title, value, icon, change, trend, loading, error, onClick }: StatCardProps) => {
    const theme = useTheme();

    if (loading) {
      return (
        <Card sx={{ minWidth: 200, cursor: onClick ? 'pointer' : 'default' }}>
          <CardContent>
            <Skeleton variant='text' width='60%' />
            <Skeleton variant='rectangular' height={48} />
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card
          sx={{
            minWidth: 200,
            backgroundColor: theme.palette.error.light,
          }}
        >
          <CardContent>
            <Typography color='error'>{error}</Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        sx={{
          minWidth: 200,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.2s',
          '&:hover': onClick
            ? {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              }
            : {},
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle2' color='textSecondary'>
              {title}
            </Typography>
            {icon}
          </Box>
          <Typography variant='h4' component='div' sx={{ my: 1 }}>
            {value}
          </Typography>
          {change !== undefined && (
            <Box display='flex' alignItems='center' gap={0.5}>
              {trend === 'up' ? (
                <TrendingUp color='success' fontSize='small' />
              ) : trend === 'down' ? (
                <TrendingDown color='error' fontSize='small' />
              ) : null}
              <Typography variant='body2' color={trend === 'up' ? 'success.main' : 'error.main'}>
                {change}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';
