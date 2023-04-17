import cn from '@lib/util/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      description: 'text-base-regular text-brand-muted',
    },
  },
  defaultVariants: {
    variant: 'description',
  },
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, children, ...props }, ref) => {
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
