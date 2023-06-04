import Button from '@ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@modules/ui/input';
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
import { useForm } from 'react-hook-form';

import { shippingAddressSchema } from '@lib/schemas/shipping-address';
import Plus from '@modules/common/icons/plus';
import Text from '@modules/ui/text';
import * as z from 'zod';

interface AddShippingAddressProps {
  onSubmit: (data: z.infer<typeof shippingAddressSchema>) => void;
  state: boolean;
  error: string | undefined;
  open: () => void;
  close: () => void;
  submitting: boolean;
}

const AddAddressModal: React.FC<AddShippingAddressProps> = ({
  onSubmit,
  state,
  error,
  open,
  close,
  submitting,
}) => {
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      last_name: '',
      first_name: '',
      company: '',
      address_1: '',
      address_2: '',
      phone: '',
      city: '',
      province: '',
      postal_code: '',
      country_code: '',
    },
  });

  return (
    <Dialog open={state}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-full w-full flex-col gap-y-1"
          onClick={open}
        >
          <Plus className="h-8 w-8 text-muted-foreground" />
          <Text variant="dark" span className="font-medium">
            Thêm địa chỉ
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" customClose={close}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <DialogHeader>
              <DialogTitle>Thay đổi địa chỉ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-5">
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="first_name"
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
                  name="last_name"
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
                name="phone"
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
                name="address_1"
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
                name="address_2"
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
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <FormField
                  control={form.control}
                  name="postal_code"
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
                <FormField
                  control={form.control}
                  name="city"
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
              </div>
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Province" {...field} required />
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

export default AddAddressModal;
