import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';

import Thumbnail from '@modules/products/components/thumbnail';
import { Product } from 'types/medusa';
import { toast, type Toast } from 'react-hot-toast';
import XMarkIcon from '@modules/common/icons/x';
import Button from '@modules/ui/button';
import CartItem from '@modules/common/components/cart-item';

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
    <div className={cn(className)}>
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
      <CartItem
        thumbnail={item.thumbnail}
        title={item.title}
        price={price}
        quantity={quantity}
      />
    </div>
  );
};

export default AddedItem;
