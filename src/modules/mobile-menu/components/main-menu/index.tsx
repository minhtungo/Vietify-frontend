import { useMobileMenu } from '@lib/context/mobile-menu-context';
import ArrowForward from '@modules/common/icons/arrow-forward';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { SITE_HEADER } from '@static/header';
import { useCollections, useMeCustomer } from 'medusa-react';
import Link from 'next/link';

const MainMenu = () => {
  const { collections } = useCollections();
  const { customer } = useMeCustomer();

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu();

  return (
    <div className="flex flex-1 flex-col justify-between space-y-4 pb-6 pt-12">
      <div className="flex flex-1 flex-col">
        <ul className="flex flex-col gap-y-2">
          {collections ? (
            <>
              {collections.map((collection) => (
                <li key={collection.id} className="py-1">
                  <Link
                    href={`/collections/${collection.id}`}
                    className="flex w-full items-center justify-between"
                  >
                    <Text variant="dark" span sr={`Go to ${collection.title}`}>
                      {collection.title}
                    </Text>
                    <ArrowForward className="text-foreground/90" />
                  </Link>
                </li>
              ))}
            </>
          ) : null}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-2">
        {!customer ? (
          <>
            {/* <Link
              href={`/account/login`}
              className="inline-flex w-full items-center justify-between py-1"
            >
              <Text variant="dark" span sr="Go to sign in page">
                Sign in
              </Text>
              <ArrowForward className="text-foreground/90" />
            </Link> */}
          </>
        ) : (
          <div className="flex flex-col gap-y-4">
            <span className="uppercase text-gray-700">Signed in as</span>
            <Text span variant="dark">
              Account
            </Text>
            <Link
              href={`/account`}
              className="inline-flex w-full items-center justify-between py-1"
            >
              <span className="sr-only">Go to account page</span>
              <span className="normal-case">{customer.first_name}</span>
              <ArrowForward className="text-foreground/90" />
            </Link>
          </div>
        )}
        {SITE_HEADER.map((item) => {
          return (
            <Link
              href={item.path}
              key={item.label}
              className="inline-flex w-full items-center gap-2 py-1"
            >
              {item.icon}
              <Text variant="dark" span sr={`Go to ${item.label}`}>
                {item.label}
              </Text>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainMenu;
