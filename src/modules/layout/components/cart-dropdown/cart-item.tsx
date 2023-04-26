import { useStore } from '@lib/context/store-context';
import cn from '@lib/util/cn';
import { Cart, LineItem } from '@medusajs/medusa';
import Heading from '@modules/common/components/heading';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import Text from '@modules/common/components/text';
import Trash from '@modules/common/icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import Link from 'next/link';

interface cartItemProps {
  item: Omit<LineItem, 'beforeInsert'>;
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
  className?: string;
}

const CartItem: React.FC<cartItemProps> = ({ item, cart, className }) => {
  const { deleteItem } = useStore();

  return (
    <div className={cn('flex gap-x-4', className)} key={item.id}>
      <div className="w-[85px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/products/${item.variant.product.handle}`}>
              <Heading
                variant="titleSmall"
                className="overflow-ellipsis overflow-hidden whitespace-nowrap w-[195px]"
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

        <div className="flex items-end justify-between text-small-regular flex-1">
          <Text variant="info">Qty: {item.quantity}</Text>
          <button
            className="flex items-center gap-x-1 text-brand-muted"
            onClick={() => deleteItem(item.id)}
          >
            <Trash size={14} />
            <Text variant="info">Remove</Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
