import React, { forwardRef } from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ButtonProps, CustomButtonVariant, MuiVariant } from './Button.types';

const LoadingIndicator = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
});

interface StyledButtonProps extends Omit<ButtonProps, 'variant'> {
  customVariant?: CustomButtonVariant;
  variant: MuiVariant;
}

const StyledMuiButton = styled(MuiButton, {
  shouldForwardProp: (prop) =>
    !['loading', 'showLoadingIndicator', 'loadingPosition', 'customVariant'].includes(
      prop as string
    ),
})<StyledButtonProps>(({ theme, customVariant, color = 'primary', loading }) => ({
  position: 'relative',
  ...(customVariant === 'primary' && {
    '&.MuiButton-contained': {
      backgroundColor: theme.palette[color].main,
      color: theme.palette[color].contrastText,
      '&:hover': {
        backgroundColor: theme.palette[color].dark,
      },
    },
  }),
  ...(customVariant === 'secondary' && {
    '&.MuiButton-outlined': {
      borderColor: theme.palette[color].main,
      color: theme.palette[color].main,
      '&:hover': {
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
      },
    },
  }),
  '&.Mui-disabled': {
    backgroundColor: loading ? theme.palette[color].main : theme.palette.action.disabled,
    opacity: loading ? 0.7 : 0.5,
  },
  ...(loading && {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
    },
  }),
}));

const getMuiVariant = (customVariant: CustomButtonVariant): MuiVariant => {
  switch (customVariant) {
    case 'primary':
      return 'contained';
    case 'secondary':
      return 'outlined';
    case 'text':
      return 'text';
    default:
      return 'contained';
  }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    loading = false,
    loadingIndicator,
    showLoadingIndicator = true,
    loadingPosition = 'center',
    loadingText,
    startIcon,
    endIcon,
    disabled,
    variant = 'primary',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    onClick,
    ...rest
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && onClick) {
      onClick(event);
    }
  };

  const renderLoadingIndicator = () => {
    if (loading && showLoadingIndicator) {
      return (
        loadingIndicator || (
          <LoadingIndicator
            size={24}
            color='inherit'
            {...(loadingPosition === 'start' && { sx: { position: 'relative', ml: -1, mr: 1 } })}
            {...(loadingPosition === 'end' && { sx: { position: 'relative', mr: -1, ml: 1 } })}
          />
        )
      );
    }
    return null;
  };

  const buttonText = loading && loadingText ? loadingText : children;
  const muiVariant = getMuiVariant(variant);

  return (
    <StyledMuiButton
      ref={ref}
      variant={muiVariant}
      customVariant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={handleClick}
      startIcon={loadingPosition === 'start' ? renderLoadingIndicator() : startIcon}
      endIcon={loadingPosition === 'end' ? renderLoadingIndicator() : endIcon}
      {...rest}
    >
      {loadingPosition === 'center' && renderLoadingIndicator()}
      {buttonText}
    </StyledMuiButton>
  );
});

Button.displayName = 'Button';

export default Button;
