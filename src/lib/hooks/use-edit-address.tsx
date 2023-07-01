import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import useToggleState from '@lib/hooks/use-toggle-state';
import { shippingAddressSchema } from '@lib/schemas/shipping-address';
import { Address } from '@medusajs/medusa';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

const useEditAddress = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { state, open, close } = useToggleState(false);

  const { refetchCustomer } = useAccount();

  const onEditAddress = async (
    data: z.infer<typeof shippingAddressSchema>,
    address: Address
  ) => {
    setSubmitting(true);
    setError(undefined);

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || 'Personal',
      address_1: data.address_1,
      address_2: data.address_2 || '',
      city: data.city,
      country_code: data.country_code,
      province: data.province || '',
      postal_code: data.postal_code,
      phone: data.phone || 'None',
      metadata: {},
    };

    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false);
        close();
        toast.success('Thay đổi địa chỉ thành công!');
        refetchCustomer();
      })
      .catch(() => {
        setSubmitting(false);
        setError('Lỗi thay đổi địa chỉ, vui lòng thử lại sau.');
      });
  };

  return {
    state,
    open,
    close,
    submitting,
    error,
    onEditAddress,
  };
};
export default useEditAddress;
