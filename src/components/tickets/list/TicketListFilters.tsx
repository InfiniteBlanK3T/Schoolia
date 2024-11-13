import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { SearchInput } from '@/components/common/inputs/SearchInput';
import { Select } from '@/components/common/inputs/Select';
import { TextField } from '@/components/common/inputs/TextField';
import { Button } from '@/components/common/buttons/Button';
import { IconButton } from '@/components/common/buttons/IconButton';
import { Dialog } from '@/components/common/display/Dialog';
import { TicketStatus, TicketPriority, TicketType } from '@/types/ticket.types';
import { TicketFilters } from './types';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface TicketListFiltersProps {
  filters: TicketFilters;
  onFiltersChange: (filters: TicketFilters) => void;
  className?: string;
}

const TicketListFilters: React.FC<TicketListFiltersProps> = ({
  filters,
  onFiltersChange,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.searchQuery || '');

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onFiltersChange({ ...filters, searchQuery: value });
      }, 300),
    [filters, onFiltersChange]
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleStatusChange = (selectedStatuses: TicketStatus[]) => {
    onFiltersChange({ ...filters, status: selectedStatuses });
  };

  const handlePriorityChange = (selectedPriorities: TicketPriority[]) => {
    onFiltersChange({ ...filters, priority: selectedPriorities });
  };

  const handleTypeChange = (selectedTypes: TicketType[]) => {
    onFiltersChange({ ...filters, type: selectedTypes });
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    onFiltersChange({ ...filters, tags });
  };

  const clearFilters = () => {
    setSearchValue('');
    onFiltersChange({});
  };

  const hasActiveFilters = useMemo(() => {
    return (
      !!filters.searchQuery ||
      !!filters.status?.length ||
      !!filters.priority?.length ||
      !!filters.type?.length ||
      !!filters.tags?.length
    );
  }, [filters]);

  const FilterContent = () => (
    <div className='space-y-4'>
      {/* Status Filter */}
      <div>
        <label className='text-sm font-medium text-gray-700 mb-1 block'>Status</label>
        <Select
          options={Object.values(TicketStatus).map((status) => ({
            value: status,
            label: status.replace('_', ' '),
          }))}
          value={filters.status?.map((status) => ({
            value: status,
            label: status.replace('_', ' '),
          }))}
          onChange={(event) =>
            handleStatusChange(
              Array.from(
                (event.target as HTMLSelectElement).selectedOptions,
                (option) => option.value as TicketStatus
              )
            )
          }
          placeholder='Select status'
        />
      </div>

      {/* Priority Filter */}
      <div>
        <label className='text-sm font-medium text-gray-700 mb-1 block'>Priority</label>
        <Select
          options={Object.values(TicketPriority).map((priority) => ({
            value: priority,
            label: priority,
          }))}
          onChange={(event) =>
            handlePriorityChange(
              Array.from(
                (event.target as HTMLSelectElement).selectedOptions,
                (option) => option.value as TicketPriority
              )
            )
          }
          placeholder='Select priority'
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className='text-sm font-medium text-gray-700 mb-1 block'>Type</label>
        <Select
          options={Object.values(TicketType).map((type) => ({
            value: type,
            label: type.replace('_', ' '),
          }))}
          onChange={(event) =>
            handleTypeChange(
              Array.from(
                (event.target as HTMLSelectElement).selectedOptions,
                (option) => option.value as TicketType
              )
            )
          }
          placeholder='Select type'
        />
      </div>

      {/* Tags Filter */}
      <div>
        <label className='text-sm font-medium text-gray-700 mb-1 block'>Tags</label>
        <TextField
          value={filters.tags?.join(', ') || ''}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder='Enter tags separated by commas'
        />
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Bar - Always Visible */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex-grow'>
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder='Search tickets...'
            className='w-full'
          />
        </div>

        {/* Desktop Filter Toggle */}
        <div className='hidden md:flex items-center gap-2'>
          <Button
            variant='secondary'
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-2'
          >
            <Filter className='h-4 w-4' />
            Filters
            {isExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
          </Button>

          {hasActiveFilters && (
            <Button
              variant='secondary'
              onClick={clearFilters}
              className='flex items-center gap-2 text-gray-500'
            >
              <X className='h-4 w-4' />
              Clear
            </Button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className='md:hidden'>
          <IconButton
            onClick={() => setIsMobileFiltersOpen(true)}
            aria-label='Open filters'
            variant='secondary'
            icon={<Filter className='h-5 w-5' />}
          />
        </div>
      </div>

      {/* Desktop Expanded Filters */}
      {isExpanded && (
        <div className='hidden md:block p-4 bg-white rounded-lg border'>
          <FilterContent />
        </div>
      )}

      {/* Mobile Filters Dialog */}
      <Dialog
        open={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        title='Filters'
        className='sm:max-w-lg'
      >
        <div className='p-4'>
          <FilterContent />
          <div className='mt-6 flex items-center justify-between'>
            <Button variant='secondary' onClick={clearFilters} className='flex items-center gap-2'>
              <X className='h-4 w-4' />
              Clear filters
            </Button>
            <Button variant='primary' onClick={() => setIsMobileFiltersOpen(false)}>
              Apply filters
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default React.memo(TicketListFilters);
