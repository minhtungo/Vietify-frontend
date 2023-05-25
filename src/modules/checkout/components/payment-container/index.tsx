import cn from '@lib/util/cn';
import { PaymentSession } from '@medusajs/medusa';
import { Label } from '@modules/ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import React from 'react';
import PaymentStripe from '../payment-stripe';
import PaymentTest from '../payment-test';

type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selected: boolean;
  setSelected: () => void;
  disabled?: boolean;
};

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: 'Credit card',
    description: 'Secure payment with credit card',
  },
  'stripe-ideal': {
    title: 'iDEAL',
    description: 'Secure payment with iDEAL',
  },
  paypal: {
    title: 'PayPal',
    description: 'Secure payment with PayPal',
  },
  manual: {
    title: 'Test payment',
    description: 'Test payment using medusa-payment-manual',
  },
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-4 border-b border-border last:border-b-0',
        selected && 'bg-accent/50'
      )}
    >
      <RadioGroup
        defaultValue="option-one"
        className="grid grid-cols-[12px_1fr] gap-x-4 px-8 py-4"
        disabled={disabled}
        onClick={setSelected}
      >
        <RadioGroupItem value="option-one" id="option-one" />
        <div className="flex flex-col">
          <Label htmlFor="option-one" className="cursor-pointer font-semibold">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </Label>
          <span className="text-small-regular mt-2 text-gray-700">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
          {selected && (
            <div className="mt-4 w-full">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession;
}) => {
  switch (paymentSession.provider_id) {
    case 'stripe':
      return (
        <div className="pr-7 pt-8">
          <PaymentStripe />
        </div>
      );
    case 'manual':
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === 'development' ? <PaymentTest /> : null;
    default:
      return null;
  }
};

export default PaymentContainer;
