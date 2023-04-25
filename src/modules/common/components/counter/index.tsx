import cn from '@lib/util/cn';
import MinusIcon from '@modules/common/icons/minus';
import PlusIcon from '@modules/common/icons/plus';
import { cva, VariantProps } from 'class-variance-authority';
import { CounterProps } from 'types/global';

const counterVariants = cva(
  'flex items-center justify-between rounded overflow-hidden shrink-0 w-28 p-1 px-3',
  {
    variants: {
      variant: {
        single: 'h-10 bg-[#f3f5f9]',
      },
    },
    defaultVariants: {
      variant: 'single',
    },
  }
);

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
          'flex items-center justify-center shrink-0 h-full transition-all ease-in-out duration-300 ',
          'w-6 h-6 rounded-full transform scale-80 lg:scale-100 hover:bg-brand-muted/20 text-brand-muted'
        )}
      >
        <span className="sr-only">Minus Button</span>
        <MinusIcon width={20} height={20} />
      </button>
      <span
        className={cn(
          'font-semibold text-brand-dark  transition-colors duration-250 ease-in-out cursor-default shrink-0',
          'text-base md:text-[17px]'
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'flex items-center justify-center h-full shrink-0 transition-all ease-in-out duration-300',
          'w-6 h-6 rounded-full scale-80 lg:scale-100 hover:bg-brand-muted/20 text-brand-muted'
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
