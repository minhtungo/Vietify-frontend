import { type Cart } from '@medusajs/medusa';
import { FC } from 'react';

import CartItem from '@modules/common/components/cart-item';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';
import { useCart } from 'medusa-react';
import Text from '@modules/ui/text';
import CartIcon from '@modules/common/icons/cart';

interface OrderAccordionProps {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}

const OrderAccordion: FC<OrderAccordionProps> = () => {
  const { cart } = useCart();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="order-summary" className="border-none">
        <AccordionTrigger className="py-0">
          <div className="flex items-center gap-2">
            <CartIcon className="h-5 w-5" />
            <Text size="md" variant="dark" span>
              Tóm tắt đơn hàng
            </Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2  pt-2.5">
            {cart?.items.map((item) => (
              <CartItem key={item.id} item={item} region={cart.region} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderAccordion;
