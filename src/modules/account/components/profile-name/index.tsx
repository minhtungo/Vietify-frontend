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

type UpdateCustomerNameFormData = {
  first_name: string;
  last_name: string;
};

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerNameFormData>({
    defaultValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
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
      first_name: customer.first_name,
      last_name: customer.last_name,
    });
  }, [customer, reset]);

  const firstName = useWatch({
    control,
    name: 'first_name',
  });
  const lastName = useWatch({
    control,
    name: 'last_name',
  });

  const updateName = (data: UpdateCustomerNameFormData) => {
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
    <form onSubmit={handleSubmit(updateName)} className="w-full">
      <div className="grid grid-cols-2 gap-x-4">
        <div className="grid gap-y-1.5">
          <Label htmlFor="firstName">Tên</Label>
          <Input
            {...register('first_name', {
              required: true,
            })}
            defaultValue={firstName}
            id="firstName"
          />
        </div>
        <div className="grid gap-y-1.5">
          <Label htmlFor="lastName">Họ</Label>
          <Input
            {...register('last_name', {
              required: true,
            })}
            defaultValue={lastName}
            id="lastName"
          />
        </div>
        {/* <Button
          isLoading={isLoading}
          className="ml-auto mt-2 w-full small:max-w-[140px]"
          type="submit"
        >
          Save changes
        </Button> */}
      </div>
    </form>
  );
};

export default ProfileName;
