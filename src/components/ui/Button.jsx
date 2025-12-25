import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
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
    transition-all duration-150 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
  `;
  
  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-light hover:shadow-glow-primary
      active:bg-primary-dark
    `,
    secondary: `
      bg-surface text-text-primary border border-border
      hover:bg-surface-hover hover:border-border-hover
      active:bg-surface-active
    `,
    ghost: `
      bg-transparent text-text-secondary
      hover:bg-surface hover:text-text-primary
      active:bg-surface-active
    `,
    danger: `
      bg-error-subtle text-error-text
      hover:bg-error/20
      active:bg-error/30
    `,
  };
  
  const sizes = {
    sm: 'h-7 px-3 text-sm gap-1.5',
    default: 'h-9 px-4 text-sm gap-2',
    lg: 'h-11 px-6 text-base gap-2.5',
    icon: 'w-9 h-9 p-0',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    default: 'w-4 h-4',
    lg: 'w-5 h-5',
    icon: 'w-4 h-4',
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="spinner w-4 h-4" />
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
