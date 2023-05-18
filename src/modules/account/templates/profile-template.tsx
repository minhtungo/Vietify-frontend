import { useAccount } from '@lib/context/account-context';
import ProfileEmail from '@modules/account/components/profile-email';
import ProfileName from '@modules/account/components/profile-name';
import ProfilePassword from '@modules/account/components/profile-password';
import ProfileBillingAddress from '../components/profile-billing-address';
import ProfilePhone from '../components/profile-phone';
import { Separator } from '@modules/ui/separator';

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, refetchCustomer } = useAccount();

  if (retrievingCustomer || !customer) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profile</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Separator className="my-1" />
        <ProfileEmail customer={customer} />
        <Separator className="my-1" />
        <ProfilePhone customer={customer} />
        <Separator className="my-1" />
        <ProfilePassword customer={customer} />
        <Separator className="my-1" />
        <ProfileBillingAddress customer={customer} />
      </div>
    </div>
  );
};

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />;
};

export default ProfileTemplate;
