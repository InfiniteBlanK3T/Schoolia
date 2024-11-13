import React, { useState, useCallback, useMemo } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  IconButton,
  Skeleton,
  Collapse,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { TableProps, Column, SortDirection } from './Table.types';
import { get } from 'lodash';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  '& .MuiTableCell-root': {
    padding: theme.spacing(1.5),
  },
  '& .MuiTableCell-stickyHeader': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TableCellWrapper = styled('div')<{ width?: number | string }>(({ width }) => ({
  position: 'relative',
  width: typeof width === 'number' ? `${width}px` : width,
  minWidth: typeof width === 'number' ? `${width}px` : width,
}));

function Table<T extends object>({
  data,
  columns: initialColumns,
  selectable = false,
  selectionMode = 'none',
  selectedRowKeys = [],
  onSelectionChange,
  rowKey = 'id',
  showHeader = true,
  stickyHeader = false,
  sortable = false,
  defaultSortField,
  defaultSortDirection,
  loading = false,
  loadingRowCount = 5,
  hover = true,
  expandable = false,
  expandedRowKeys = [],
  expandedRowRender,
  onExpandedRowsChange,
  EmptyState,
  LoadingState,
  rowClassName,
  onRowClick,
  height,
  bulkActions,
  ...rest
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: SortDirection;
  }>({
    field: defaultSortField || '',
    direction: defaultSortDirection,
  });
  const [expanded, setExpanded] = useState<Set<string | number>>(new Set(expandedRowKeys));

  const getRowKey = useCallback(
    (row: T): string | number => {
      return typeof rowKey === 'function' ? rowKey(row) : get(row, rowKey);
    },
    [rowKey]
  );

  const handleSort = useCallback((columnId: string) => {
    setSortConfig((prev) => ({
      field: columnId,
      direction:
        prev.field === columnId
          ? prev.direction === 'asc'
            ? 'desc'
            : prev.direction === 'desc'
              ? undefined
              : 'asc'
          : 'asc',
    }));
  }, []);

  const handleSelect = useCallback(
    (rowKey: string | number) => {
      if (selectionMode === 'none') return;

      if (selectionMode === 'single') {
        onSelectionChange?.([rowKey]);
        return;
      }

      const newSelected = new Set(selectedRowKeys);
      if (newSelected.has(rowKey)) {
        newSelected.delete(rowKey);
      } else {
        newSelected.add(rowKey);
      }
      onSelectionChange?.(Array.from(newSelected));
    },
    [selectionMode, selectedRowKeys, onSelectionChange]
  );

  const handleSelectAll = useCallback(() => {
    onSelectionChange?.(selectedRowKeys.length === data.length ? [] : data.map(getRowKey));
  }, [data, selectedRowKeys.length, onSelectionChange, getRowKey]);

  const handleExpand = useCallback(
    (rowKey: string | number) => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(rowKey)) {
        newExpanded.delete(rowKey);
      } else {
        newExpanded.add(rowKey);
      }
      setExpanded(newExpanded);
      onExpandedRowsChange?.(Array.from(newExpanded));
    },
    [expanded, onExpandedRowsChange]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig.field || !sortConfig.direction) return data;

    const column = initialColumns.find((col) => col.id === sortConfig.field);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor
        ? get(a, column.accessor)
        : (a as Record<string, unknown>)[column.id];
      const bValue = column.accessor
        ? get(b, column.accessor)
        : (b as Record<string, unknown>)[column.id];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, initialColumns, sortConfig]);

  const renderCell = useCallback((row: T, column: Column<T>) => {
    const value = column.accessor
      ? get(row, column.accessor)
      : (row as Record<string, unknown>)[column.id];
    return column.Cell ? column.Cell({ row, value }) : <span>{value?.toString()}</span>;
  }, []);

  const renderLoadingState = () => (
    <TableBody>
      {Array.from({ length: loadingRowCount }).map((_, index) => (
        <TableRow key={index}>
          {selectable && (
            <TableCell padding='checkbox'>
              <Skeleton variant='rectangular' width={20} height={20} />
            </TableCell>
          )}
          {expandable && (
            <TableCell padding='checkbox'>
              <Skeleton variant='rectangular' width={20} height={20} />
            </TableCell>
          )}
          {initialColumns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{
                width: column.width,
                minWidth: column.minWidth,
              }}
            >
              <Skeleton variant='text' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  if (loading && LoadingState) {
    return LoadingState;
  }

  return (
    <Paper>
      {bulkActions && selectedRowKeys.length > 0 && <Box sx={{ p: 2 }}>{bulkActions}</Box>}
      <StyledTableContainer sx={{ height }}>
        <MuiTable stickyHeader={stickyHeader} {...rest}>
          {showHeader && (
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={data.length > 0 && selectedRowKeys.length === data.length}
                      indeterminate={
                        selectedRowKeys.length > 0 && selectedRowKeys.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                {expandable && <TableCell padding='checkbox' />}
                {initialColumns.map((column) =>
                  column.hidden ? null : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                      }}
                      {...(column.sticky && {
                        sticky: true,
                        left: 0,
                      })}
                    >
                      <TableCellWrapper width={column.width}>
                        {column.HeaderCell ? (
                          column.HeaderCell({ column })
                        ) : column.sortable && sortable ? (
                          <TableSortLabel
                            active={sortConfig.field === column.id}
                            direction={
                              sortConfig.field === column.id ? sortConfig.direction : 'asc'
                            }
                            onClick={() => handleSort(column.id)}
                          >
                            {column.header}
                          </TableSortLabel>
                        ) : (
                          column.header
                        )}
                      </TableCellWrapper>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
          )}
          {loading ? (
            renderLoadingState()
          ) : (
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={initialColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)}
                    align='center'
                  >
                    {EmptyState || 'No data available'}
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row) => {
                  const rowId = getRowKey(row);
                  const isSelected = selectedRowKeys.includes(rowId);
                  const isExpanded = expanded.has(rowId);

                  return (
                    <React.Fragment key={rowId}>
                      <TableRow
                        hover={hover}
                        selected={isSelected}
                        onClick={() => onRowClick?.(row)}
                        className={rowClassName?.(row)}
                      >
                        {selectable && (
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleSelect(rowId)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                        )}
                        {expandable && (
                          <TableCell padding='checkbox'>
                            <IconButton
                              size='small'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExpand(rowId);
                              }}
                            >
                              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                        )}
                        {initialColumns.map((column) =>
                          column.hidden ? null : (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              {...(column.sticky && {
                                sticky: true,
                                left: 0,
                              })}
                            >
                              {renderCell(row, column)}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                      {expandable && expandedRowRender && (
                        <TableRow>
                          <TableCell
                            colSpan={
                              initialColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
                            }
                            sx={{ py: 0, borderBottom: 0 }}
                          >
                            <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                              <Box sx={{ py: 2 }}>{expandedRowRender(row)}</Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          )}
        </MuiTable>
      </StyledTableContainer>
    </Paper>
  );
}

export default Table;
