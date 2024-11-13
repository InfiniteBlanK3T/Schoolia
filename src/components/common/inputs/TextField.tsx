import React, { forwardRef, useState } from 'react';
import { TextField as MuiTextField, InputAdornment, IconButton } from '@mui/material';
import { Clear, ContentCopy } from '@mui/icons-material';
import { TextFieldComponentProps } from './types';

export const TextField = forwardRef<HTMLInputElement, TextFieldComponentProps>(
  (
    {
      value,
      onChange,
      mask,
      maxLength,
      startIcon,
      endIcon,
      error,
      helperText,
      loading,
      copyable,
      onCopy,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value);
      onCopy?.();
    };

    const characterCount = value?.length ?? 0;

    return (
      <MuiTextField
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        helperText={
          <>
            {helperText}
            {maxLength && (
              <span className='text-xs text-gray-500 ml-2'>
                {characterCount}/{maxLength}
              </span>
            )}
          </>
        }
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position='start'>{startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              {value && !loading && (
                <IconButton aria-label='clear input' onClick={() => onChange('')} size='small'>
                  <Clear />
                </IconButton>
              )}
              {copyable && value && (
                <IconButton aria-label='copy to clipboard' onClick={handleCopy} size='small'>
                  <ContentCopy />
                </IconButton>
              )}
              {endIcon}
            </InputAdornment>
          ),
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    );
  }
);
