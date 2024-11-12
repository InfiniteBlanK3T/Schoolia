import React from 'react';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'error'> {
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Custom TextField component with enhanced error handling and icon support
 *
 * @param {TextFieldProps} props - The props for the text field component
 * @returns {JSX.Element} A customized text field component
 *
 * @example
 * <TextField
 *   label="Search Tickets"
 *   startIcon={<SearchIcon />}
 *   error="Invalid input"
 *   onChange={handleChange}
 * />
 */
export const TextField: React.FC<TextFieldProps> = ({
  error,
  startIcon,
  endIcon,
  InputProps,
  ...props
}) => {
  const inputProps = {
    ...InputProps,
    startAdornment: startIcon ? (
      <InputAdornment position='start'>{startIcon}</InputAdornment>
    ) : (
      InputProps?.startAdornment
    ),
    endAdornment: endIcon ? (
      <InputAdornment position='end'>{endIcon}</InputAdornment>
    ) : (
      InputProps?.endAdornment
    ),
  };

  return (
    <>
      <MuiTextField
        {...props}
        error={!!error}
        InputProps={inputProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
              '& > fieldset': {
                borderWidth: 2,
              },
            },
          },
          ...props.sx,
        }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};
