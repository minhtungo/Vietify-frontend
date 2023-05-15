import cn from '@lib/util/cn';

const Radio = ({ checked }: { checked: boolean }) => {
  return (
    <div
      className={cn(
        'flex h-3 w-3 items-center justify-center rounded-full border border-gray-200',
        checked && 'border-gray-900'
      )}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-gray-900" />}
    </div>
  );
};

export default Radio;
