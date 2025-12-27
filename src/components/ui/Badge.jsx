import { cn } from '../../lib/utils.js';

const Badge = ({ 
  children, 
  variant = 'secondary', 
  className = '' 
}) => {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-bg-secondary text-text-secondary border border-border',
    outline: 'bg-transparent text-text-secondary border border-border',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;

