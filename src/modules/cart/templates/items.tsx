import repeat from '@lib/util/repeat';
import { LineItem, Region } from '@medusajs/medusa';
import Item from '@modules/cart/components/item';
import SkeletonLineItem from '@modules/skeletons/components/skeleton-line-item';
import { Separator } from '@modules/ui/separator';

type ItemsTemplateProps = {
  items?: Omit<LineItem, 'beforeInsert'>[];
  region?: Region;
};

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div>
      {items && region
        ? items
            .sort((a, b) => {
              return a.created_at > b.created_at ? -1 : 1;
            })
            .map((item, i) => {
              return (
                <div key={item.id}>
                  <Item item={item} region={region} />
                  {i !== items.length - 1 && <Separator className="my-4" />}
                </div>
              );
            })
        : repeat(5).map((i) => {
            return <SkeletonLineItem key={i} />;
          })}
    </div>
  );
};

export default ItemsTemplate;
