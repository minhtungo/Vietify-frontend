import Button, { buttonVariants } from '@ui/button';

import { Input } from '@modules/ui/input';
import { states } from '@static/content';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useCheckout } from '@lib/context/checkout-context';
import { shippingAddressFormSchema } from '@lib/schemas/checkout';
import cn from '@lib/util/cn';
import ChevronDownIcon from '@modules/common/icons/chevron-down';
import Edit from '@modules/common/icons/edit';
import { textVariants } from '@modules/ui/text';
import * as z from 'zod';
import useEditAddress from '@lib/hooks/use-edit-address';
import { Address } from '@medusajs/medusa';

interface ShippingAddressProps {
  // onSubmit: (data: z.infer<typeof shippingAddressFormSchema>) => void;
  state: boolean;
  error?: string | undefined;
  open: () => void;
  close: () => void;
  submitting: boolean;
  isEdit?: boolean;
  form: UseFormReturn<z.infer<typeof shippingAddressFormSchema>>;
  address: Address;
}

const CheckoutShippingAddressModal: React.FC<ShippingAddressProps> = ({
  // onSubmit,
  state,
  error,
  open,
  close,
  submitting,
  isEdit,
  form,
  address,
}) => {
  const { setAddresses, handleSubmit } = useCheckout();
  const { onEditAddress } = useEditAddress();

  const onSubmit = async (data: z.infer<typeof shippingAddressFormSchema>) => {
    handleSubmit(setAddresses);
    onEditAddress(data.shipping_address, address);
  };

  return (
    <Dialog open={state}>
      <DialogTrigger asChild>
        <button
          onClick={open}
          className={textVariants({
            size: 'sm',
            variant: 'brand',
            className: 'block font-semibold hover:underline',
          })}
        >
          <span className="hidden md:inline">Thay đổi</span>
          <Edit className="block md:hidden" size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" customClose={close}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
            id="shipping-address-form"
          >
            <DialogHeader>
              <DialogTitle>Thay đổi địa chỉ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-5">
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="shipping_address.first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_address.last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder="Họ" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="shipping_address.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipping_address.address_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Địa chỉ" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipping_address.address_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment, suite, etc.</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment, suite, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-[1fr_150px] gap-x-4">
                <FormField
                  control={form.control}
                  name="shipping_address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thành phố</FormLabel>
                      <FormControl>
                        <Input placeholder="Thành phố" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shipping_address.province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <div className="relative w-max">
                        <FormControl>
                          <select
                            className={cn(
                              buttonVariants({ variant: 'outline' }),
                              'appearance-none bg-transparent text-sm font-normal text-muted-foreground'
                            )}
                            {...field}
                          >
                            {states.map((state) => (
                              <option value={state.name} key={state.code}>
                                {state.name}
                              </option>
                            ))}
                            <option value="manrope">Manrope</option>
                            <option value="system">System</option>
                          </select>
                        </FormControl>
                        <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="shipping_address.postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-small-regular py-2 text-destructive">
                  {error}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                Đóng
              </Button>
              <Button type="submit" isLoading={submitting}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutShippingAddressModal;
