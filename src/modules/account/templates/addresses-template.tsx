import { useAccount } from '@lib/context/account-context';
import Heading from '@modules/ui/heading';
import AddressBook from '../components/address-book';
import ProfileBillingAddress from '../components/profile-billing-address';

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <Heading className="mb-4">Địa Chỉ Giao Hàng</Heading>
      <AddressBook customer={customer} />
      <ProfileBillingAddress customer={customer} />
    </div>
  );
};

export default AddressesTemplate;
