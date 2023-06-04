import { medusaClient } from '@lib/config';
import { Customer } from '@medusajs/medusa';
import Button from '@modules/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import useToggleState from '@lib/hooks/use-toggle-state';
import { passwordFormSchema } from '@lib/schemas/update-password';
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
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const { state, open, close } = useToggleState(false);

  const { mutate: update, isLoading, isSuccess, isError } = useUpdateMe();

  useEffect(() => {
    form.reset();
  }, [customer]);

  useEffect(() => {
    if (isSuccess) {
      close();
      toast.success('Thay đổi mật khẩu thành công!');
    }
  }, [isSuccess]);

  const updatePassword = async (data: z.infer<typeof passwordFormSchema>) => {
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
    <Dialog open={state}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={open}>
          Đổi mật khẩu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" customClose={close}>
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
              <Button variant="outline" onClick={close}>
                Đóng
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePassword;
