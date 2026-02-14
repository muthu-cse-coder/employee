import './Card.css';

function Card({ 
  children, 
  title, 
  subtitle,
  icon,
  action,
  className = '',
  variant = 'default', // default, glass, gradient
  hoverable = true,
  ...props 
}) {
  return (
    <div 
      className={`card-component ${variant} ${hoverable ? 'hoverable' : ''} ${className}`}
      {...props}
    >
      {(title || icon || action) && (
        <div className="card-header">
          <div className="card-header-left">
            {icon && <div className="card-icon">{icon}</div>}
            <div>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;