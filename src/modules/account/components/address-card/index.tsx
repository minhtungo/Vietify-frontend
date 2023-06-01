import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import { Address } from '@medusajs/medusa';
import Text from '@modules/ui/text';
import { Card, CardContent, CardFooter } from '@ui/card';
import { FC } from 'react';
import EditAddress from './edit-address-modal';
import RemoveAddress from './remove-address';

interface addressCardProps {
  address: Address;
  isActive?: boolean;
}

const AddressCard: FC<addressCardProps> = ({ address, isActive }) => {
  const { refetchCustomer } = useAccount();

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer();
    });
  };
  return (
    <Card>
      <CardContent className="flex flex-col gap-y-1 p-5 pb-3">
        <Text size="sm" variant="dark" span className="!font-semibold">
          {`${address.first_name} ${address.last_name}`}
        </Text>
        <Text
          size="sm"
          variant="dark"
          span
        >{`${address.address_1} ${address.address_2}`}</Text>
        <Text size="sm" variant="dark" span>
          {`${address.city}, ${address.province || ''} ${address.postal_code}`}
        </Text>
        <Text size="sm" variant="dark" span>{`${address.country || ''}`}</Text>
        <Text size="sm" variant="dark" span>{`${address.phone}`}</Text>
      </CardContent>
      <CardFooter className="gap-x-3 p-5 pt-0">
        <EditAddress address={address} />
        <RemoveAddress removeAddress={removeAddress} />
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
