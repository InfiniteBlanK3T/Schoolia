import React, { useEffect, useState } from 'react';
import { AlertProps } from './types';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

const severityIcons = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  title,
  content,
  dismissible = true,
  onDismiss,
  icon,
  action,
  autoHideDuration,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = (icon || severityIcons[severity]) as React.ElementType;

  useEffect(() => {
    if (autoHideDuration && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isVisible, onDismiss]);

  if (!isVisible) return null;

  const severityClasses = {
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
  };

  return (
    <div
      role='alert'
      aria-label={ariaLabel || `${severity} alert`}
      className={`
        flex items-start p-4 mb-4 border rounded-lg
        transition-all duration-300 ease-in-out
        ${severityClasses[severity]}
        ${className}
      `}
      style={style}
    >
      <div className='flex-shrink-0 mr-3'>
        <Icon size={20} />
      </div>
      <div className='flex-1'>
        {title && <h3 className='font-semibold mb-1'>{title}</h3>}
        <div className='text-sm'>{content}</div>
        {action && <div className='mt-2'>{action}</div>}
      </div>
      {dismissible && (
        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss?.();
          }}
          className='ml-4 text-gray-400 hover:text-gray-600 focus:outline-none'
          aria-label='Close alert'
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
