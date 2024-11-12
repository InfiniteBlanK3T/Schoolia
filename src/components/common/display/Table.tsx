import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { TableProps } from './types';
import { useState } from 'react';

export function Table<T extends { [key: string]: unknown }>({
  data,
  columns,
  loading,
  error,
  onSort,
  pagination,
  className,
  ...props
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof T) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
    onSort?.(column, isAsc ? 'desc' : 'asc');
  };

  return (
    <Paper className={className} {...props}>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortColumn === column.id}
                      direction={sortColumn === column.id ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align='center' padding='normal'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Alert severity='error'>{error}</Alert>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {column.render ? column.render(row[column.id], row) : String(row[column.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {pagination && (
        <TablePagination
          component='div'
          count={pagination.total}
          page={pagination.page}
          onPageChange={(_, page) => pagination.onPageChange(page)}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={(e) => pagination.onPageSizeChange(parseInt(e.target.value, 10))}
        />
      )}
    </Paper>
  );
}
