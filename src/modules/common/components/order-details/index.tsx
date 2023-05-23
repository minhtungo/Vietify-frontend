import { type Cart } from '@medusajs/medusa';
import { FC } from 'react';

import CartItem from '@modules/common/components/cart-item';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { useCart } from 'medusa-react';

interface OrderDetailsProps {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}

const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  const { cart, totalItems } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi Tiết Đơn Hàng</CardTitle>
        <CardDescription>
          Bạn có {totalItems} sản phẩm trong giỏ hàng.
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
