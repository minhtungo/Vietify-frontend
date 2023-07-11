import { FC } from 'react';
import { PAYMENTS } from '@static/payment,';
import Image from 'next/image';
import cn from '@lib/util/cn';

interface PaymentOPtionsProps {
  className?: string;
}

const PaymentOptions: FC<PaymentOPtionsProps> = ({ className }) => {
  return (
    <ul className={cn('flex flex-wrap items-center gap-4', className)}>
      {PAYMENTS.map((item) => (
        <li key={`payment-${item.id}`}>
          <Image
            src={item.image}
            alt={item.name}
            height={item.height}
            width={item.width}
            className="h-full w-12"
          />
        </li>
      ))}
    </ul>
  );
};

export default PaymentOptions;
