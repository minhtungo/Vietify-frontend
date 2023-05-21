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
        'flex h-9 items-center gap-1 rounded bg-accent px-2',
        className
      )}
    >
      <button
        onClick={onDecrement}
        className="scale-80 flex h-6 w-6 shrink-0 transform items-center justify-center rounded-full text-foreground transition-all duration-300 ease-in-out hover:bg-gray-300/60 lg:scale-100"
      >
        <span className="sr-only">Minus Button</span>
        <MinusIcon width={20} height={20} />
      </button>
      <Text size="md" variant="dark" className="px-1">
        {value}
      </Text>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className="scale-80 flex h-6 w-6 shrink-0 transform items-center justify-center rounded-full text-foreground transition-all duration-300 ease-in-out hover:bg-gray-300/60 lg:scale-100"
        title={disabled ? 'Out of Stock' : ''}
      >
        <span className="sr-only">Plus button</span>
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
};

export default Counter;
