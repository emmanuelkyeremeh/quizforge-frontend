import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hoverable = false,
  interactive = false,
  glow = false,
  ...props 
}, ref) => {
  const baseClasses = 'bg-bg-secondary border border-border rounded-lg transition-all duration-150 ease-out';
  
  const variants = {
    default: '',
    elevated: 'bg-bg-elevated shadow-md',
    ghost: 'bg-transparent border-transparent',
  };

  const hoverClasses = hoverable ? 'hover:border-border-hover hover:bg-bg-tertiary' : '';
  const interactiveClasses = interactive ? 'cursor-pointer active:scale-[0.99]' : '';
  const glowClasses = glow ? 'relative overflow-hidden' : '';

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${interactiveClasses} ${glowClasses} ${className}`}
      {...props}
    >
      {glow && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94, 106, 210, 0.06), transparent 40%)'
          }}
        />
      )}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
