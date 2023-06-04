import { zodResolver } from '@hookform/resolvers/zod';
import { billingAddressFormSchema } from '@lib/schemas/billing-address';
import { Customer } from '@medusajs/medusa';
import Button from '@modules/ui/button';
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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface AddBillingAddressProps {
  onSubmit: (data: z.infer<typeof billingAddressFormSchema>) => void;
  state: boolean;
  error?: string | undefined;
  open: () => void;
  close: () => void;
  submitting: boolean;
  customer: Omit<Customer, 'password_hash'>;
}

const AddBillingAddressModal: React.FC<AddBillingAddressProps> = ({
  onSubmit,
  state,
  error,
  open,
  close,
  submitting,
  customer,
}) => {
  const form = useForm<z.infer<typeof billingAddressFormSchema>>({
    resolver: zodResolver(billingAddressFormSchema),
    defaultValues: {
      billing_address: {
        last_name: '',
        first_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        province: '',
        postal_code: '',
        country_code: '',
      },
    },
  });

  //   const { regions } = useRegions();

  //   const regionOptions = useMemo(() => {
  //     return (
  //       regions
  //         ?.map((region) => {
  //           return region.countries.map((country) => ({
  //             value: country.iso_2,
  //             label: country.display_name,
  //           }));
  //         })
  //         .flat() || []
  //     );
  //   }, [regions]);

  useEffect(() => {
    form.reset({
      ...mapBillingAddressToFormData({ customer }),
    });
  }, [customer]);

  return (
    <Dialog open={state}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={open}>
          Cập nhật
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" customClose={close}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() =>
              form.reset(mapBillingAddressToFormData({ customer }))
            }
            className="w-full"
          >
            <DialogHeader>
              <DialogTitle>Thay đổi địa chỉ thanh toán</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-5">
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="billing_address.first_name"
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
                  name="billing_address.last_name"
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
                name="billing_address.address_1"
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
                name="billing_address.address_2"
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
                  name="billing_address.postal_code"
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
                  name="billing_address.city"
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
                name="billing_address.province"
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

const mapBillingAddressToFormData = ({
  customer,
}: {
  customer: Omit<Customer, 'password_hash'>;
}) => {
  return {
    billing_address: {
      first_name: customer.billing_address?.first_name || undefined,
      last_name: customer.billing_address?.last_name || undefined,
      company: customer.billing_address?.company || undefined,
      address_1: customer.billing_address?.address_1 || undefined,
      address_2: customer.billing_address?.address_2 || undefined,
      city: customer.billing_address?.city || undefined,
      province: customer.billing_address?.province || undefined,
      postal_code: customer.billing_address?.postal_code || undefined,
      country_code: customer.billing_address?.country_code || undefined,
    },
  };
};

export default AddBillingAddressModal;
