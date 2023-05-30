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

type UpdateCustomerEmailFormData = {
  email: string;
};

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerEmailFormData>({
    defaultValues: {
      email: customer.email,
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
      email: customer.email,
    });
  }, [customer, reset]);

  const email = useWatch({
    control,
    name: 'email',
  });

  const updateEmail = (data: UpdateCustomerEmailFormData) => {
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
          setErrorMessage('Email already in use');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(updateEmail)} className="w-full">
      <div className="grid gap-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email', {
            required: true,
          })}
          defaultValue={email}
          id="email"
        />
      </div>
      {/* <Button
          isLoading={isLoading}
          className="ml-auto mt-2 w-full small:max-w-[140px]"
          type="submit"
        >
          Save changes
        </Button> */}
    </form>
  );
};

export default ProfileEmail;
