import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';

import Thumbnail from '@modules/products/components/thumbnail';
import { Product } from 'types/medusa';
import { toast, type Toast } from 'react-hot-toast';
import XMarkIcon from '@modules/common/icons/x';
import { Separator } from '@modules/ui/separator';
import Button from '@modules/ui/button';

interface cartItemProps {
  item: Product;
  price: string | undefined;
  quantity: number;
  className?: string;
  t: Toast;
}

const AddedItem: React.FC<cartItemProps> = ({
  item,
  price,
  className,
  quantity,
  t,
}) => {
  return (
    <div className="!m-0">
      <div className="flex items-center justify-between border-b border-border">
        <Heading variant="small" className="text-sm">
          Added to cart!
        </Heading>
        <Button
          onClick={() => {
            toast.dismiss(t.id);
          }}
          variant="fade"
          className="p-0 text-foreground"
        >
          <XMarkIcon size={18} />
        </Button>
      </div>

      <div className={cn('flex gap-x-2 pt-3', className)}>
        <div className="w-[55px]">
          <Thumbnail thumbnail={item.thumbnail} size="full" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <Heading
              variant="small"
              className="w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
            >
              {item.title}
            </Heading>

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
