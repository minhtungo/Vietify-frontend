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
        'relative flex h-10 rounded-md border border-border bg-transparent',
        className
      )}
    >
      <button
        onClick={onDecrement}
        className="h-full rounded-l-md px-2 outline-none transition duration-200 ease-in-out hover:bg-accent"
      >
        <span className="sr-only">Minus Button</span>
        <MinusIcon className="m-auto h-5 w-5" />
      </button>
      <Text
        size="md"
        variant="dark"
        className="flex w-12 items-center justify-center border-x border-border font-semibold"
      >
        {value}
      </Text>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className="h-full rounded-r-md px-2 outline-none transition duration-200 ease-in-out hover:bg-accent"
        title={disabled ? 'Out of Stock' : ''}
      >
        <span className="sr-only">Plus button</span>
        <PlusIcon className="m-auto h-5 w-5" />
      </button>
    </div>
  );
};

export default Counter;
