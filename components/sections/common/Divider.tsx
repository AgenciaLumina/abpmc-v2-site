interface DividerProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Divider({
  className = '',
  color = 'gray-200',
  size = 'md'
}: DividerProps) {
  const sizes = {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1'
  };

  return (
    <div className={`w-full ${sizes[size]} bg-${color} my-8 ${className}`} />
  );
}
