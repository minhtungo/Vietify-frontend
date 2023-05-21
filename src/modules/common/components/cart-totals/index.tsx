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
    <div className="text-small-regular flex flex-col gap-y-2 text-foreground">
      <div className="flex items-center justify-between">
        <Text size="sm" span>
          Subtotal
        </Text>
        <span>{getAmount(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <Text size="sm" span>
          Taxes
        </Text>
        <span>{getAmount(tax_total)}</span>
      </div>
      <div className="flex flex-col gap-y-2">
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <Text size="sm" span>
              Discount
            </Text>
            <span>- {getAmount(discount_total)}</span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <Text size="sm" span>
              Gift card
            </Text>
            <span>- {getAmount(gift_card_total)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Text size="sm" span>
            Shipping
          </Text>
          <span>{getAmount(shipping_total)}</span>
        </div>
      </div>
      <Separator className="my-1" />
      <div className="mb-1 flex items-center justify-between">
        <Text size="sm" span>
          Total
        </Text>
        <Text size="sm" span>
          {getAmount(total)}
        </Text>
      </div>
    </div>
  );
};

export default CartTotals;
