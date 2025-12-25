const Badge = ({ 
  children, 
  variant = 'neutral', 
  size = 'default',
  icon: Icon,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full';
  
  const variants = {
    primary: 'bg-primary-subtle text-primary-light',
    success: 'bg-success-subtle text-success-text',
    warning: 'bg-warning-subtle text-warning-text',
    error: 'bg-error-subtle text-error-text',
    neutral: 'bg-surface text-text-secondary',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    default: 'px-2 py-0.5 text-xs',
    lg: 'px-2.5 py-1 text-sm',
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    default: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className={iconSizes[size]} />}
      {children}
    </span>
  );
};

export default Badge;

