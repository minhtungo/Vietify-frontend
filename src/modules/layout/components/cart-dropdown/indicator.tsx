import cn from '@lib/util/cn';
import { FC } from 'react';

interface IndicatorProps {
  totalItems: number;
  className?: string;
}

const Indicator: FC<IndicatorProps> = ({ totalItems, className }) => {
  return (
    <>
      <span
        className={cn(
          'flex h-[19px] w-[19px] items-center justify-center rounded-full bg-brand text-[11px] font-semibold leading-none text-primary-foreground',
          className
        )}
      >
        {totalItems}
      </span>
      <span className="sr-only">{`${totalItems} items in cart, view bag`}</span>
    </>
  );
};

export default Indicator;
