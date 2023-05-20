import cn from '@lib/util/cn';
import Heading from '@ui/heading';

import { type LineItem } from '@medusajs/medusa';
import CartItem from '@modules/common/components/cart-item';
import XMarkIcon from '@modules/common/icons/x';
import Button from '@modules/ui/button';
import { useCart } from 'medusa-react';
import { toast, type Toast } from 'react-hot-toast';

interface cartItemProps {
  item: LineItem;
  className?: string;
  t: Toast;
}

const AddedItem: React.FC<cartItemProps> = ({ item, className, t }) => {
  const { cart } = useCart();

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between border-b border-border">
        <Heading variant="sm" className="text-sm">
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
      <CartItem item={item} region={cart!.region} />
    </div>
  );
};

export default AddedItem;
