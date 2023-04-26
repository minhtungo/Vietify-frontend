import { useCartDropdown } from '@lib/context/cart-dropdown-context';
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import Button from '@modules/common/components/button';
import Heading from '@modules/common/components/heading';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@modules/common/components/popover';
import CartIcon from '@modules/common/icons/cart';
import { formatAmount, useCart } from 'medusa-react';
import Link from 'next/link';
import { Fragment } from 'react';

import CartItem from './cart-item';

const CartDropdown = () => {
  const { cart, totalItems } = useCart();
  const items = useEnrichedLineItems();
  const { state, open, close } = useCartDropdown();

  return (
    <div
      className="h-full z-50 relative"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Popover>
        <PopoverTrigger className="h-full flex items-center">
          <span className="group relative inline-block">
            <CartIcon
              className="text-gray-600 group-hover:text-gray-800"
              size={24}
              aria-hidden="true"
            />
            <span className="absolute top-0 right-0 inline-flex items-center px-1 py-[2px] text-xs font-medium leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItems}
            </span>
            <span className="sr-only">
              {`${totalItems} items in cart, view bag`}
            </span>
          </span>
        </PopoverTrigger>
        <PopoverContent className="hidden small:block">
          <Heading className="p-4">Shopping Cart</Heading>
          {cart && items?.length ? (
            <>
              <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                {items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1;
                  })
                  .map((item) => (
                    <CartItem item={item} cart={cart} key={item.id} />
                  ))}
              </div>
              <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold">
                    Subtotal <span className="font-normal">(incl. taxes)</span>
                  </span>
                  <span className="text-large-semi">
                    {formatAmount({
                      amount: cart.subtotal || 0,
                      region: cart.region,
                      includeTaxes: false,
                    })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href="/cart" passHref className="flex-1">
                    <Button variant="outline" className="w-full">
                      View cart
                    </Button>
                  </Link>
                  <Link href="/checkout" passHref className="flex-1">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                  <span>0</span>
                </div>
                <span>Your shopping bag is empty.</span>
                <div>
                  <Link href="/store">
                    <span className="sr-only">Go to all products page</span>
                    <Button variant="secondary" onClick={close}>
                      Explore products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CartDropdown;
