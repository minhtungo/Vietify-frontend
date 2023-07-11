import cn from '@lib/util/cn';
import { PaymentSession } from '@medusajs/medusa';
import React from 'react';
import PaymentStripe from '../payment-stripe';
import PaymentTest from '../payment-test';
import { Card, CardContent } from '@modules/ui/card';
import Heading from '@modules/ui/heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import Delivery from '@modules/common/icons/delivery';
import Text from '@modules/ui/text';

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
    <button onClick={setSelected} disabled={disabled}>
      <Card
        className={cn('hover:border-primary/40', selected && 'border-primary')}
      >
        <CardContent className="flex flex-col items-start gap-1 px-6 py-4">
          <div className="flex w-full items-start justify-between">
            <Heading size="sm">
              {PaymentInfoMap[paymentSession.provider_id].title}
            </Heading>
            <Delivery className="h-6 w-6 text-secondary-foreground" />
          </div>
          <Text variant="dark" size="sm">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </Text>
          {selected && (
            <div className="w-full">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          )}
        </CardContent>
      </Card>
    </button>
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
        <div className="pt-2">
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
