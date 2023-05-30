import { useAccount } from '@lib/context/account-context';
import { Customer } from '@medusajs/medusa';

import { Input } from '@modules/ui/input';
import { Label } from '@modules/ui/label';
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

type UpdateCustomerPhoneFormData = {
  phone: string;
};

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerPhoneFormData>({
    defaultValues: {
      phone: customer.phone,
    },
  });

  const { refetchCustomer } = useAccount();

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe();

  useEffect(() => {
    reset({
      phone: customer.phone,
    });
  }, [customer, reset]);

  const phone = useWatch({
    control,
    name: 'phone',
  });

  const updatePhone = (data: UpdateCustomerPhoneFormData) => {
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

  return (
    <form onSubmit={handleSubmit(updatePhone)} className="w-full">
      <div className="grid gap-y-1.5">
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input
          {...register('phone', {
            required: true,
          })}
          defaultValue={phone}
          id="phone"
        />
      </div>
    </form>
  );
};

export default ProfilePhone;
