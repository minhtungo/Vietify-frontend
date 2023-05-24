import LineItemOptions from '@common/line-item-options';
import LineItemPrice from '@common/line-item-price';
import Trash from '@icons/trash';
import { useStore } from '@lib/context/store-context';
import { LineItem, Region } from '@medusajs/medusa';
import Counter from '@modules/common/components/counter';
import Thumbnail from '@modules/products/components/thumbnail';
import Button from '@modules/ui/button';
import Heading from '@ui/heading';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();

  const decreaseQuantity = () => {
    if (item.quantity === 1) return;
    updateItem({
      lineId: item.id,
      quantity: item.quantity - 1,
    });
  };
  const increaseQuantity = () => {
    updateItem({
      lineId: item.id,
      quantity: item.quantity + 1,
    });
  };

  return (
    <div className="grid grid-cols-[100px_1fr] gap-x-6">
      <Thumbnail
        thumbnail={item.thumbnail}
        size="full"
        alt={`Product thumbnail ${item.id}`}
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <Heading>{item.title}</Heading>
            <LineItemPrice item={item} region={region} />
          </div>
          <LineItemOptions variant={item.variant} className="mt-[2px]" />
        </div>
        <div className="flex items-center justify-between">
          <Counter
            value={item.quantity}
            className=""
            onIncrement={increaseQuantity}
            onDecrement={decreaseQuantity}
            disabled={item.variant.inventory_quantity <= item.quantity}
          />
          {/* <Select
            onValueChange={(value) =>
              updateItem({
                lineId: item.id,
                quantity: parseInt(value),
              })
            }
          >
            <SelectTrigger className="w-[60px]">
              <SelectValue>{item.quantity || 'Sort'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1;
                  return (
                    <SelectItem value={value} key={i}>
                      {value}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select> */}
          <Button onClick={() => deleteItem(item.id)} variant="fade">
            <Trash size={21} className="text-muted-foreground/80" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
