import CartIcon from '@icons/cart';
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import { ScrollArea } from '@modules/ui/scroll-area';
import { Separator } from '@modules/ui/separator';
import { buttonVariants } from '@ui/button';
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

const CartDropdown = () => {
  const { cart, totalItems } = useCart();
  const items = useEnrichedLineItems();
  // const { state, open, close } = useCartDropdown();

  return (
    <div className="relative z-50 h-full">
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200">
            <CartIcon className="text-gray-600" size={24} aria-hidden="true" />
            <span className="absolute right-[2px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium leading-none text-brand-light">
              {totalItems}
            </span>
            <span className="sr-only">
              {`${totalItems} items in cart, view bag`}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="mt-[2px] hidden w-full small:block">
          <Heading className="p-3">Shopping Cart</Heading>
          {cart && items?.length ? (
            <>
              <ScrollArea className="h-[400px] w-[410px]">
                <div className="flex flex-col gap-3.5 px-3">
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
              </ScrollArea>

              <div className="text-small-regular mt-3 flex flex-col gap-y-4 p-3">
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
            <div className="flex flex-col items-center justify-center gap-y-4 py-8">
              <span>Your cart is empty.</span>
              <PopoverClose asChild>
                <Link href="/store" className={buttonVariants({})}>
                  <span className="sr-only">Go to all products page</span>
                  Explore products
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
