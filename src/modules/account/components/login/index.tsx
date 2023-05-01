import { medusaClient } from '@lib/config';
import { LOGIN_VIEW, useAccount } from '@lib/context/account-context';
import Button from '@ui//button';
import Input from '@common/form-input';
import Spinner from '@icons/spinner';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Heading from '@modules/ui/heading';
import Google from '@icons/google';
import { Separator } from '@ui/separator';
import Facebook from '@icons/facebook';

interface SignInCredentials extends FieldValues {
  email: string;
  password: string;
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount();
  const [_, setCurrentView] = loginView;
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleError = (_e: Error) => {
    setAuthError('Invalid email or password');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>();

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer();
        router.push('/account');
      })
      .catch(handleError);
  });

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Heading variant="large" className="mb-6">
        Welcome back
      </Heading>

      <div className="mb-6 flex w-full justify-between">
        <Button variant="outline">
          <Google className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button variant="outline">
          <Facebook className="mr-2 h-4 w-4" />
          Continue with Facebook
        </Button>
      </div>

      <div className="mb-6 flex h-5 w-full max-w-[420px] items-center justify-center space-x-4">
        <div className="h-[1px] border-t border-blue-400 bg-blue-500" />
        <span>or</span>
        <div className="h-[1px] bg-blue-500" />
      </div>

      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            {...register('email', { required: 'Email is required' })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Password"
            {...register('password', { required: 'Password is required' })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div className="text-small-regular w-full text-destructive">
            These credentials do not match our records
          </div>
        )}
        <Button className="mt-6 w-full">Sign In</Button>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
