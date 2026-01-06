import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function Dropdown({ 
  trigger, 
  children, 
  align = 'right',
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`
            absolute z-50 mt-2 min-w-[180px]
            bg-bg-secondary dark:bg-bg-secondary/95 backdrop-blur-sm dark:backdrop-blur-md border border-border rounded-lg shadow-lg
            animate-scale-in origin-top-right
            ${alignClasses[align]}
            ${className}
          `}>
            <div className="p-1">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function DropdownItem({ 
  children, 
  icon: Icon, 
  danger = false,
  onClick,
  className = '' 
}) {
  const baseClasses = `
    flex items-center gap-2.5 w-full px-3 py-2 text-sm
    rounded-md transition-colors duration-100 cursor-pointer
  `;

  const colorClasses = danger 
    ? 'text-error-text hover:bg-error-subtle' 
    : 'text-text-primary hover:bg-surface';

  return (
    <button
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4 text-text-tertiary" />}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="h-px bg-border my-1" />;
}

export default Dropdown;

