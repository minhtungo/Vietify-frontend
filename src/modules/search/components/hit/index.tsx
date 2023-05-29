import { ProductVariant } from '@medusajs/medusa';
import Thumbnail from '@modules/products/components/thumbnail';
import Text from '@modules/ui/text';

export type ProductHit = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: ProductVariant[];
  collection_handle: string | null;
  collection_id: string | null;
};

export type HitProps = {
  hit: ProductHit;
};

const Hit = ({ hit }: HitProps) => {
  return (
    <div key={hit.id} className="grid w-full grid-cols-[65px_1fr] gap-3">
      <Thumbnail thumbnail={hit.thumbnail} size="full" alt={hit.title} />
      <div className="flex flex-col">
        <Text variant="dark" size="md" className="!font-medium">
          {hit.title}
        </Text>
        {hit.description && (
          <Text size="sm" className="line-clamp-2">
            {hit.description}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Hit;
