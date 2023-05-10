import Input from '@common/form-input';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { LOGIN_VIEW, useAccount } from '@lib/context/account-context';
import cn from '@lib/util/cn';
import Heading from '@modules/ui/heading';
import Text, { textVariants } from '@modules/ui/text';
import Button from '@ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface RegisterCredentials extends FieldValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount();
  const [_, setCurrentView] = loginView;
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleError = (e: Error) => {
    setAuthError('An error occured. Please try again.');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>();

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer();
        router.push('/account');
      })
      .catch(handleError);
  });

  return (
    <div className="flex max-w-sm flex-col items-center">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Heading variant="heading" className="mb-4">
        Tạo tài khoản
      </Heading>

      <form className="flex w-full flex-col" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Họ"
            {...register('last_name', { required: 'Last name is required' })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Tên"
            {...register('first_name', { required: 'First name is required' })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register('email', { required: 'Email is required' })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Mật khẩu"
            {...register('password', {
              required: 'Password is required',
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-small-regular w-full text-rose-500">
              Incorrect email or password.
            </span>
          </div>
        )}

        <Button className="mt-6 w-full">Tạo tài khoản</Button>
      </form>
      <Text variant="info" className="mt-6 text-center text-[11px]">
        Bằng việc đăng ký, bạn đã đồng ý với Vietify về{' '}
        <Link
          href="/terms-of-use"
          className={cn(
            textVariants({
              variant: 'link',
              className: '!text-[11px] underline',
            })
          )}
        >
          Điều khoản dịch vụ
        </Link>
        {' & '}
        <Link
          href="/privacy-policy"
          className={cn(
            textVariants({
              variant: 'link',
              className: '!text-[11px] underline',
            })
          )}
        >
          Chính sách bảo mật
        </Link>
      </Text>
      <Text variant="info" className="mt-3 text-center text-[11px]">
        Bạn đã là thành viên?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className={cn(
            textVariants({
              variant: 'link',
              className: '!text-[11px] underline',
            })
          )}
        >
          Đăng nhập
        </button>
      </Text>
    </div>
  );
};

export default Register;
