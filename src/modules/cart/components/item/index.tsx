import { useStore } from '@lib/context/store-context';
import { LineItem, Region } from '@medusajs/medusa';
import Heading from '@ui/heading';
import LineItemOptions from '@common/line-item-options';
import LineItemPrice from '@common/line-item-price';
import NativeSelect from '@common/native-select';
import Text from '@ui/text';
import Trash from '@icons/trash';
import Thumbnail from '@modules/products/components/thumbnail';

type ItemProps = {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore();

  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4">
      <div className="w-[122px]">
        <Thumbnail thumbnail={item.thumbnail} size="full" />
      </div>
      <div className="text-base-regular flex flex-col gap-y-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col flex-wrap">
            <Heading variant="titleSmall" className="whitespace-normal">
              {item.title}
            </Heading>
            <LineItemOptions variant={item.variant} />
          </div>
          <NativeSelect
            value={item.quantity}
            onChange={(value) =>
              updateItem({
                lineId: item.id,
                quantity: parseInt(value.target.value),
              })
            }
            className="max-h-[35px] w-[75px]"
          >
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
                  <option value={value} key={i}>
                    {value}
                  </option>
                );
              })}
          </NativeSelect>
        </div>
        <div className="text-small-regular flex flex-1 items-end justify-between">
          <button
            className="flex items-center gap-x-1 text-brand-muted"
            onClick={() => deleteItem(item.id)}
          >
            <Trash size={14} />
            <Text variant="info">Remove</Text>
          </button>

          <div>
            <LineItemPrice item={item} region={region} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
