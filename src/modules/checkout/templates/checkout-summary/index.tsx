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
import OrderSummary from '@modules/common/components/order-summary';
import OrderDetails from '@modules/common/components/order-details';

const getTotalItems = (cartItems: LineItem[]) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const CheckoutSummary = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse gap-y-6 small:flex-col">
      <OrderSummary cart={cart} />
      <OrderDetails cart={cart} />
      <DiscountCode cart={cart} />
      <GiftCard cart={cart} />
    </div>
  );
};

export default CheckoutSummary;
