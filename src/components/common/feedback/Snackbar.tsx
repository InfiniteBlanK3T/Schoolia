import React, { useEffect, useState } from 'react';
import { SnackbarProps, Position } from './types';

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  position = 'bottom-center',
  action,
  autoHideDuration = 5000,
  onClose,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      if (autoHideDuration) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [open, autoHideDuration, onClose]);

  const positionClasses: Record<Position, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  if (!isVisible) return null;

  return (
    <div
      role='alert'
      aria-label={ariaLabel || 'Notification'}
      className={`
        fixed z-50 min-w-[280px] max-w-md
        p-4 bg-gray-800 text-white rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        ${positionClasses[position]}
        ${className}
      `}
      style={style}
    >
      <div className='flex items-center justify-between'>
        <span className='flex-1 mr-4'>{message}</span>
        {action && <div className='flex-shrink-0'>{action}</div>}
      </div>
    </div>
  );
};
