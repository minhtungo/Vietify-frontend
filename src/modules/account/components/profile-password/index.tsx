import { medusaClient } from '@lib/config';
import { Customer } from '@medusajs/medusa';
import Security from '@modules/common/icons/security';
import Button from '@modules/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@modules/ui/dialog';
import { Input } from '@modules/ui/input';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

type UpdateCustomerPasswordFormData = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UpdateCustomerPasswordFormData>();

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe();

  useEffect(() => {
    reset();
  }, [customer, reset]);

  const updatePassword = async (data: UpdateCustomerPasswordFormData) => {
    const isValid = await medusaClient.auth
      .authenticate({
        email: customer.email,
        password: data.old_password,
      })
      .then(() => true)
      .catch(() => false);

    if (!isValid) {
      setError('old_password', {
        type: 'validate',
        message: 'Old password is incorrect',
      });
      setErrorMessage('Old password is incorrect');

      return;
    }

    if (data.new_password !== data.confirm_password) {
      setError('confirm_password', {
        type: 'validate',
        message: 'Passwords do not match',
      });
      setErrorMessage('Passwords do not match');

      return;
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
        <form onSubmit={handleSubmit(updatePassword)} onReset={() => reset()}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-1">
              <div className="grid gap-y-1.5">
                <Label htmlFor="old_password">Mật khẩu hiện tại</Label>
                <Input
                  {...register('old_password', {
                    required: true,
                  })}
                  placeholder="Nhập mật khẩu hiện tại"
                  type="password"
                  id="old_password"
                />
              </div>
              <div className="grid gap-y-1.5">
                <Label htmlFor="new_password">Mật khẩu mới</Label>
                <Input
                  {...register('new_password', {
                    required: true,
                  })}
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                  id="new_password"
                />
              </div>
              <div className="grid gap-y-1.5">
                <Label htmlFor="confirm_password">Nhập lại mật khẩu mới</Label>
                <Input
                  {...register('confirm_password', {
                    required: true,
                  })}
                  placeholder="Nhập lại mật khẩu mới"
                  type="password"
                  id="confirm_password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfilePassword;
