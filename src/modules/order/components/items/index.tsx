import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import { LineItem, Region } from '@medusajs/medusa';
import LineItemOptions from '@common/line-item-options';
import LineItemPrice from '@common/line-item-price';
import Thumbnail from '@modules/products/components/thumbnail';
import SkeletonLineItem from '@modules/skeletons/components/skeleton-line-item';
import Link from 'next/link';

type ItemsProps = {
  items: LineItem[];
  region: Region;
  cartId: string;
};

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId);

  return (
    <div className="flex flex-col gap-y-4 border-b border-gray-200 p-10">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
                <div className="w-[122px]">
                  <Thumbnail thumbnail={item.thumbnail} size="full" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="text-small-regular flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base-regular mr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <LineItemOptions variant={item.variant} />
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <div className="flex justify-end">
                        <LineItemPrice region={region} item={item} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />;
          })}
    </div>
  );
};

export default Items;
