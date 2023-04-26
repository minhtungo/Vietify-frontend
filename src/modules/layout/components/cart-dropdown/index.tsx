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
      className="relative z-50 h-full"
      onMouseEnter={open}
      onMouseLeave={close}
    >
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
        <PopoverContent className="mt-[2px] hidden w-[410px] small:block">
          <Heading className="p-3">Shopping Cart</Heading>
          {cart && items?.length ? (
            <>
              <div className="max-h-[400px] overflow-y-scroll px-3">
                {items
                  .sort((a, b) => {
                    return a.created_at > b.created_at ? -1 : 1;
                  })
                  .map((item) => (
                    <CartItem
                      item={item}
                      cart={cart}
                      key={item.id}
                      className="border-b py-3.5 first:pt-0 last:border-none"
                    />
                  ))}
              </div>
              <div className="text-small-regular flex flex-col gap-y-4 p-3">
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
              <div className="flex flex-col items-center justify-center gap-y-4 py-16">
                <div className="text-small-regular flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
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
