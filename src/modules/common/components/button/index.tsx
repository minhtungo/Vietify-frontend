import cn from '@lib/util/cn';
import Spinner from '@modules/common/icons/spinner';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-semibold transition-colors focus:outline-none    disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 items-center transition duration-300',
  {
    variants: {
      variant: {
        secondary:
          'bg-brand-light text-brand-dark hover:text-brand-light hover:bg-brand',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-2',
        lg: 'h-11 px-6',
      },
      rounded: {
        default: 'rounded',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'default',
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

export { Button, buttonVariants };
