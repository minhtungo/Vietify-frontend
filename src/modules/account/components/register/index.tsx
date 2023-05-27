import Input from '@common/form-input';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@modules/ui/card';
import Text from '@modules/ui/text';
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
    <div className="content-container flex justify-center py-12">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Card className="max-w-sm">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="text-xl">Đăng ký</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input
              label="Họ"
              {...register('last_name', {
                required: 'Last name is required',
              })}
              autoComplete="family-name"
              errors={errors}
            />
            <Input
              label="Tên"
              {...register('first_name', {
                required: 'First name is required',
              })}
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

            {authError && (
              <div>
                <span className="text-small-regular w-full text-rose-500">
                  Incorrect email or password.
                </span>
              </div>
            )}
            <Button className="mt-2 w-full">Tạo tài khoản</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 text-center">
          <Text size="xs">
            Bằng việc đăng ký, bạn đã đồng ý với Vietify về{' '}
            <Link href="/terms-of-use" className="text-primary hover:underline">
              Điều khoản dịch vụ
            </Link>
            {' & '}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              Chính sách bảo mật
            </Link>
          </Text>
          <Text size="xs">
            Bạn đã có tài khoản?{' '}
            <Link
              href="/account/login"
              className="text-primary hover:underline"
            >
              Đăng nhập
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
