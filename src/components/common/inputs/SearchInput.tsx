import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { SearchInputProps } from './types';

export const SearchInput = ({
  onSearch,
  suggestions = [],
  debounceMs = 300,
  minChars = 2,
  loading,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [localSuggestions, setLocalSuggestions] = useState<string[]>([]);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length >= minChars) {
        onSearch(searchTerm);
      }
    }, debounceMs),
    [onSearch, minChars]
  );

  useEffect(() => {
    setLocalSuggestions(suggestions);
  }, [suggestions]);

  return (
    <Autocomplete
      freeSolo
      options={localSuggestions}
      inputValue={value}
      onInputChange={(_, newValue) => {
        setValue(newValue);
        debouncedSearch(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <Search />
                {params.InputProps.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
