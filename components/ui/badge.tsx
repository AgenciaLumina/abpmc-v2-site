import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-50 text-primary-700 ring-primary-600/20',
        secondary: 'bg-secondary-500/10 text-secondary-600 ring-secondary-500/20',
        neutral: 'bg-neutral-50 text-neutral-700 ring-neutral-600/20',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        error: 'bg-red-50 text-red-700 ring-red-600/20'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={badgeVariants({ variant, className })}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
