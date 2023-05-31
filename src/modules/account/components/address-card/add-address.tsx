import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import Button from '@ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { phoneRegex, postalCodeRegex } from '@lib/util/regex';
import { Input } from '@modules/ui/input';
import {
  Dialog,
  DialogClose,
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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import Plus from '@modules/common/icons/plus';
import useToggleState from '@lib/hooks/use-toggle-state';

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  city: z.string().min(2, 'Thành phố cần có ít nhất 2 kí tự.'),
  country_code: z.string().optional(),
  postal_code: z.string().regex(postalCodeRegex, 'Invalid Postal Code'),
  province: z.string().min(2, 'Province cần có ít nhất 2 kí tự.'),
  address_1: z.string().min(2),
  address_2: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Định dạng số điện thoại không hợp lệ.'),
  company: z.string().optional(),
});

const AddAddress: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { state, open, close } = useToggleState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const { refetchCustomer } = useAccount();

  const onAddAddress = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    setError(undefined);

    data.country_code = 'IT';

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || '',
      address_1: data.address_1,
      address_2: data.address_2 || '',
      city: data.city,
      country_code: data.country_code,
      province: data.province || '',
      postal_code: data.postal_code,
      phone: data.phone || '',
      metadata: {},
    };

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false);
        refetchCustomer();
        form.reset();
        close();
      })
      .catch(() => {
        setSubmitting(false);
        setError('Có lỗi xảy ra, vui lòng thử lại.');
      });
  };

  return (
    <Dialog open={state}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1" onClick={open}>
          <Plus size={22} />
          Thêm địa chỉ
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-xl"
        onInteractOutside={close}
        customClose={close}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddAddress)} className="w-full">
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
                      <Input
                        placeholder="Apartment, suite, etc."
                        {...field}
                        required
                      />
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
              {error && (
                <div className="text-small-regular py-2 text-destructive">
                  {error}
                </div>
              )}
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

export default AddAddress;
