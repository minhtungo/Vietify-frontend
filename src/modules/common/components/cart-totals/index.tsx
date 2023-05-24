import { Cart } from '@medusajs/medusa';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { formatAmount } from 'medusa-react';
import React from 'react';

type CartTotalsProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = cart;

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    });
  };

  return (
    <div className="text-small-regular flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <Text variant="dark" size="md" span>
          Tạm tính
        </Text>
        <Text variant="dark" size="md" span>
          {getAmount(subtotal)}
        </Text>
      </div>
      <div className="flex items-center justify-between">
        <Text variant="dark" size="md" span>
          Thuế
        </Text>
        <Text variant="dark" size="md" span>
          {getAmount(tax_total)}
        </Text>
      </div>

      {!!discount_total && (
        <div className="flex items-center justify-between">
          <Text size="md" variant="dark" span>
            Giảm giá
          </Text>
          <Text size="md" variant="dark" span>
            - {getAmount(discount_total)}
          </Text>
        </div>
      )}
      {!!gift_card_total && (
        <div className="flex items-center justify-between">
          <Text size="md" span>
            Gift card
          </Text>
          <Text size="md" variant="dark" span>
            - {getAmount(gift_card_total)}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between">
        <Text size="md" variant="dark" span>
          Shipping
        </Text>
        <Text size="md" variant="dark" span>
          {getAmount(shipping_total)}
        </Text>
      </div>
      <Separator className="my-1" />
      <div className="flex items-center justify-between">
        <Text size="md" variant="dark" span className="font-semibold">
          Tổng số tiền
        </Text>
        <Text size="md" variant="dark" span className="font-semibold">
          {getAmount(total)}
        </Text>
      </div>
    </div>
  );
};

export default CartTotals;
