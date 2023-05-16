import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const headingVariants = cva('text-foreground', {
  variants: {
    variant: {
      heading: 'text-xl md:text-2xl lg:text-3xl',
      title: 'text-base xl:text-lg xl:leading-7',
      medium: 'font-semibold text-xl',
      small: 'text-base font-medium',
      large: 'text-xl md:text-2xl lg:text-3xl xl:leading-7',
    },
    weight: {
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'title',
    weight: 'semibold',
  },
});

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: string;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, weight, as, children, ...props }, ref) => {
    if (as === 'h1') {
      return (
        <h1
          ref={ref}
          {...props}
          className={cn(headingVariants({ variant, weight, className }))}
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
          className={cn(headingVariants({ variant, weight, className }))}
        >
          {children}
        </h2>
      );
    }
    return (
      <h3
        ref={ref}
        {...props}
        className={cn(headingVariants({ variant, weight, className }))}
      >
        {children}
      </h3>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
