import React from 'react';
import { TextField, TextFieldProps } from '../inputs/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '../buttons/IconButton';

export interface SearchInputProps extends Omit<TextFieldProps, 'type'> {
  onClear?: () => void;
}

/**
 * Search input component with clear functionality
 *
 * @param {SearchInputProps} props - The props for the search input
 * @returns {JSX.Element} A search input component
 *
 * @example
 * <SearchInput
 *   placeholder="Search tickets..."
 *   value={searchQuery}
 *   onChange={handleChange}
 *   onClear={handleClear}
 * />
 */
export const SearchInput: React.FC<SearchInputProps> = ({ onClear, value, ...props }) => {
  return (
    <TextField
      {...props}
      type='search'
      value={value}
      startIcon={<SearchIcon />}
      endIcon={
        value && onClear ? (
          <IconButton aria-label='clear search' onClick={onClear} size='small'>
            <ClearIcon />
          </IconButton>
        ) : undefined
      }
    />
  );
};
