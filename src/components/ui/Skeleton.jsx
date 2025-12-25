const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div 
      className={`
        bg-surface animate-pulse
        ${variants[variant]}
        ${className}
      `}
    />
  );
};

export default Skeleton;

