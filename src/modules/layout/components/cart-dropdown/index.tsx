import { useCartDropdown } from '@lib/context/cart-dropdown-context';
import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import Button from '@modules/common/components/button';
import Heading from '@modules/common/components/heading';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@modules/common/components/popover';
import CartIcon from '@modules/common/icons/cart';
import { formatAmount, useCart } from 'medusa-react';
import Link from 'next/link';

import CartItem from './cart-item';
import Text from '@modules/common/components/text';

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
        <PopoverContent className="hidden small:block w-[410px]">
          <Heading className="p-3">Shopping Cart</Heading>
          {cart && items?.length ? (
            <>
              <div className="overflow-y-scroll max-h-[400px] px-3">
                {items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1;
                  })
                  .map((item) => (
                    <CartItem
                      item={item}
                      cart={cart}
                      key={item.id}
                      className="border-b first:pt-0 py-3.5 last:border-none"
                    />
                  ))}
              </div>
              <div className="flex flex-col gap-y-4 text-small-regular p-3">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <Text variant="label" as="span">
                      Subtotal
                    </Text>
                    <Text as="span" variant="description">
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
                  <Link href="/cart" passHref className="flex-1">
                    <PopoverClose asChild>
                      <Button variant="outline" className="w-full">
                        View cart
                      </Button>
                    </PopoverClose>
                  </Link>
                  <Link href="/checkout" passHref className="flex-1">
                    <PopoverClose asChild>
                      <Button className="w-full">Checkout</Button>
                    </PopoverClose>
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
