import { Label } from '@modules/ui/label';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from '@stripe/stripe-js';
import React, { useMemo } from 'react';

const PaymentStripe: React.FC = () => {
  const useOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: 'var(--font-inter), sans-serif',
          color: '#424270',
          padding: '10px 12px',
          '::placeholder': {
            color: '#CFD7E0',
          },
        },
      },
    };
  }, []);

  return (
    <div>
      <div className="relative flex w-full flex-col text-left">
        <CardNumber options={useOptions as StripeCardNumberElementOptions} />
        <div className="relative mt-3 grid grid-cols-2 gap-x-3">
          <CardExpiry options={useOptions as StripeCardExpiryElementOptions} />
          <CardCVC options={useOptions as StripeCardCvcElementOptions} />
        </div>
      </div>
    </div>
  );
};

const CardNumber = ({
  options,
}: {
  options: StripeCardNumberElementOptions;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Card number</Label>
      <div className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
        <CardNumberElement options={options} />
      </div>
    </div>
  );
};

const CardExpiry = ({
  options,
}: {
  options: StripeCardExpiryElementOptions;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Expiration date</Label>
      <div className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
        <CardExpiryElement options={options} />
      </div>
    </div>
  );
};

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>CVC</Label>
      <div className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background">
        <CardCvcElement options={{ ...options, placeholder: '123' }} />
      </div>
    </div>
  );
};

export default PaymentStripe;
