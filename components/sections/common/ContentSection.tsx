interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bgColor?: 'white' | 'gray' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ContentSection({
  children,
  className = '',
  containerClassName = '',
  bgColor = 'white',
  padding = 'lg'
}: ContentSectionProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900'
  };

  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-24 md:py-32'
  };

  return (
    <section 
      className={`${bgColors[bgColor]} ${paddings[padding]} ${className}`}
    >
      <div className={`max-w-[1280px] mx-auto px-6 md:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
