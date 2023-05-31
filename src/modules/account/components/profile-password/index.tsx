import { medusaClient } from '@lib/config';
import { Customer } from '@medusajs/medusa';
import Security from '@modules/common/icons/security';
import Button from '@modules/ui/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@modules/ui/dialog';
import { Input } from '@modules/ui/input';
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import * as z from 'zod';
import { passwordRegex } from '@lib/util/regex';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const passwordSchema = z
  .string()
  .min(8, 'Mật khẩu cần có ít nhất 8 ký tự.')
  .max(50, 'Mật khẩu có thể có tối đa 50 ký tự.')
  .regex(
    passwordRegex,
    'Mật khẩu phải có ít nhất 1 chữ hoa, 1 ký tự đặc biệt và 1 số.'
  );

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(8, 'Mật khẩu cần có ít nhất 8 ký tự.')
      .max(50, 'Mật khẩu có thể có tối đa 50 ký tự.'),
    new_password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu mới không khớp.',
    path: ['confirm_password'],
  });

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const { mutate: update, isLoading, isSuccess, isError } = useUpdateMe();

  useEffect(() => {
    form.reset();
  }, [customer]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thay đổi mật khẩu thành công!');
    }
  }, [isSuccess]);

  const updatePassword = async (data: z.infer<typeof formSchema>) => {
    const isValid = await medusaClient.auth
      .authenticate({
        email: customer.email,
        password: data.old_password,
      })
      .then(() => true)
      .catch(() => false);

    if (!isValid) {
      return form.setError('old_password', {
        type: 'validate',
        message: 'Mật khẩu hiện tại không khớp.',
      });
    }

    return update({
      id: customer.id,
      password: data.new_password,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Security size={20} className="text-muted-foreground" />
        <span className="text-sm font-medium">Đổi mật khẩu</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Cập nhật</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updatePassword)}
              onReset={() => form.reset()}
            >
              <DialogHeader>
                <DialogTitle>Đổi mật khẩu</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-5">
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu hiện tại</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu hiện tại"
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
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu mới"
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
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập lại mật khẩu mới"
                          {...field}
                          required
                        />
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

export default ProfilePassword;
