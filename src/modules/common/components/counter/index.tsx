import cn from '@lib/util/cn';
import MinusIcon from '@icons/minus';
import PlusIcon from '@icons/plus';
import { cva, VariantProps } from 'class-variance-authority';
import { CounterProps } from 'types/global';

const counterVariants = cva('flex items-center rounded p-1 px-3 gap-2', {
  variants: {
    variant: {
      single: 'h-10 bg-accent',
    },
  },
  defaultVariants: {
    variant: 'single',
  },
});

export interface counterProps
  extends CounterProps,
    VariantProps<typeof counterVariants> {}

const Counter: React.FC<counterProps> = ({
  value,
  onDecrement,
  onIncrement,
  className,
  variant,
  disabled,
}) => {
  return (
    <div className={cn(counterVariants({ variant, className }))}>
      <button
        onClick={onDecrement}
        className={cn(
          'flex h-full shrink-0 items-center justify-center transition-all duration-300 ease-in-out ',
          'scale-80 h-6 w-6 transform rounded-full text-brand-muted hover:bg-brand-muted/10 lg:scale-100'
        )}
      >
        <span className="sr-only">Minus Button</span>
        <MinusIcon width={20} height={20} />
      </button>
      <span
        className={cn(
          'duration-250 shrink-0 cursor-default font-semibold text-brand-dark transition-colors ease-in-out',
          'w-5 text-center text-base md:text-[17px]'
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'flex h-full shrink-0 items-center justify-center transition-all duration-300 ease-in-out',
          'scale-80 h-6 w-6 rounded-full text-brand-muted hover:bg-brand-muted/10 lg:scale-100'
        )}
        title={disabled ? 'Out of Stock' : ''}
      >
        <span className="sr-only">Plus button</span>
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
};

export default Counter;
