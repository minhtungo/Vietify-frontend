import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      description: 'text-base-regular text-brand-muted',
      info: 'text-small-regular text-brand-muted',
      label: 'text-[15px] text-brand-dark font-semibold',
    },
  },
  defaultVariants: {
    variant: 'description',
  },
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, children, as, ...props }, ref) => {
    if (as === 'span') {
      return (
        <span
          className={cn(textVariants({ variant, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <p
        className={cn(textVariants({ variant, className }))}
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
