import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';

import React, { useState } from 'react';

import useToggleState from '@lib/hooks/use-toggle-state';
import { shippingAddressSchema } from '@lib/schemas/shipping-address';
import ShippingAddressModal from '@modules/modal/shipping-address';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const AddAddress: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { state, open, close } = useToggleState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      last_name: '',
      first_name: '',
      address_1: '',
      address_2: '',
      phone: '',
      city: '',
      province: '',
      postal_code: '',
      country_code: '',
    },
  });

  const { refetchCustomer } = useAccount();

  const onAddAddress = async (data: z.infer<typeof shippingAddressSchema>) => {
    setSubmitting(true);
    setError(undefined);

    data.country_code = 'US';

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || '',
      address_1: data.address_1,
      address_2: data.address_2 || '',
      city: data.city,
      country_code: data.country_code,
      province: data.province || '',
      postal_code: data.postal_code,
      phone: data.phone || '',
      metadata: {},
    };

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false);
        refetchCustomer();
        // form.reset();
        close();
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error || 'Có lỗi xảy ra, vui lòng thử lại.');
      });
  };

  return (
    <ShippingAddressModal
      onSubmit={onAddAddress}
      state={state}
      close={close}
      error={error}
      open={open}
      submitting={submitting}
      form={form}
    />
  );
};

export default AddAddress;
