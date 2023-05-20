import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const headingVariants = cva('text-foreground font-semibold', {
  variants: {
    variant: {
      sm: 'text-sm md:text-base font-medium',
      md: 'text-lg sm:text-xl md:text-2xl',
      lg: 'text-xl md:text-2xl lg:text-3xl xl:leading-7',
      default: 'text-base lg:text-lg xl:leading-7',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: string;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    if (as === 'h1') {
      return (
        <h1
          ref={ref}
          {...props}
          className={cn(headingVariants({ variant, className }))}
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
          className={cn(headingVariants({ variant, className }))}
        >
          {children}
        </h2>
      );
    }
    return (
      <h3
        ref={ref}
        {...props}
        className={cn(headingVariants({ variant, className }))}
      >
        {children}
      </h3>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
