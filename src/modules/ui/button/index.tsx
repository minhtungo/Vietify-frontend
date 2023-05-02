import cn from '@lib/util/cn';
import Spinner from '@icons/spinner';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none    disabled:opacity-50 disabled:pointer-events-none items-center transition duration-300',
  {
    variants: {
      variant: {
        primary: 'bg-brand/90 text-white hover:bg-brand',
        secondary:
          'bg-brand-light text-brand-dark hover:text-brand-light hover:bg-brand',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant, size, isLoading = false, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;

export { buttonVariants };
