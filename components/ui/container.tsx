import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'mx-auto px-6',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-container',
        full: 'max-w-none'
      }
    },
    defaultVariants: {
      size: 'lg'
    }
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        className={containerVariants({ size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container, containerVariants };
