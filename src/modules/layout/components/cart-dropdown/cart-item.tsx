import { useStore } from '@lib/context/store-context';
import cn from '@lib/util/cn';
import { Cart, LineItem } from '@medusajs/medusa';
import Heading from '@ui/heading';
import LineItemOptions from '@common/line-item-options';
import LineItemPrice from '@common/line-item-price';
import Text from '@ui/text';
import Trash from '@icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import Link from 'next/link';
import Button from '@modules/ui/button';

interface cartItemProps {
  item: Omit<LineItem, 'beforeInsert'>;
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
  className?: string;
}

const CartItem: React.FC<cartItemProps> = ({ item, cart, className }) => {
  const { deleteItem } = useStore();

  return (
    <div className={cn('flex gap-x-4', className)} key={item.id}>
      <div className="w-[80px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" alt={item.title} />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/products/${item.variant.product.handle}`}>
              <Heading
                variant="sm"
                className="w-[195px] overflow-hidden overflow-ellipsis whitespace-nowrap"
              >
                {item.title}
              </Heading>
            </Link>
            <LineItemOptions variant={item.variant} />
          </div>
          <div className="flex justify-end">
            <LineItemPrice region={cart.region} item={item} style="tight" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <Text variant="info" size="sm">
            Qty: {item.quantity}
          </Text>
          <Button
            onClick={() => deleteItem(item.id)}
            variant="fade"
            className="text-muted-foreground hover:text-secondary-foreground"
          >
            <Trash size={19} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
