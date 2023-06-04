import { useAccount } from '@lib/context/account-context';
import useToggleState from '@lib/hooks/use-toggle-state';
import { billingAddressFormSchema } from '@lib/schemas/billing-address';
import { Customer } from '@medusajs/medusa';
import Security from '@modules/common/icons/security';
import AddBillingAddressModal from '@modules/modal/billing-addres/intex';
import { useUpdateMe } from 'medusa-react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

type MyInformationProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({ customer }) => {
  const { mutate: update, isLoading, isSuccess, isError } = useUpdateMe();
  const { state, open, close } = useToggleState(false);

  useEffect(() => {
    if (isSuccess) {
      close();
      toast.success('Thay đổi địa chỉ thành công!');
    }
    if (isError) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.');
    }
  }, [isSuccess, isError]);

  const { refetchCustomer } = useAccount();

  const updateBillingAddress = (
    data: z.infer<typeof billingAddressFormSchema>
  ) => {
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Security size={20} className="text-muted-foreground" />
        <span className="text-sm font-medium">Đổi địa chỉ thanh toán</span>
      </div>
      <AddBillingAddressModal
        onSubmit={updateBillingAddress}
        close={close}
        customer={customer}
        open={open}
        state={state}
        submitting={isLoading}
      />
    </div>
  );
};

export default ProfileBillingAddress;
// const currentInfo = useMemo(() => {
//   if (!customer.billing_address) {
//     return 'No billing address';
//   }

//   const country =
//     regionOptions?.find(
//       (country) => country.value === customer.billing_address.country_code
//     )?.label || customer.billing_address.country_code?.toUpperCase();

//   return (
//     <div className="flex flex-col font-semibold">
//       <span>
//         {customer.billing_address.first_name}{' '}
//         {customer.billing_address.last_name}
//       </span>
//       <span>{customer.billing_address.company}</span>
//       <span>
//         {customer.billing_address.address_1}
//         {customer.billing_address.address_2
//           ? `, ${customer.billing_address.address_2}`
//           : ''}
//       </span>
//       <span>
//         {customer.billing_address.postal_code},{' '}
//         {customer.billing_address.city}
//       </span>
//       <span>{country}</span>
//     </div>
//   );
// }, [customer, regionOptions]);
