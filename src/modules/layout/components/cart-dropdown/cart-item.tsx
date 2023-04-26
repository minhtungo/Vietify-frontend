import { useStore } from '@lib/context/store-context';
import { Cart, LineItem } from '@medusajs/medusa';
import LineItemOptions from '@modules/common/components/line-item-options';
import LineItemPrice from '@modules/common/components/line-item-price';
import Trash from '@modules/common/icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import Link from 'next/link';

interface cartItemProps {
  item: Omit<LineItem, 'beforeInsert'>;
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
}

const CartItem: React.FC<cartItemProps> = ({ item, cart }) => {
  const { deleteItem } = useStore();

  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
      <div className="w-[122px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                <Link href={`/products/${item.variant.product.handle}`}>
                  {item.title}
                </Link>
              </h3>
              <LineItemOptions variant={item.variant} />
              <span>Quantity: {item.quantity}</span>
            </div>
            <div className="flex justify-end">
              <LineItemPrice region={cart.region} item={item} style="tight" />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between text-small-regular flex-1">
          <div>
            <button
              className="flex items-center gap-x-1 text-gray-500"
              onClick={() => deleteItem(item.id)}
            >
              <Trash size={14} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
