import { ReactNode } from 'react';
import { ChipProps } from '@mui/material';

export type Status = 'new' | 'open' | 'in-progress' | 'resolved' | 'closed';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface BadgeProps extends Omit<ChipProps, 'status'> {
  status?: Status;
  priority?: Priority;
  label: string;
  variant?: 'filled' | 'outlined';
}

export interface CardProps extends BaseProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string;
  actions?: ReactNode;
  headerActions?: ReactNode;
}

export interface DialogProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  loading?: boolean;
}

export interface TableProps<T> extends BaseProps {
  data: T[];
  columns: {
    id: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => ReactNode;
  }[];
  loading?: boolean;
  error?: string;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
}
