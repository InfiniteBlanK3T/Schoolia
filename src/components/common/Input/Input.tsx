import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import {
  InputBase,
  OutlinedInput,
  FilledInput,
  InputLabel,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Clear } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import type { InputProps, InputValidationState, CustomInputComponentProps } from './Input.types';

interface CustomInputProps {
  validationState?: InputValidationState;
}

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== 'validationState',
})<CustomInputProps>(({ theme, validationState }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    ...(validationState === 'success' && {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.success.main,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.success.dark,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.success.main,
      },
    }),
    ...(validationState === 'warning' && {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.warning.main,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.warning.dark,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.warning.main,
      },
    }),
  },
  '& .MuiInputBase-input': {
    '&::placeholder': {
      opacity: 0.7,
      transition: theme.transitions.create('opacity'),
    },
    '&:focus::placeholder': {
      opacity: 0.4,
    },
  },
}));

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: theme.spacing(0.5, 0, 0),
}));

const CustomInputComponent = forwardRef<HTMLInputElement, CustomInputComponentProps>(
  function CustomInputComponent(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask!}
        inputRef={ref}
        onAccept={(value: string | number) => {
          onChange?.({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        overwrite
      />
    );
  }
);

const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    type = 'text',
    variant = 'outlined',
    size = 'medium',
    label,
    helperText,
    placeholder,
    disabled = false,
    readOnly = false,
    clearable = false,
    showCount = false,
    maxLength,
    prefix,
    suffix,
    validationState,
    required = false,
    autosize = false,
    minRows = 3,
    maxRows = 5,
    validate,
    onChange,
    onClear,
    showPasswordToggle = true,
    mask,
    defaultValue,
    value: controlledValue,
    error,
    className,
    // Remove props that might cause conflicts
    ...rest
  } = props;

  const [value, setValue] = useState(defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (maxLength && newValue.length > maxLength) return;

      if (!controlledValue) {
        setValue(newValue);
      }

      if (validate) {
        const message = validate(newValue);
        setValidationMessage(message);
      }

      onChange?.(newValue);
    },
    [controlledValue, maxLength, onChange, validate]
  );

  const handleClear = useCallback(() => {
    if (!controlledValue) {
      setValue('');
    }
    onClear?.();
    onChange?.('');
    inputRef.current?.focus();
  }, [controlledValue, onChange, onClear]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const getInputComponent = () => {
    switch (variant) {
      case 'filled':
        return FilledInput;
      case 'standard':
        return InputBase;
      default:
        return OutlinedInput;
    }
  };

  const InputComponent = getInputComponent();

  const endAdornment = (
    <InputAdornment position='end'>
      {clearable && value && !disabled && !readOnly && (
        <IconButton size='small' onClick={handleClear} aria-label='clear input' edge='end'>
          <Clear />
        </IconButton>
      )}
      {type === 'password' && showPasswordToggle && (
        <IconButton
          size='small'
          onClick={togglePasswordVisibility}
          aria-label='toggle password visibility'
          edge='end'
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
      {suffix && <InputAdornment position='end'>{suffix}</InputAdornment>}
    </InputAdornment>
  );

  const startAdornment = prefix && <InputAdornment position='start'>{prefix}</InputAdornment>;

  return (
    <StyledFormControl
      ref={ref}
      className={className}
      variant={variant}
      size={size}
      error={error || !!validationMessage}
      validationState={validationState}
    >
      {label && (
        <InputLabel htmlFor={rest.id} error={error || !!validationMessage} required={required}>
          {label}
        </InputLabel>
      )}
      <InputComponent
        inputRef={inputRef}
        id={rest.id}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        error={error || !!validationMessage}
        placeholder={placeholder}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        inputProps={{
          readOnly,
          maxLength,
          ...(type === 'number' && {
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }),
          ...rest.inputProps,
        }}
        multiline={type === 'textarea'}
        minRows={type === 'textarea' ? minRows : undefined}
        maxRows={type === 'textarea' && !autosize ? maxRows : undefined}
        required={required}
        {...(mask && {
          inputComponent: CustomInputComponent,
          inputProps: {
            mask,
            ...rest.inputProps,
          },
        })}
        {...rest}
      />
      {(helperText || showCount || validationMessage) && (
        <StyledFormHelperText error={!!validationMessage}>
          <span>{validationMessage || helperText}</span>
          {showCount && (
            <Typography variant='caption' color='textSecondary'>
              {value.length}
              {maxLength ? `/${maxLength}` : ''}
            </Typography>
          )}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
});

Input.displayName = 'Input';

export default Input;
