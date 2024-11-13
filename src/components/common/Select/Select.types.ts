import type { ReactNode } from 'react';
import type { MenuProps } from '@mui/material';

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'standard';

export interface SelectOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  group?: string;
  [key: string]: unknown;
}

export interface SelectGroupOption {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  /**
   * The select options
   */
  options: (SelectOption | SelectGroupOption)[];

  /**
   * Selected value(s)
   */
  value?: string | number | (string | number)[];

  defaultValue?: string | number | (string | number)[];

  /**
   * Whether multiple selection is allowed
   * @default false
   */
  multiple?: boolean;

  /**
   * Input label
   */
  label?: string;

  /**
   * Helper text
   */
  helperText?: ReactNode;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Select size
   * @default 'medium'
   */
  size?: SelectSize;

  /**
   * Select variant
   * @default 'outlined'
   */
  variant?: SelectVariant;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the select is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether to enable search/filter
   * @default false
   */
  searchable?: boolean;

  /**
   * Custom search/filter function
   */
  filterOption?: (input: string, option: SelectOption) => boolean;

  /**
   * Whether to show clear button
   * @default false
   */
  clearable?: boolean;

  /**
   * Custom render function for selected value
   */
  renderValue?: (value: string | string[] | number | number[]) => ReactNode;

  /**
   * Custom render function for option
   */
  renderOption?: (option: SelectOption) => ReactNode;

  /**
   * Menu props for customizing the dropdown
   */
  MenuProps?: Partial<MenuProps>;

  /**
   * Maximum height of the dropdown menu in pixels
   * @default 300
   */
  maxMenuHeight?: number;

  /**
   * Callback when value changes
   */
  onChange?: (value: string | string[] | number | number[]) => void;

  /**
   * Callback when select is cleared
   */
  onClear?: () => void;

  /**
   * Custom className
   */
  className?: string;
}
