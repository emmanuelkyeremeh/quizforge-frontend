import { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button.jsx';

export function Modal({ 
  isOpen, 
  onClose, 
  children,
  size = 'default',
  className = '' 
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className={`
        relative w-full ${sizes[size]} my-auto
        bg-bg-elevated border border-border rounded-xl shadow-xl
        animate-scale-in max-h-[90vh] flex flex-col overflow-hidden
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, onClose, className = '' }) {
  return (
    <div className={`flex items-center justify-between p-6 pb-0 ${className}`}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-4 -mr-2">
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}

export function ModalBody({ children, className = '' }) {
  return (
    <div className={`p-6 overflow-y-auto flex-1 min-h-0 ${className}`}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-end gap-3 p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

export default Modal;

