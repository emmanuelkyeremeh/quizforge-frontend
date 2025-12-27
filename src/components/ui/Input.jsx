import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

const Input = forwardRef(({ 
  className = '', 
  size = 'default',
  error = false,
  icon: Icon,
  ...props 
}, ref) => {
  const baseClasses = `
    w-full text-white
    bg-bg-secondary border rounded-md
    placeholder:text-text-tertiary
    transition-colors duration-150
    hover:border-border-hover
    focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-tertiary
  `;

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    default: 'h-9 px-3 text-sm',
    lg: 'h-11 px-4 text-sm',
  };

  const borderClasses = error 
    ? 'border-error focus:border-error' 
    : 'border-border';

  if (Icon) {
    return (
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          ref={ref}
          className={cn(baseClasses, sizes[size], borderClasses, 'pl-10', className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(baseClasses, sizes[size], borderClasses, className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
