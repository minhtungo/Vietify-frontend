import Input from '@common/form-input';
import Facebook from '@icons/facebook';
import Google from '@icons/google';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { LOGIN_VIEW, useAccount } from '@lib/context/account-context';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import Button from '@ui//button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

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
    <div className="flex w-full max-w-md flex-col">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Heading variant="large" className="mb-6 text-center">
        Welcome back
      </Heading>

      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-3.5">
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

      <div className="my-6 flex items-center">
        <div className="h-[0.5px] flex-grow bg-border" />
        <Text className="text-md mx-3">OR</Text>
        <div className="h-[0.5px] flex-grow bg-border" />
      </div>

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

      <Text
        variant="info"
        size="sm"
        className="!text-small-regular mt-6 text-center "
      >
        {'Don’t have an account? '}
        <Button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          variant="link"
          className="!text-small-regular font-medium"
        >
          Create Account
        </Button>
      </Text>
    </div>
  );
};

export default Login;
