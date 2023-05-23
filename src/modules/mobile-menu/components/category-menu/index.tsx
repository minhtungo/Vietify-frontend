import ArrowForward from '@icons/arrow-forward';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import { SheetClose } from '@modules/ui/sheet';
import Text from '@modules/ui/text';
import { useCollections } from 'medusa-react';
import Link from 'next/link';
import { FC } from 'react';

interface categoryMenuProps {}

const CategoryMenu: FC<categoryMenuProps> = ({}) => {
  const { collections } = useCollections();

  const {
    screen: [_, setScreen],
  } = useMobileMenu();

  return (
    <div className="flex flex-1 flex-col justify-between gap-y-3 py-6">
      <ul className="flex flex-col gap-y-2">
        {collections ? (
          <>
            {collections.map((collection) => (
              <SheetClose asChild key={collection.id}>
                <li className="py-1">
                  <Link
                    href={`/collections/${collection.id}`}
                    className="group inline-flex w-full items-center justify-between"
                  >
                    <Text
                      variant="dark"
                      span
                      sr={`Go to ${collection.title}`}
                      className="transition duration-100 ease-in-out group-hover:font-semibold"
                    >
                      {collection.title}
                    </Text>
                    <ArrowForward className="text-foreground/90" />
                  </Link>
                </li>
              </SheetClose>
            ))}
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default CategoryMenu;
