import type { ReactNode } from 'react';
import type {
  OutlinedInputProps,
  FilledInputProps,
  InputBaseProps as MuiInputBaseProps,
  InputBaseComponentProps,
} from '@mui/material';

export type InputSize = 'small' | 'medium';
export type InputVariant = 'outlined' | 'filled' | 'standard';
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'textarea';
export type InputValidationState = 'success' | 'warning' | 'error' | undefined;

export interface CustomInputComponentProps extends InputBaseComponentProps {
  mask?: string;
}

export interface InputBaseProps {
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helperText?: ReactNode;
  clearable?: boolean;
  showCount?: boolean;
  maxLength?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  validationState?: InputValidationState;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  validate?: (value: string) => string | undefined;
  onChange?: (value: string) => void;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  mask?: string;
  value?: string;
  defaultValue?: string;
}

type BaseInputProps = Omit<
  OutlinedInputProps | FilledInputProps | MuiInputBaseProps,
  keyof InputBaseProps | 'onChange' | 'value' | 'defaultValue'
>;

export interface InputProps extends InputBaseProps, BaseInputProps {}
