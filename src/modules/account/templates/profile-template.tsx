import { useAccount } from '@lib/context/account-context';
import ProfileInfo from '@modules/account/components/profile-info';
import ProfilePassword from '@modules/account/components/profile-password';
import Heading from '@modules/ui/heading';

const ProfileTemplate = () => {
  const { customer, retrievingCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-y-1">
        <Heading>Thông tin tài khoản</Heading>
      </div>

      <ProfileInfo customer={customer} />
    </div>
  );
};

export default ProfileTemplate;
