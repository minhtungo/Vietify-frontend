import CartIcon from '@icons/cart';
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import { Separator } from '@modules/ui/separator';
import Button, { buttonVariants } from '@ui/button';
import Heading from '@ui/heading';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@ui/popover';
import Text from '@ui/text';
import { formatAmount, useCart } from 'medusa-react';
import Link from 'next/link';

import CartItem from './cart-item';
import Indicator from './indicator';

const CartDropdown = () => {
  const { cart, totalItems } = useCart();
  const items = useEnrichedLineItems();
  // const { state, open, close } = useCartDropdown();

  return (
    <div className="relative z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 duration-150"
          >
            <CartIcon className="text-gray-600" size={25} aria-hidden="true" />
            <Indicator
              className="absolute right-[2px] top-0"
              totalItems={totalItems}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-[2px] hidden w-full space-y-4 px-0 py-5 small:block">
          {cart && items?.length ? (
            <>
              <Heading className="px-4">Shopping Cart</Heading>
              <div className="max-h-[400px] w-[400px] overflow-y-auto">
                <div className="flex flex-col gap-3.5 px-4">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1;
                    })
                    .map((item, index) => (
                      <>
                        <CartItem
                          item={item}
                          cart={cart}
                          key={item.id}
                          className=""
                        />
                        {index !== items.length - 1 && (
                          <Separator className="last:hidden" />
                        )}
                      </>
                    ))}
                </div>
              </div>

              <div className="text-small-regular flex flex-col gap-y-4 px-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <Text variant="label" as="span">
                      Subtotal
                    </Text>
                    <Text variant="description" as="span">
                      Shipping and taxes calculated at checkout.
                    </Text>
                  </div>

                  <Text variant="label" as="span">
                    {formatAmount({
                      amount: cart.subtotal || 0,
                      region: cart.region,
                      includeTaxes: false,
                    })}
                  </Text>
                </div>
                <div className="flex gap-3">
                  <PopoverClose asChild>
                    <Link
                      href="/cart"
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full',
                      })}
                    >
                      View cart
                    </Link>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Link
                      href="/checkout"
                      className={buttonVariants({ className: 'w-full' })}
                    >
                      Checkout
                    </Link>
                  </PopoverClose>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-[290px] flex-col items-center justify-center gap-y-4 px-4">
              <Text variant="label" as="span" className="text-lg">
                Your cart is empty.
              </Text>
              <PopoverClose asChild>
                <Link href="/shop" className={buttonVariants({})}>
                  <Text className="sr-only">Go to all products page</Text>
                  Explore Books
                </Link>
              </PopoverClose>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CartDropdown;
