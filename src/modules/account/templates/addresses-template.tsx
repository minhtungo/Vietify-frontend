import { useAccount } from '@lib/context/account-context';
import Heading from '@modules/ui/heading';
import AddressBook from '../components/address-book';
import AddAddress from '../components/address-card/add-address';

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <Heading>Địa Chỉ Giao Hàng</Heading>
        <AddAddress />
      </div>

      <AddressBook customer={customer} />
    </div>
  );
};

export default AddressesTemplate;
