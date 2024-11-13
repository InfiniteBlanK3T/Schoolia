import { ReactNode } from 'react';

export interface BaseInputProps {
  id?: string;
  name?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
}

export interface ValidationRule {
  validate: (value: string | number) => boolean | Promise<boolean>;
  message: string;
}

export interface Option {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export interface SearchInputProps extends BaseInputProps {
  onSearch: (value: string) => void;
  suggestions?: string[];
  debounceMs?: number;
  minChars?: number;
  onSuggestionSelected?: (suggestion: string) => void;
}

export interface SelectProps extends BaseInputProps {
  options: Option[] | OptionGroup[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  customOptionRender?: (option: Option) => ReactNode;
}

export interface TextFieldComponentProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  mask?: string;
  maxLength?: number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
  copyable?: boolean;
  onCopy?: () => void;
}
