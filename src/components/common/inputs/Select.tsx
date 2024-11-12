import React from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, 'error'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Custom Select component with enhanced options handling
 *
 * @param {SelectProps} props - The props for the select component
 * @returns {JSX.Element} A customized select component
 *
 * @example
 * <Select
 *   label="Priority"
 *   options={[
 *     { value: 'high', label: 'High' },
 *     { value: 'medium', label: 'Medium' },
 *     { value: 'low', label: 'Low' },
 *   ]}
 *   value={priority}
 *   onChange={handleChange}
 * />
 */
export const Select: React.FC<SelectProps> = ({ options, label, error, helperText, ...props }) => {
  const labelId = `${props.id || 'select'}-label`;

  return (
    <FormControl fullWidth error={!!error} size={props.size} disabled={props.disabled}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect {...props} labelId={labelId} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};
