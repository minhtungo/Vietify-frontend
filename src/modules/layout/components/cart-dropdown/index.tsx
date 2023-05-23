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

import cn from '@lib/util/cn';
import CartItem from './cart-item';
import Indicator from './indicator';

import { FC } from 'react';

interface CartDropdownProps {
  className?: string;
}

const CartDropdown: FC<CartDropdownProps> = ({ className }) => {
  const { cart, totalItems } = useCart();
  const items = useEnrichedLineItems();

  return (
    <div className={cn('relative z-50', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 duration-150"
          >
            <CartIcon
              className="text-foreground/90"
              size={25}
              aria-hidden="true"
            />
            <Indicator
              className="absolute right-[2px] top-0"
              totalItems={totalItems}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="hidden w-full space-y-4 small:block">
          {cart && items?.length ? (
            <>
              <Heading className="px-4">Giỏ Hàng</Heading>
              <div className="max-h-[400px] w-[400px] overflow-y-auto">
                <div className="flex flex-col gap-3.5 px-4">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1;
                    })
                    .map((item, index) => (
                      <>
                        <CartItem item={item} cart={cart} key={item.id} />
                        {index !== items.length - 1 && (
                          <Separator className="last:hidden" />
                        )}
                      </>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-y-4 px-4">
                <Separator />
                <div className="flex justify-between">
                  <div>
                    <Text size="md" className="!font-semibold">
                      Thành tiền
                    </Text>
                    <Text size="sm">
                      Phí vận chuyển và thuế được tính khi thanh toán.
                    </Text>
                  </div>

                  <Text size="md" className="!font-semibold" span>
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
                      Xem giỏ hàng
                    </Link>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <Link
                      href="/checkout"
                      className={buttonVariants({ className: 'w-full' })}
                    >
                      Thanh toán
                    </Link>
                  </PopoverClose>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-4 px-4">
              <Text variant="dark" size="lg">
                Chưa có sản phẩm trong giỏ hàng của bạn.
              </Text>
              <PopoverClose asChild>
                <Link href="/shop" className={buttonVariants({})}>
                  <Text className="sr-only">Go to all products page</Text>
                  Mua sắm ngay
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
