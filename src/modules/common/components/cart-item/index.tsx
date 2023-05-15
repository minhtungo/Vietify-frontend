import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';
import React from 'react';

import Thumbnail from '@modules/products/components/thumbnail';
import { type LineItem, type Region } from '@medusajs/medusa';
import { formatAmount } from 'medusa-react';
import XMarkIcon from '@modules/common/icons/x';
import _ from 'lodash';

interface CartItemProps {
  className?: string;
  item: LineItem;
  region: Region;
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ className, item, region }) => {
    const { thumbnail, title, quantity, unit_price } = item;

    const getAmount = (amount) => {
      if (typeof unit_price === 'string') {
        console.log(parseFloat(unit_price));
        return amount;
      }
      return formatAmount({
        amount: amount,
        region: region,
        includeTaxes: false,
      });
    };

    return (
      <div className={cn('flex gap-x-2 pt-3', className)}>
        <div className="w-[55px]">
          <Thumbnail thumbnail={thumbnail} size="full" />
        </div>
        <div>
          <Heading
            variant="small"
            className="w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
          >
            {title}
          </Heading>
          <Text variant="info" className="flex items-center text-xs">
            {quantity}
            <XMarkIcon />
            {getAmount(unit_price)}
          </Text>
        </div>
        <Text variant="label" as="span" className="text-sm">
          {getAmount(unit_price * quantity)}
        </Text>
      </div>
    );
  }
);

CartItem.displayName = 'Cart Item';

export default CartItem;
