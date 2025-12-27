import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

const Button = forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md
    transition-colors duration-150
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
  `;
  
  const variants = {
    default: `
      bg-white text-black border border-transparent
      hover:bg-white/90
    `,
    primary: `
      bg-primary text-white border border-transparent
      hover:bg-primary/90
    `,
    secondary: `
      bg-bg-secondary text-text-primary border border-border
      hover:bg-bg-tertiary
    `,
    ghost: `
      bg-transparent text-text-secondary
      hover:bg-bg-secondary hover:text-text-primary
    `,
    outline: `
      bg-transparent text-text-primary border border-border
      hover:bg-bg-secondary
    `,
    danger: `
      bg-error/10 text-error border border-error/20
      hover:bg-error/20
    `,
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    default: 'h-9 px-4 text-sm gap-2',
    lg: 'h-11 px-6 text-sm gap-2.5',
    icon: 'w-9 h-9 p-0',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    default: 'w-4 h-4',
    lg: 'w-4 h-4',
    icon: 'w-4 h-4',
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
