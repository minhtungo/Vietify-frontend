import { zodResolver } from '@hookform/resolvers/zod';
import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import useEditAddress from '@lib/hooks/use-edit-address';
import useToggleState from '@lib/hooks/use-toggle-state';
import { phoneRegex, postalCodeRegex } from '@lib/util/regex';
import { Address } from '@medusajs/medusa';
import ShippingAddressModal from '@modules/modal/shipping-address';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  city: z.string().min(2, 'Thành phố cần có ít nhất 2 kí tự.'),
  country_code: z.string().optional(),
  postal_code: z.string().regex(postalCodeRegex, 'Invalid Postal Code'),
  province: z.string().min(2, 'Province cần có ít nhất 2 kí tự.'),
  address_1: z.string().min(2),
  address_2: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Định dạng số điện thoại không hợp lệ.'),
  company: z.string().optional(),
});

type EditAddressProps = {
  address: Address;
};

const EditAddress: React.FC<EditAddressProps> = ({ address }) => {
  const { close, error, onEditAddress, open, state, submitting } =
    useEditAddress();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
  });

  return (
    <ShippingAddressModal
      onSubmit={(data) => onEditAddress(data, address)}
      state={state}
      close={close}
      error={error}
      open={open}
      submitting={submitting}
      form={form}
      isEdit
    />
  );
};

export default EditAddress;
