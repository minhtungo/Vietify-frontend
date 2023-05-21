import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const textVariants = cva('', {
  variants: {
    variant: {
      default: '!text-muted-foreground',
      dark: '!text-foreground',
      light: '!text-primary-foreground',
      brand: '!text-primary',
      error: '!text-destructive-foreground',
      link: 'transition-colors duration-200 hover:text-primary',
    },
    size: {
      default: 'text-base-regular md:text-large-regular',
      xs: 'text-xsmall-regular',
      sm: 'text-small-regular',
      md: 'text-sm lg:!text-[15px]',
      lg: 'text-base leading-7 md:text-[17px] md:leading-8 xl:px-16 xl:text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  span?: boolean;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, children, span = false, ...props }, ref) => {
    if (span) {
      return (
        <span
          className={cn(textVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <p
        className={cn(textVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export default Text;
