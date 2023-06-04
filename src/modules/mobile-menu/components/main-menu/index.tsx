import User from '@modules/common/icons/user';
import { Separator } from '@modules/ui/separator';
import { SheetClose } from '@modules/ui/sheet';
import Text from '@modules/ui/text';
import { SITE_HEADER } from '@static/header';
import { useMeCustomer, useProductCategories } from 'medusa-react';
import Link from 'next/link';

import { ProductCategory } from '@medusajs/medusa';
import ArrowBack from '@modules/common/icons/arrow-back';
import { useState } from 'react';
import ListItem from '../list-item';

const MainMenu = () => {
  const { customer } = useMeCustomer();
  const { product_categories: categories } = useProductCategories();

  const [submenuItems, setSubmenuItems] = useState<ProductCategory[]>([]);

  const menuContent = (
    <ul className="space-y-1">
      {submenuItems.length > 0
        ? submenuItems.map((item) => (
            <ListItem
              category={item}
              key={item.id}
              setSubmenuItems={setSubmenuItems}
            />
          ))
        : categories && categories.length > 0
        ? categories.map((category) => (
            <ListItem
              category={category}
              key={category.id}
              setSubmenuItems={setSubmenuItems}
            />
          ))
        : null}
    </ul>
  );

  return (
    <div className="flex flex-1 flex-col justify-between gap-y-2 pt-12">
      {submenuItems && submenuItems.length > 0 && (
        <button
          onClick={() => setSubmenuItems([])}
          className="absolute left-5 top-[21px] opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <ArrowBack size={22} />
        </button>
      )}

      {!submenuItems || submenuItems.length === 0 ? (
        <>
          {!customer ? (
            <SheetClose asChild>
              <Link href="/account/login" className="group py-1">
                <TextLink title="Đăng nhập / Đăng xuất" />
              </Link>
            </SheetClose>
          ) : (
            <Text span variant="dark">
              Hi, {customer.first_name}
            </Text>
          )}
          <Separator />
        </>
      ) : null}

      {menuContent}

      {submenuItems.length === 0 && (
        <div className="flex flex-col gap-y-2">
          <Separator />
          {customer && (
            <SheetClose asChild>
              <Link
                href="/account/login"
                className="group inline-flex w-full items-center gap-2 py-1"
              >
                <User size={22} />
                <TextLink title="My Account" />
              </Link>
            </SheetClose>
          )}
          {SITE_HEADER.map((item) => (
            <SheetClose asChild key={item.label}>
              <Link
                href={item.path}
                className="group inline-flex w-full items-center gap-2 py-1"
              >
                {item.icon}
                <TextLink title={item.label} />
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  );
};

export const TextLink = ({ title }: { title: string }) => (
  <Text
    variant="dark"
    className="text-[15px] transition ease-in-out group-hover:font-semibold"
    span
    sr={`Go to ${title}`}
  >
    {title}
  </Text>
);

export default MainMenu;
