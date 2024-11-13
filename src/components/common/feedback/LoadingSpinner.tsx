import React from 'react';
import { LoadingSpinnerProps } from './types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color,
  overlay = false,
  message,
  customAnimation,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const spinnerContent = (
    <div
      role='status'
      aria-label={ariaLabel || 'Loading'}
      className={`inline-flex flex-col items-center ${className}`}
      style={style}
    >
      <div
        className={`
          animate-spin rounded-full border-4
          border-gray-200
          ${sizeClasses[size]}
        `}
        style={{
          borderTopColor: color || '#3B82F6',
          animation: customAnimation || 'spin 1s linear infinite',
        }}
      />
      {message && <span className='mt-2 text-sm text-gray-600'>{message}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};
