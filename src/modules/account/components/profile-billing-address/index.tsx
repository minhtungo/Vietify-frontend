import { useAccount } from '@lib/context/account-context';
import { Customer } from '@medusajs/medusa';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { useRegions, useUpdateMe } from 'medusa-react';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import * as z from 'zod';
import Button from '@modules/ui/button';
import Security from '@modules/common/icons/security';
import { postalCodeRegex } from '@lib/util/regex';
import { Input } from '@modules/ui/input';
import toast from 'react-hot-toast';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const formSchema = z.object({
  billing_address: z.object({
    last_name: z.string().min(2).max(50),
    first_name: z.string().min(2).max(50),
    company: z.string().optional(),
    address_1: z.string().min(2),
    address_2: z.string().optional(),
    city: z.string().min(2, 'Thành phố cần có ít nhất 2 kí tự.'),
    province: z.string().min(2, 'Province cần có ít nhất 2 kí tự.'),
    postal_code: z.string().regex(postalCodeRegex, 'Invalid Postal Code'),
    country_code: z.string().optional(),
  }),
});

const ProfileBillingAddress: React.FC<MyInformationProps> = ({ customer }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const { mutate: update, isLoading, isSuccess, isError } = useUpdateMe();

  const { regions } = useRegions();

  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  useEffect(() => {
    form.reset({
      ...mapBillingAddressToFormData({ customer }),
    });
  }, [customer, form.reset]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thay đổi địa chỉ thành công!');
    }
    if (isError) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  }, [isSuccess, isError]);

  const { refetchCustomer } = useAccount();

  const updateBillingAddress = (data: z.infer<typeof formSchema>) => {
    return update(
      {
        id: customer.id,
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer();
        },
      }
    );
  };

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return 'No billing address';
    }

    const country =
      regionOptions?.find(
        (country) => country.value === customer.billing_address.country_code
      )?.label || customer.billing_address.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold">
        <span>
          {customer.billing_address.first_name}{' '}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ''}
        </span>
        <span>
          {customer.billing_address.postal_code},{' '}
          {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [customer, regionOptions]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Security size={20} className="text-muted-foreground" />
        <span className="text-sm font-medium">Đổi địa chỉ thanh toán</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Cập nhật</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateBillingAddress)}
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
                          <Input
                            placeholder="Postal Code"
                            {...field}
                            required
                          />
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
                <Button type="submit" isLoading={isLoading}>
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapBillingAddressToFormData = ({ customer }: MyInformationProps) => {
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

export default ProfileBillingAddress;
