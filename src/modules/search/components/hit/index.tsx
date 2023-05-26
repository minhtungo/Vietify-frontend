import { ProductVariant } from '@medusajs/medusa';
import Thumbnail from '@modules/products/components/thumbnail';
import Text from '@modules/ui/text';
import Link from 'next/link';

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
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          {hit.collection_id && (
            <Link
              href={`/collections/${hit.collection_id}`}
              className="text-small-regular text-gray-500"
            >
              {hit.collection_handle}
              {hit.title}
            </Link>
          )}
          <Text variant="dark">{hit.title}</Text>
          <Text>{hit.description}</Text>
        </div>
      </div>
    </div>
  );
};

export default Hit;
