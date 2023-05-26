import Link from '@modules/common/components/link';
import Hit, { HitProps } from '@modules/search/components/hit';

const HitItem = ({ hit }: HitProps) => {
  return (
    <Link href={`/products/${hit.handle}`}>
      <Hit hit={hit} />
    </Link>
  );
};

export default HitItem;
