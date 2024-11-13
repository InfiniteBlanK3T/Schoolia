import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectProps, SelectOption, SelectGroupOption } from './Select.types';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  },
}));

const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  margin: theme.spacing(1),
  width: `calc(100% - ${theme.spacing(2)})`,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1),
  },
}));

const LoadingWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
});

const isGroupOption = (option: SelectOption | SelectGroupOption): option is SelectGroupOption => {
  return 'options' in option && Array.isArray(option.options);
};

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    options,
    value,
    defaultValue,
    multiple = false,
    label,
    helperText,
    placeholder,
    size = 'medium' as 'small' | 'medium',
    variant = 'outlined',
    disabled = false,
    required = false,
    error = false,
    loading = false,
    searchable = false,
    filterOption,
    clearable = false,
    renderValue,
    renderOption,
    MenuProps,
    maxMenuHeight = 300,
    onChange,
    onClear,
    className,
    ...rest
  } = props;

  const [searchText, setSearchText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }, []);

  const handleClear = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClear?.();
      onChange?.(multiple ? [] : '');
    },
    [multiple, onChange, onClear]
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options;

    return options
      .map((option) => {
        if (isGroupOption(option)) {
          return {
            ...option,
            options: option.options.filter((opt) =>
              filterOption
                ? filterOption(searchText, opt)
                : (opt.label ?? '').toString().toLowerCase().includes(searchText.toLowerCase())
            ),
          };
        }

        if (filterOption) {
          return filterOption(searchText, option as SelectOption) ? option : null;
        }

        return (option as SelectOption)?.label
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
          ? option
          : null;
      })
      .filter(Boolean);
  }, [options, searchable, searchText, filterOption]);

  const renderSelectValue = useCallback(
    (selected: string | string[]) => {
      if (!selected || (Array.isArray(selected) && selected.length === 0)) {
        return <Typography color='text.secondary'>{placeholder}</Typography>;
      }

      if (renderValue) {
        return renderValue(selected);
      }

      const selectedOptions = (Array.isArray(selected) ? selected : [selected]).map((value) =>
        options
          .flatMap((option) => (isGroupOption(option) ? option.options : option))
          .find((option) => option.value === value)
      );

      return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedOptions.map((option) => (
            <div key={option?.value}>{option?.label}</div>
          ))}
        </div>
      );
    },
    [options, placeholder, renderValue]
  );

  return (
    <StyledFormControl
      ref={ref}
      fullWidth
      variant={variant}
      size={size as 'small' | 'medium'}
      error={error}
      disabled={disabled}
      className={className}
    >
      {label && (
        <InputLabel id='select-label' required={required}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        labelId='select-label'
        multiple={multiple}
        value={Array.isArray(value) ? value.map(String) : String(value ?? '')}
        defaultValue={defaultValue as string | string[] | undefined}
        onChange={(event) => onChange?.(event.target.value)}
        onOpen={() => setMenuOpen(true)}
        onClose={() => {
          setMenuOpen(false);
          setSearchText('');
        }}
        renderValue={renderSelectValue}
        {...(clearable &&
          value &&
          !disabled && {
            endAdornment: (
              <IconButton size='small' onClick={handleClear} sx={{ mr: 2 }} tabIndex={-1}>
                <ClearIcon />
              </IconButton>
            ),
          })}
        MenuProps={{
          ...MenuProps,
          PaperProps: {
            ...MenuProps?.PaperProps,
            style: {
              ...MenuProps?.PaperProps?.style,
              maxHeight: maxMenuHeight,
            },
          },
        }}
        {...rest}
      >
        {searchable && menuOpen && (
          <SearchInput
            autoFocus
            placeholder='Search...'
            value={searchText}
            onChange={handleSearch}
            startAdornment={<SearchIcon color='action' />}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        {loading ? (
          <LoadingWrapper>
            <CircularProgress size={24} />
          </LoadingWrapper>
        ) : (
          filteredOptions
            .filter((option): option is SelectOption | SelectGroupOption => option !== null)
            .map((option, index) => {
              if (isGroupOption(option)) {
                return [
                  <ListSubheader key={`group-${index}`}>{option.label}</ListSubheader>,
                  ...option.options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {renderOption ? renderOption(opt) : opt.label}
                    </MenuItem>
                  )),
                ];
              }

              const opt = option as SelectOption;
              return (
                <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {renderOption ? renderOption(opt) : opt.label}
                </MenuItem>
              );
            })
        )}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
});

Select.displayName = 'Select';

export default Select;
