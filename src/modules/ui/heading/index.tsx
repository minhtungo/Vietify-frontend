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
      sm: 'text-sm md:text-base',
      md: 'text-md sm:text-lg md:text-xl',
      lg: 'text-lg md:text-xl lg:text-2xl xl:leading-7',
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
  ({ className, variant, size, as = 'h3', children, ...props }, ref) => {
    const headingComponents: any = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
    };

    const HeadingComponent = headingComponents[as] || 'h3';

    return (
      <HeadingComponent
        ref={ref}
        {...props}
        className={cn(headingVariants({ variant, size, className }))}
      >
        {children}
      </HeadingComponent>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
