import { useCheckout } from '@lib/context/checkout-context';
import { Address } from '@medusajs/medusa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/ui/select';
import { isEqual, omit } from 'lodash';
import { useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

type AddressSelectProps = {
  addresses: Address[];
};

const AddressSelect = ({ addresses }: AddressSelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const { control, setSavedAddress } = useCheckout();

  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id);

    if (savedAddress) {
      setSavedAddress(savedAddress);
    }

    setSelected(id);
  };

  const currentShippingAddress = useWatch({
    control,
    name: 'shipping_address',
  });

  const selectedAddress = useMemo(() => {
    for (const address of addresses) {
      const checkEquality = isEqual(
        omit(address, [
          'id',
          'created_at',
          'updated_at',
          'country',
          'deleted_at',
          'metadata',
          'customer_id',
        ]),
        currentShippingAddress
      );

      if (checkEquality) {
        return address;
      }
    }
  }, [currentShippingAddress, addresses]);

  return (
    <Select
      defaultValue={selected}
      value={selected}
      onValueChange={handleSelect}
    >
      <SelectTrigger className="w-full bg-background">
        <SelectValue
          placeholder={
            selectedAddress ? selectedAddress.address_1 : 'Choose an address'
          }
        />
      </SelectTrigger>
      <SelectContent>
        {addresses.map((address) => (
          <SelectItem value={address.id} key={address.id}>
            {`${address.first_name} ${address.last_name} | ${
              address.address_1
            } ${address.address_2} ${address.city}, ${address.province || ''} ${
              address.postal_code
            } ${address.city}, ${address.province || ''} ${
              address.postal_code
            } ${address.country || ''} | ${address.phone}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AddressSelect;
