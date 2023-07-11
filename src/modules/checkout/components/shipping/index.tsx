import { ErrorMessage } from '@hookform/error-message';
import Spinner from '@icons/spinner';
import { useCheckout } from '@lib/context/checkout-context';
import cn from '@lib/util/cn';
import { Cart } from '@medusajs/medusa';
import { formatAmount, useCart, useCartShippingOptions } from 'medusa-react';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import StepContainer from '../step-container';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Label } from '@ui/label';
import Text from '@modules/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@modules/ui/card';
import Heading from '@modules/ui/heading';
import FastDelivery from '@modules/common/icons/fast-delivery';
import Delivery from '@modules/common/icons/delivery';

type ShippingOption = {
  value?: string;
  label?: string;
  price: string;
};

type ShippingProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

type ShippingFormProps = {
  soId: string;
};

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart();
  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  });

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  });

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch();
    };

    refetchShipping();
  }, [cart, refetch]);

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () =>
          setError(
            'soId',
            {
              type: 'validate',
              message:
                'An error occurred while adding shipping. Please try again.',
            },
            { shouldFocus: true }
          ),
      }
    );
  };

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value);
    fn(value);
  };

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }));
    }

    return [];
  }, [shipping_options, cart]);

  const {
    sameAsBilling: { state: sameBilling },
  } = useCheckout();

  return (
    <StepContainer
      index={sameBilling ? 2 : 3}
      title="Delivery"
      closedState={
        <div className="text-small-regular px-8 pb-8">
          <p>Enter your address to see available delivery options.</p>
        </div>
      }
    >
      <Controller
        name="soId"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div>
              {shippingMethods && shippingMethods.length ? (
                <div className="grid grid-cols-1 gap-3">
                  {shippingMethods.map((option) => {
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleChange(option.value!, onChange)}
                      >
                        <Card
                          className={cn(
                            'hover:border-primary/40',
                            value === option.value && 'border-primary'
                          )}
                        >
                          <CardContent className="flex flex-col items-start gap-1 px-6 py-4">
                            <div className="flex w-full items-start justify-between">
                              <Heading size="sm">{option.label}</Heading>
                              <Delivery className="h-6 w-6 text-secondary-foreground" />
                            </div>
                            <Text variant="dark" size="sm">
                              {option.price}
                            </Text>
                          </CardContent>
                        </Card>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // <RadioGroup
                //   value={value}
                //   defaultValue={value}
                //   onValueChange={(value: string) => {
                //     console.log(value);
                //     handleChange(value, onChange);
                //   }}
                // >
                //   {shippingMethods.map((option) => {
                //     return (
                //       <div
                //         className={cn(
                //           'flex w-full cursor-pointer items-center justify-between space-x-2 border-b border-border px-8 py-4 last:border-b-0',
                //           option.value === value && 'bg-accent/30'
                //         )}
                //         key={option.value}
                //       >
                //         <div>
                //           <RadioGroupItem
                //             value={option.value!}
                //             id={option.value}
                //           />
                //           <Label
                //             htmlFor={option.value}
                //             className="ml-2 cursor-pointer"
                //           >
                //             {option.label}
                //           </Label>
                //         </div>
                //         <Text size="md">{option.price}</Text>
                //       </div>
                //     );
                //   })}
                // </RadioGroup>
                <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                  <Spinner />
                </div>
              )}

              <ErrorMessage
                errors={errors}
                name="soId"
                render={({ message }) => {
                  return (
                    <div className="text-small-regular pt-2 text-rose-500">
                      <span>{message}</span>
                    </div>
                  );
                }}
              />
            </div>
          );
        }}
      />
    </StepContainer>
  );
};

export default Shipping;
