import { useAccount } from '@lib/context/account-context';
import { Customer } from '@medusajs/medusa';

import { zodResolver } from '@hookform/resolvers/zod';
import { phoneRegex } from '@lib/util/regex';
import Button from '@modules/ui/button';
import { Input } from '@modules/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  last_name: z.string().min(2).max(50),
  first_name: z.string().min(2).max(50),
  phone: z.string().regex(phoneRegex, 'Định dạng số điện thoại không hợp lệ.'),
  email: z.string().email({
    message: 'Định dạng email không hợp lệ.',
  }),
});

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const ProfileInfo: React.FC<MyInformationProps> = ({ customer }) => {
  const { mutate: update, isLoading, isSuccess, isError } = useUpdateMe();

  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
    },
  });

  const { refetchCustomer } = useAccount();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thay đổi thông tin tài khoản thành công!');
    }
    if (isError) {
      toast.error(`${errorMessage}`);
    }
  }, [isSuccess, isError, errorMessage]);

  const updateUserIno = (data: z.infer<typeof formSchema>) => {
    return update(
      {
        id: customer.id,
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer();
        },
        onError: () => {
          setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại');
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateUserIno)} className="space-y-4">
        <div className="grid  gap-4 md:grid-cols-2">
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>

        <Button isLoading={isLoading} type="submit" className="ml-auto flex">
          Lưu thay đổi
        </Button>
      </form>
    </Form>
  );
};

export default ProfileInfo;
