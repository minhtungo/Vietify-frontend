import CartTotals from '@common/cart-totals';
import { type Cart } from '@medusajs/medusa';
import PaymentButton from '@modules/checkout/components/payment-button';
import Button, { buttonVariants } from '@ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import cn from '@lib/util/cn';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { useRouter } from 'next/router';

interface OrderSummaryProps {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const { pathname } = useRouter();
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    setIsCheckout(pathname === '/checkout' ? true : false);
  }, [pathname]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <CartTotals cart={cart} />
      </CardContent>
      <CardFooter>
        {isCheckout ? (
          <PaymentButton
            paymentSession={cart?.payment_session}
            className="w-full"
          />
        ) : (
          <Link
            href="/checkout"
            className={cn(
              buttonVariants({
                variant: 'primary',
                className: 'w-full',
              })
            )}
          >
            Go to checkout
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
