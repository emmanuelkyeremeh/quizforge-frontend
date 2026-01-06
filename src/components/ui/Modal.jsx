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
  // Lock body scroll when modal is open and add class for styling
  useEffect(() => {
    const header = document.querySelector('header.header-with-modal');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      if (header) {
        header.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      if (header) {
        header.style.display = '';
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      if (header) {
        header.style.display = '';
      }
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
    <>
      {/* Backdrop - fixed to cover entire screen */}
      <div 
        className="fixed inset-0 z-[100] bg-black/60 dark:bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
        {/* Modal content */}
        <div 
          className={`
            relative w-full ${sizes[size]} my-auto pointer-events-auto
            bg-white dark:bg-bg-tertiary border border-border rounded-xl shadow-xl
            animate-scale-in max-h-[90vh] flex flex-col overflow-hidden
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
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

