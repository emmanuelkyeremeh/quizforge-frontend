const Spinner = ({ size = 'default', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    default: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`
        ${sizes[size]}
        border-surface-active border-t-primary rounded-full
        animate-spin
        ${className}
      `}
    />
  );
};

export default Spinner;

