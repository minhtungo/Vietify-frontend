import { useAccount } from '@lib/context/account-context';
import SignUp from '@modules/account/components/signup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from '../components/login';

const LoginTemplate = () => {
  const { loginView, customer, retrievingCustomer } = useAccount();
  const [currentView, _] = loginView;

  const router = useRouter();

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push('/account');
    }
  }, [customer, retrievingCustomer, router]);

  return (
    <div className="flex w-full justify-center py-16">
      {currentView === 'sign-in' ? <Login /> : <SignUp />}
    </div>
  );
};

export default LoginTemplate;
