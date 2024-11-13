import React, { memo, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  LinearProgress,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import { SummaryCardProps } from './types';

export const SummaryCard = memo(({ data, loading, error, onCategoryClick }: SummaryCardProps) => {
  const sortedCategories = useMemo(() => {
    if (!data?.categories) return [];
    return Object.entries(data.categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [data?.categories]);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant='rectangular' height={200} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color='error'>{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title='Ticket Summary' />
      <CardContent>
        <Typography variant='subtitle2' gutterBottom>
          Priority Distribution
        </Typography>
        <Box sx={{ mb: 3 }}>
          {Object.entries(data.priority).map(([level, count]) => (
            <Box key={level} sx={{ mb: 1 }}>
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='body2'>{level}</Typography>
                <Typography variant='body2'>{count}</Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={(count / Object.values(data.priority).reduce((a, b) => a + b, 0)) * 100}
                color={level === 'high' ? 'error' : level === 'medium' ? 'warning' : 'success'}
              />
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant='subtitle2' gutterBottom>
          Top Categories
        </Typography>
        <List>
          {sortedCategories.map(([category, count]) => (
            <ListItem key={category} disablePadding>
              {onCategoryClick ? (
                <ListItemButton onClick={() => onCategoryClick(category)}>
                  <ListItemText primary={category} secondary={`${count} tickets`} />
                </ListItemButton>
              ) : (
                <ListItemText sx={{ px: 2 }} primary={category} secondary={`${count} tickets`} />
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
});

SummaryCard.displayName = 'SummaryCard';
