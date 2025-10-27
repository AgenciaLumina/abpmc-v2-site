interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleSize?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
}

export default function Card({
  children,
  className = '',
  title,
  titleSize = 'md',
  padding = 'md',
  shadow = 'md',
  border = true
}: CardProps) {
  const titleSizes = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  const paddings = {
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div 
      className={`bg-white rounded-[10px] ${
        border ? 'border border-gray-200' : 'border-0'
      } ${shadows[shadow]} ${paddings[padding]} ${className}`}
    >
      {title && (
        <h3 
          className={`font-semibold text-gray-900 mb-4 ${titleSizes[titleSize]}`}
        >
          {title}
        </h3>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}
