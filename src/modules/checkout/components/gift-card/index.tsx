import { Input } from '@modules/ui/input';
import Trash from '@icons/trash';
import { Cart } from '@medusajs/medusa';
import Button from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@ui/card';
import { useCart } from 'medusa-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

type GiftCardFormValues = {
  gift_card_code: string;
};

type GiftCardProps = {
  cart?: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

const GiftCard: React.FC<GiftCardProps> = ({ cart }) => {
  const {
    updateCart: { mutate, isLoading },
    setCart,
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
    setError,
  } = useForm<GiftCardFormValues>();

  const appliedGiftCard = useMemo(() => {
    if (!cart || !cart.gift_cards?.length) {
      return undefined;
    }

    return cart.gift_cards[0].code;
  }, [cart]);

  const onSubmit = (data: GiftCardFormValues) => {
    mutate(
      {
        gift_cards: [{ code: data.gift_card_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            'gift_card_code',
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
    mutate(
      {
        gift_cards: [],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
      }
    );
  };

  return (
    <Card>
      <CardContent className="text-small-regular p-6">
        {appliedGiftCard ? (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Code: </span>
              <span className="font-semibold">{appliedGiftCard}</span>
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-[1fr_90px] gap-x-2">
              <Input
                placeholder="Nhập mã quà tặng"
                {...register('gift_card_code', {
                  required: 'Code is required',
                })}
                errors={errors}
                touched={touchedFields}
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

export default GiftCard;
