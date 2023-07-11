import CartTotals from '@common/cart-totals';
import { type Cart } from '@medusajs/medusa';
import PaymentButton from '@modules/checkout/components/payment-button';
import { buttonVariants } from '@ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import cn from '@lib/util/cn';
import Text from '@modules/ui/text';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { useRouter } from 'next/router';
import PaymentOptions from '../payment-options';

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
        <CardTitle>Chi tiết đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <CartTotals cart={cart} />
      </CardContent>
      <CardFooter className="grid">
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
            Thanh Toán
          </Link>
        )}
        {pathname === '/cart' && (
          <div className="mt-6 hidden md:block">
            <Text variant="dark" size="lg" className="mb-2 font-semibold">
              Phương thức thanh toán
            </Text>
            <PaymentOptions />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
