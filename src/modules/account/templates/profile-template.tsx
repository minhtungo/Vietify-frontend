import { useAccount } from '@lib/context/account-context';
import ProfileInfo from '@modules/account/components/profile-info';
import ProfilePassword from '@modules/account/components/profile-password';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import ProfileBillingAddress from '../components/profile-billing-address';

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, refetchCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-1">
        <Heading>Thông tin tài khoản</Heading>
        <Text size="sm">
          Xem và cập nhật thông tin hồ sơ của bạn, bao gồm tên, email và số điện
          thoại. Bạn cũng có thể cập nhật địa chỉ thanh toán hoặc thay đổi mật
          khẩu của mình.
        </Text>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <ProfileInfo customer={customer} />
        <ProfilePassword customer={customer} />
        <ProfileBillingAddress customer={customer} />
      </div>
    </div>
  );
};

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />;
};

export default ProfileTemplate;
