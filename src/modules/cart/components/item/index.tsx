import { useStore } from '@lib/context/store-context';
import { LineItem, Region } from '@medusajs/medusa';
import Heading from '@ui/heading';
import LineItemOptions from '@common/line-item-options';
import LineItemPrice from '@common/line-item-price';
import NativeSelect from '@common/native-select';
import Trash from '@icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';
import Button from '@modules/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();

  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px]">
        <Thumbnail
          thumbnail={item.thumbnail}
          size="full"
          alt={`Product thumbnail ${item.id}`}
        />
      </div>
      <div className="text-base-regular flex flex-col justify-between">
        <div>
          <div className="flex flex-1 items-center justify-between">
            <Heading size="sm" className="mb-1 whitespace-normal">
              {item.title}
            </Heading>
            <Button
              onClick={() => deleteItem(item.id)}
              variant="fade"
              className="text-muted-foreground hover:text-secondary-foreground"
            >
              <Trash size={22} />
            </Button>
          </div>
          <LineItemOptions variant={item.variant} />
        </div>
        <div className="text-small-regular flex items-center justify-between">
          <Select
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
          </Select>

          <LineItemPrice item={item} region={region} />
        </div>
      </div>
    </div>
  );
};

export default Item;
