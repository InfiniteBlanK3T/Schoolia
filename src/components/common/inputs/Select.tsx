import { useState } from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  ListSubheader,
  TextField,
  CircularProgress,
} from '@mui/material';
import { SelectProps, Option, OptionGroup } from './types';

export const Select = ({
  options,
  value,
  onChange,
  multiple,
  searchable,
  loading,
  loadingMore,
  onLoadMore,
  customOptionRender,
  ...props
}: SelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const isGrouped = (option: Option | OptionGroup): option is OptionGroup => {
    return 'options' in option;
  };

  const filterOptions = (options: (Option | OptionGroup)[]) => {
    if (!searchTerm) return options;

    return options
      .map((option) => {
        if (isGrouped(option)) {
          return {
            ...option,
            options: option.options.filter((opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase())
            ),
          };
        }
        return option;
      })
      .filter((option) => {
        if (isGrouped(option)) {
          return option.options.length > 0;
        }
        return option.label.toLowerCase().includes(searchTerm.toLowerCase());
      });
  };

  const filteredOptions = filterOptions(options);

  const renderOptions = (options: (Option | OptionGroup)[]) => {
    return options.map((option) => {
      if (isGrouped(option)) {
        return [
          <ListSubheader key={option.label}>{option.label}</ListSubheader>,
          ...option.options.map((opt) => renderOption(opt)),
        ];
      }
      return renderOption(option as Option);
    });
  };

  const renderOption = (option: Option) => {
    return (
      <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
        {customOptionRender ? customOptionRender(option) : option.label}
      </MenuItem>
    );
  };

  return (
    <MuiSelect
      multiple={multiple}
      value={value}
      onChange={(e) => onChange(e.target.value as string | string[])}
      {...props}
    >
      {searchable && (
        <TextField
          fullWidth
          size='small'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          sx={{ m: 1 }}
        />
      )}
      {renderOptions(filteredOptions)}
      {loadingMore && (
        <MenuItem disabled>
          <CircularProgress size={20} />
          Loading more...
        </MenuItem>
      )}
    </MuiSelect>
  );
};
