import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-teal-600 text-white hover:bg-teal-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50'
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5',
    lg: 'text-lg px-8 py-3'
  };

  const iconSpacing = 'mr-2';
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const iconElement = icon && (
    <span className={`${iconPosition === 'left' ? iconSpacing : 'ml-2'} ${iconSizes[size]}`}>
      {icon}
    </span>
  );

  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </>
  );

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <Link 
      href={href} 
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {content}
    </Link>
  );
}
