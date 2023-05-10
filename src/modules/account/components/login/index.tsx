import Input from '@common/form-input';
import Facebook from '@icons/facebook';
import Google from '@icons/google';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { LOGIN_VIEW, useAccount } from '@lib/context/account-context';
import cn from '@lib/util/cn';
import Heading from '@modules/ui/heading';
import Text, { textVariants } from '@modules/ui/text';
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
      <Heading variant="heading" className="mb-4 text-center">
        Chào mừng đến với Vietify!
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
            label="Mật khẩu"
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
        <Button className="mt-6 w-full">Đăng nhập</Button>
      </form>

      <div className="my-6 flex items-center">
        <div className="h-[0.5px] flex-grow bg-border" />
        <Text className="mx-3 text-[12px]">hoặc tiếp tục với</Text>
        <div className="h-[0.5px] flex-grow bg-border" />
      </div>

      <div className="flex w-full justify-between gap-3">
        <Button variant="outline" className="w-full">
          <Google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>

      <Text variant="info" className="mt-3 text-center text-[11px]">
        {'Thành viên mới? '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className={cn(
            textVariants({
              variant: 'link',
              className: '!text-[11px] underline',
            })
          )}
        >
          Đăng kí
        </button>
      </Text>
    </div>
  );
};

export default Login;
