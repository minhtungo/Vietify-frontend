import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const headingVariants = cva('capitalize', {
  variants: {
    variant: {
      heading: 'text-2xl md:text-3xl lg:text-4xl',
      title: 'text-base xl:text-lg xl:leading-7 text-brand-dark',
      titleMedium: 'font-semibold text-brand-dark text-xl',
      titleSmall: 'text-base font-medium',
      titleLarge:
        'text-xl md:text-2xl lg:text-3xl xl:leading-7 text-brand-dark',
    },
    size: {
      default: 'text-xl md:text-xl lg:text-2xl',
      sm: 'text-[15px] md:text-base',
      md: 'text-lg',
      lg: 'text-2xl md:text-3xl lg:text-4xl',
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
  ({ className, size, variant, weight, as, children, ...props }, ref) => {
    if (as === 'h1') {
      return (
        <h1
          ref={ref}
          {...props}
          className={cn(headingVariants({ size, variant, weight, className }))}
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
          className={cn(headingVariants({ size, variant, weight, className }))}
        >
          {children}
        </h2>
      );
    }
    return (
      <h3
        ref={ref}
        {...props}
        className={cn(headingVariants({ size, variant, weight, className }))}
      >
        {children}
      </h3>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
