import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const headingVariants = cva('text-foreground font-semibold', {
  variants: {
    variant: {
      default: 'text-foreground',
      light: 'text-primary-foreground',
      brand: 'text-primary',
    },
    size: {
      sm: 'text-sm md:text-base font-medium',
      md: 'text-lg sm:text-xl md:text-2xl',
      lg: 'text-xl md:text-2xl lg:text-3xl xl:leading-7',
      xl: 'text-3xl md:text-4xl xl:text-5xl',
      default: 'text-base lg:text-lg xl:leading-7',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: string;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, size, as, children, ...props }, ref) => {
    if (as === 'h1') {
      return (
        <h1
          ref={ref}
          {...props}
          className={cn(headingVariants({ variant, size, className }))}
        >
          {children}
        </h1>
      );
    }
    if (as === 'h2') {
      return (
        <h2
          ref={ref}
          {...props}
          className={cn(headingVariants({ variant, size, className }))}
        >
          {children}
        </h2>
      );
    }
    return (
      <h3
        ref={ref}
        {...props}
        className={cn(headingVariants({ variant, size, className }))}
      >
        {children}
      </h3>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
