import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';

import Thumbnail from '@modules/products/components/thumbnail';

interface CartItemProps {
  className?: string;
  thumbnail?: string | null;
  title: string;
  price: string | undefined;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  className,
  thumbnail,
  title,
  price,
  quantity,
}) => {
  return (
    <div className={cn('flex w-full gap-x-2', className)}>
      <div className="w-[55px]">
        <Thumbnail thumbnail={thumbnail} size="full" />
      </div>
      <div className="flex justify-between">
        <div>
          <Heading
            variant="small"
            className="w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
          >
            {title}
          </Heading>
          <Text variant="info" className="text-xs">
            Qty: {quantity}
          </Text>
        </div>

        <div className="flex justify-end">
          <Text variant="label" as="span" className="text-sm">
            {price}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
