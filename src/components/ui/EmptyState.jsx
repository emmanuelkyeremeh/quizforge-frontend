import Button from './Button.jsx';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-text-tertiary" />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-text-primary mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button 
          onClick={action.onClick}
          icon={action.icon}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

