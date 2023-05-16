import { FC } from 'react';
import { type LineItem, type Cart } from '@medusajs/medusa';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { useCart } from 'medusa-react';
import CartItem from '@modules/common/components/cart-item';

interface OrderDetailsProps {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}

const getTotalItems = (cartItems: LineItem[]) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  const { cart } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>
          You have {getTotalItems(cart!.items)} items in your cart.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {cart?.items.map((item) => (
          <CartItem key={item.id} item={item} region={cart.region} />
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
