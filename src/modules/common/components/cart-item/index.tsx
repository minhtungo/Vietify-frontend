import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';
import React from 'react';

import { type LineItem, type Region } from '@medusajs/medusa';
import XMarkIcon from '@modules/common/icons/x';
import Thumbnail from '@modules/products/components/thumbnail';
import { formatAmount } from 'medusa-react';

interface CartItemProps {
  className?: string;
  item: LineItem;
  region: Region;
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ className, item, region }) => {
    const { thumbnail, title, quantity, unit_price, variant } = item;
    const getAmount = (amount: number | string) => {
      if (typeof unit_price === 'string') {
        return amount;
      }
      return formatAmount({
        amount,
        region,
        includeTaxes: false,
      });
    };

    return (
      <div className={cn('flex justify-between', className)}>
        <div className="flex gap-x-2">
          <div className="w-[55px]">
            <Thumbnail
              thumbnail={thumbnail}
              size="full"
              alt={`${title} thumbnail`}
            />
          </div>
          <div>
            <Heading
              size="sm"
              className="w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm md:text-[15px]"
            >
              {title}
            </Heading>
            <Text size="sm" className="flex items-center" variant="dark">
              <XMarkIcon className="text-foreground" />
              {quantity}
            </Text>
          </div>
        </div>
        <Text size="sm" span variant="dark">
          {getAmount(unit_price * quantity)}
        </Text>
      </div>
    );
  }
);

CartItem.displayName = 'Cart Item';

export default CartItem;
