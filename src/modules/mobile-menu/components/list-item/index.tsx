import { ProductCategory } from '@medusajs/medusa';
import ArrowForward from '@modules/common/icons/arrow-forward';
import Link from 'next/link';
import { TextLink } from '../main-menu';

interface listItemProps {
  category: ProductCategory;
  setSubmenuItems: React.Dispatch<React.SetStateAction<ProductCategory[]>>;
}

const ListItem: React.FC<listItemProps> = ({ category, setSubmenuItems }) => {
  return (
    <li className="py-1.5">
      {category.category_children && category.category_children.length > 0 ? (
        <button
          onClick={() => setSubmenuItems(category.category_children || [])}
          className="group inline-flex w-full items-center justify-between"
        >
          <TextLink title={category.name} />
          <ArrowForward className="text-foreground/90" />
        </button>
      ) : (
        <Link href={`/c/${category.name}`} className="group inline-flex w-full">
          <TextLink title={category.name} />
        </Link>
      )}
    </li>
  );
};

export default ListItem;
