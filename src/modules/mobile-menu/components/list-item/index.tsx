import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Text, { textVariants } from '@modules/ui/text';

import { ProductCategory } from '@medusajs/medusa';
import ArrowForward from '@modules/common/icons/arrow-forward';
import Link from 'next/link';

interface listItemProps {
  category: ProductCategory;
}

const ListItem: React.FC<listItemProps> = ({ category }) => {
  const {
    screen: [_, setScreen],
  } = useMobileMenu();
  return (
    <li className="py-1">
      {category.category_children.length > 0 ? (
        <button
          onClick={() => setScreen('categoryMenu')}
          className="group inline-flex w-full items-center justify-between"
        >
          <Text
            variant="dark"
            span
            sr={`Go to ${category.name}`}
            className="transition duration-100 ease-in-out group-hover:font-semibold"
          >
            {category.name}
          </Text>
          <ArrowForward className="text-foreground/90" />
        </button>
      ) : (
        <Link
          href={`/c/${category.name}`}
          className={textVariants({
            variant: 'dark',
            className:
              'inline-flex w-full items-center justify-between transition duration-100 ease-in-out hover:font-semibold',
          })}
        >
          {category.name}
        </Link>
      )}
    </li>
  );
};

export default ListItem;
