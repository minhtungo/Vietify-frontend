import CartTotals from '@common/cart-totals';
import { LineItem } from '@medusajs/medusa';
import DiscountCode from '@modules/checkout/components/discount-code';
import GiftCard from '@modules/checkout/components/gift-card';
import PaymentButton from '@modules/checkout/components/payment-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Separator } from '@modules/ui/separator';
import { useCart } from 'medusa-react';
import CartItem from '@modules/common/components/cart-item';

const getTotalItems = (cartItems: LineItem[]) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const CheckoutSummary = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  console.log(cart.items);

  return (
    <div className="sticky top-0 flex flex-col-reverse gap-y-8 small:flex-col">
      <Card>
        <CardHeader className="p-5 pb-0">
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>
            You have {getTotalItems(cart.items)} items in your cart.
          </CardDescription>
        </CardHeader>
        <Separator className="my-3" />
        <CardContent className="grid gap-4">
          {cart.items.map((item) => (
            <>
              <CartItem
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.unit_price}
                quantity={item.quantity}
              />
              <Separator className="first:hidden" />
            </>
          ))}
          <CartTotals cart={cart} />
        </CardContent>
        <CardFooter>
          <PaymentButton
            paymentSession={cart?.payment_session}
            className="w-full"
          />
        </CardFooter>
      </Card>

      <DiscountCode cart={cart} />
      <GiftCard cart={cart} />
    </div>
  );
};

export default CheckoutSummary;
