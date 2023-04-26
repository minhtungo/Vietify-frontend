import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import Text from '@modules/common/components/text';

import Thumbnail from '@modules/products/components/thumbnail';
import { Product } from 'types/medusa';

interface cartItemProps {
  item: Product;
  price: string;
  className?: string;
}

const AddedItem: React.FC<cartItemProps> = ({ item, price, className }) => {
  return (
    <div className={cn('flex gap-x-4 pt-3', className)} key={item.id}>
      <div className="w-[85px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <Heading
              variant="titleSmall"
              className="w-[195px] overflow-hidden overflow-ellipsis whitespace-nowrap"
            >
              {item.title}
            </Heading>

            {/* <LineItemOptions variant={item} /> */}
          </div>
          <div className="flex justify-end">
            <Text variant="label" as="span">
              {price}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedItem;
