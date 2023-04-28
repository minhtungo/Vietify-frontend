import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';

import Thumbnail from '@modules/products/components/thumbnail';
import { Product } from 'types/medusa';

interface cartItemProps {
  item: Product;
  price: string | undefined;
  quantity: number;
  className?: string;
}

const AddedItem: React.FC<cartItemProps> = ({
  item,
  price,
  className,
  quantity,
}) => {
  return (
    <div className="flex flex-col p-1">
      <Heading variant="titleSmall" className="pb-2 text-sm">
        Added to cart!
      </Heading>
      <div className={cn('flex gap-x-2 border-t pt-2', className)}>
        <div className="w-[55px]">
          <Thumbnail thumbnail={item.thumbnail} size="full" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <Heading
                variant="titleSmall"
                className="w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
              >
                {item.title}
              </Heading>
            </div>
            <div className="flex justify-end">
              <Text variant="label" as="span" className="text-sm">
                {price}
              </Text>
            </div>
          </div>
          <Text variant="info" className="text-xs">
            Qty: {quantity}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AddedItem;
