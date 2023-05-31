import { useAccount } from '@lib/context/account-context';
import AddressBook from '../components/address-book';
import Heading from '@modules/ui/heading';
import AddAddress from '../components/address-card/add-address';
import Text from '@modules/ui/text';

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <Heading>Địa Chỉ Giao Hàng</Heading>
          <AddAddress />
        </div>
        <Text size="sm">
          Xem và cập nhật địa chỉ giao hàng của bạn, bạn có thể thêm bao nhiêu
          tùy thích. Lưu địa chỉ của bạn sẽ làm cho chúng có sẵn trong quá trình
          thanh toán.
        </Text>
      </div>
      <AddressBook customer={customer} />
    </div>
  );
};

export default AddressesTemplate;
