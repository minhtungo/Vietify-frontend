import { useMobileMenu } from '@lib/context/mobile-menu-context';
import ArrowForward from '@modules/common/icons/arrow-forward';
import User from '@modules/common/icons/user';
import { Separator } from '@modules/ui/separator';
import { SheetClose } from '@modules/ui/sheet';
import Text from '@modules/ui/text';
import { SITE_HEADER } from '@static/header';
import { useCollections, useMeCustomer } from 'medusa-react';
import Link from 'next/link';

const MainMenu = () => {
  const { collections } = useCollections();
  const { customer } = useMeCustomer();

  const {
    screen: [_, setScreen],
  } = useMobileMenu();

  return (
    <div className="flex flex-1 flex-col justify-between gap-y-3 py-6">
      {!customer ? (
        <SheetClose asChild>
          <Link href="/account/login" className="group py-1">
            <Text
              variant="dark"
              span
              sr="Go to sign in page"
              className="transition duration-100 ease-in-out group-hover:font-semibold"
            >
              Login / Sign Up
            </Text>
          </Link>
        </SheetClose>
      ) : (
        <Text span variant="dark">
          Hi, {customer.first_name}
        </Text>
      )}
      <Separator />
      <ul className="flex flex-col gap-y-2">
        {collections ? (
          <>
            {collections.map((collection) => (
              <li key={collection.id} className="py-1">
                <button
                  onClick={() => setScreen('categoryMenu')}
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
                </button>
              </li>
            ))}
          </>
        ) : null}
      </ul>
      <Separator />
      <div className="flex flex-col gap-y-2">
        {customer && (
          <SheetClose asChild>
            <Link
              href="/account/login"
              className="group inline-flex w-full items-center gap-2 py-1"
            >
              <User size={22} />
              <Text variant="dark" span sr="Go to Account">
                My Account
              </Text>
            </Link>
          </SheetClose>
        )}
        {SITE_HEADER.map((item) => {
          return (
            <SheetClose asChild key={item.label}>
              <Link
                href={item.path}
                className="group inline-flex w-full items-center gap-2 py-1"
              >
                {item.icon}
                <Text
                  variant="dark"
                  className="transition duration-100 ease-in-out group-hover:font-semibold"
                  span
                  sr={`Go to ${item.label}`}
                >
                  {item.label}
                </Text>
              </Link>
            </SheetClose>
          );
        })}
      </div>
    </div>
  );
};

export default MainMenu;
