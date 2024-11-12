import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown) => string | JSX.Element;
  sortable?: boolean;
  hidden?: boolean | ((breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => boolean);
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  selectable?: boolean;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  selectedRows?: T[];
  onRowSelect?: (selectedRows: T[]) => void;
  sortBy?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (property: keyof T) => void;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  totalCount?: number;
  rowsPerPageOptions?: number[];
  getRowId?: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  hover?: boolean;
}

/**
 * Advanced Table component with sorting, pagination, and responsive design
 *
 * @template T
 * @param {TableProps<T>} props - The props for the table component
 * @returns {JSX.Element} A customized table component
 *
 * @example
 * <Table
 *   columns={[
 *     { id: 'id', label: 'ID' },
 *     { id: 'status', label: 'Status' },
 *     { id: 'title', label: 'Title' },
 *   ]}
 *   rows={tickets}
 *   loading={isLoading}
 *   selectable
 *   onRowSelect={handleSelect}
 *   sortBy="createdAt"
 *   sortDirection="desc"
 *   onSort={handleSort}
 * />
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  selectable = false,
  loading = false,
  error,
  emptyMessage = 'No data available',
  selectedRows = [],
  onRowSelect,
  sortBy,
  sortDirection = 'asc',
  onSort,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  rowsPerPageOptions = [5, 10, 25, 50],
  getRowId = (row: T) => row.id as string | number,
  onRowClick,
  hover = true,
}: TableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Filter visible columns based on breakpoint
  const visibleColumns = columns.filter((column) => {
    if (typeof column.hidden === 'function') {
      return !column.hidden(isMobile ? 'xs' : isTablet ? 'sm' : 'md');
    }
    return !column.hidden;
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onRowSelect) {
      if (event.target.checked) {
        onRowSelect(rows);
      } else {
        onRowSelect([]);
      }
    }
  };

  const handleRowSelect = (row: T) => {
    if (onRowSelect) {
      const selectedIndex = selectedRows.findIndex(
        (selectedRow) => getRowId(selectedRow) === getRowId(row)
      );
      let newSelectedRows: T[] = [];

      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, row];
      } else {
        newSelectedRows = selectedRows.filter((_, index) => index !== selectedIndex);
      }

      onRowSelect(newSelectedRows);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(parseInt(event.target.value, 10));
    }
    if (onPageChange) {
      onPageChange(0);
    }
  };

  if (loading) {
    return (
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {selectable && <TableCell padding='checkbox' />}
              {visibleColumns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Skeleton variant='text' />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(rowsPerPage)].map((_, index) => (
              <TableRow key={index}>
                {selectable && (
                  <TableCell padding='checkbox'>
                    <Skeleton variant='rectangular' width={20} height={20} />
                  </TableCell>
                )}
                {visibleColumns.map((column) => (
                  <TableCell key={String(column.id)}>
                    <Skeleton variant='text' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'error.main',
        }}
      >
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  if (!rows.length) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color='textSecondary'>{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding='checkbox'>
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                    checked={rows.length > 0 && selectedRows.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              )}
              {visibleColumns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                >
                  {column.sortable && onSort ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => onSort(column.id)}
                    >
                      {column.label}
                      {sortBy === column.id ? (
                        <Box component='span' sx={visuallyHidden}>
                          {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selectedRows.some(
                (selectedRow) => getRowId(selectedRow) === getRowId(row)
              );

              return (
                <TableRow
                  hover={hover}
                  key={getRowId(row)}
                  selected={isSelected}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {selectable && (
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleRowSelect(row)}
                        inputProps={{ 'aria-label': 'select row' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={String(column.id)} align={column.align}>
                        {column.format ? column.format(value) : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {onPageChange && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={totalCount ?? rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
