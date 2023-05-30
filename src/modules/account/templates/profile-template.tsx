import { useAccount } from '@lib/context/account-context';
import ProfileEmail from '@modules/account/components/profile-email';
import ProfileName from '@modules/account/components/profile-name';
import ProfilePassword from '@modules/account/components/profile-password';
import ProfileBillingAddress from '../components/profile-billing-address';
import ProfilePhone from '../components/profile-phone';
import { Separator } from '@modules/ui/separator';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import Button from '@modules/ui/button';

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
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        <Button
          // isLoading={isLoading}
          className="ml-auto "
          type="submit"
        >
          Lưu thay đổi
        </Button>
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
