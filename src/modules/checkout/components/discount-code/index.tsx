import { Input } from '@modules/ui/input';
import Trash from '@icons/trash';
import { medusaClient } from '@lib/config';
import { Cart } from '@medusajs/medusa';
import { useMutation } from '@tanstack/react-query';
import Button from '@ui/button';
import { Card, CardContent } from '@ui/card';
import { formatAmount, useCart, useUpdateCart } from 'medusa-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

type DiscountFormValues = {
  discount_code: string;
};

type DiscountCodeProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { id, discounts, region } = cart;
  const { mutate, isLoading } = useUpdateCart(id);
  const { setCart } = useCart();

  const { isLoading: mutationLoading, mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code);
    }
  );

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined;
    }

    switch (discounts[0].rule.type) {
      case 'percentage':
        return `${discounts[0].rule.value}%`;
      case 'fixed':
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`;

      default:
        return 'Free shipping';
    }
  }, [discounts, region]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    mode: 'onSubmit',
  });

  const onApply = (data: DiscountFormValues) => {
    mutate(
      {
        discounts: [{ code: data.discount_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            'discount_code',
            {
              message: 'Code is invalid',
            },
            {
              shouldFocus: true,
            }
          );
        },
      }
    );
  };

  const onRemove = () => {
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart);
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="text-small-regular p-6">
        {appliedDiscount ? (
          <div className="flex items-center justify-between">
            <div>
              <span>Code: </span>
              <span className="font-semibold">{appliedDiscount}</span>
            </div>
            <button
              className="flex items-center gap-x-2"
              onClick={onRemove}
              disabled={isLoading}
            >
              <Trash size={16} />
              <span className="sr-only">Remove gift card from order</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onApply)} className="w-full">
            <div className="grid grid-cols-[1fr_90px] gap-x-2">
              <Input
                placeholder="Nhập mã khuyến mãi"
                {...register('discount_code', {
                  required: 'Code is required',
                })}
                errors={errors}
              />

              <Button
                className="h-full w-full text-xs"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Áp dụng
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscountCode;
