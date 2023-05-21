import { useAccount } from '@lib/context/account-context';
import AddressBook from '../components/address-book';
import Heading from '@modules/ui/heading';

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <Heading size="md">Shipping Addresses</Heading>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  );
};

export default AddressesTemplate;
