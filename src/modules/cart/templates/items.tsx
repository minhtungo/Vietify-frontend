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
    <div className="grid grid-cols-1 gap-y-6">
      {items && region
        ? items
            .sort((a, b) => {
              return a.created_at > b.created_at ? -1 : 1;
            })
            .map((item) => {
              return (
                <>
                  <Item key={item.id} item={item} region={region} />
                  <Separator className="last:hidden" />
                </>
              );
            })
        : repeat(5).map((i) => {
            return <SkeletonLineItem key={i} />;
          })}
    </div>
  );
};

export default ItemsTemplate;
