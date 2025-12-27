import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

const Card = forwardRef(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-bg-secondary border border-border rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
