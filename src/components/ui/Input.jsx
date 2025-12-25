import { forwardRef } from 'react';

const Input = forwardRef(({ 
  className = '', 
  size = 'default',
  error = false,
  icon: Icon,
  ...props 
}, ref) => {
  const baseClasses = `
    w-full text-text-primary
    bg-bg-secondary border rounded-md
    placeholder:text-text-tertiary
    transition-all duration-150 ease-out
    hover:border-border-hover
    focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-tertiary
  `;

  const sizes = {
    sm: 'h-8 px-2.5 text-sm',
    default: 'h-10 px-3 text-base',
    lg: 'h-12 px-4 text-lg',
  };

  const borderClasses = error 
    ? 'border-error focus:border-error focus:ring-error/20' 
    : 'border-border';

  if (Icon) {
    return (
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          ref={ref}
          className={`${baseClasses} ${sizes[size]} ${borderClasses} pl-10 ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={`${baseClasses} ${sizes[size]} ${borderClasses} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
