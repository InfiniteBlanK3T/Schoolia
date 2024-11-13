import type { ReactNode } from 'react';
import type { TableProps as MuiTableProps } from '@mui/material';

export type SortDirection = 'asc' | 'desc' | undefined;

export interface Column<T = unknown> {
  id: string;
  header: ReactNode;
  Cell?: (props: { row: T; value: unknown }) => ReactNode;
  HeaderCell?: (props: { column: Column<T> }) => ReactNode;
  width?: number | string;
  minWidth?: number;
  sortable?: boolean;
  resizable?: boolean;
  sticky?: boolean;
  hidden?: boolean;
  accessor?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T extends object> extends Omit<MuiTableProps, 'onSelect'> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  rowKey?: string | ((row: T) => string | number);
  showHeader?: boolean;
  stickyHeader?: boolean;
  sortable?: boolean;
  defaultSortField?: string;
  defaultSortDirection?: SortDirection;
  resizableColumns?: boolean;
  loading?: boolean;
  loadingRowCount?: number;
  hover?: boolean;
  expandable?: boolean;
  expandedRowKeys?: (string | number)[];
  expandedRowRender?: (row: T) => ReactNode;
  onExpandedRowsChange?: (expandedKeys: (string | number)[]) => void;
  EmptyState?: ReactNode;
  LoadingState?: ReactNode;
  rowClassName?: (row: T) => string;
  onRowClick?: (row: T) => void;
  height?: number | string;
  bulkActions?: ReactNode;
}
