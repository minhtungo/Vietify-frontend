import MinusIcon from '@icons/minus';
import PlusIcon from '@icons/plus';
import cn from '@lib/util/cn';
import Text from '@modules/ui/text';
import { CounterProps } from 'types/global';

const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'relative flex h-8 rounded-md border border-border bg-transparent',
        className
      )}
    >
      <button
        onClick={onDecrement}
        className="h-full rounded-l-md px-2 outline-none transition duration-200 ease-in-out hover:bg-accent"
      >
        <span className="sr-only">Minus Button</span>
        <MinusIcon className="m-auto h-4 w-4" />
      </button>
      <Text
        size="sm"
        variant="dark"
        className="flex w-10 items-center justify-center border-x border-border font-medium"
      >
        {value}
      </Text>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className="h-full rounded-r-md px-2 outline-none transition duration-200 ease-in-out hover:bg-accent"
        title={disabled ? 'Hết hàng' : ''}
      >
        <span className="sr-only">Plus button</span>
        <PlusIcon className="m-auto h-4 w-4" />
      </button>
    </div>
  );
};

export default Counter;
