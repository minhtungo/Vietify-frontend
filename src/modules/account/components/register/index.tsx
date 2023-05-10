import Input from '@common/form-input';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { LOGIN_VIEW, useAccount } from '@lib/context/account-context';
import cn from '@lib/util/cn';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@modules/ui/card';
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
    <>
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Card className={cn('max-w-sm')}>
        <CardHeader className="text-center">
          <CardTitle>Tạo tài khoản</CardTitle>
          {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
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
          </form>
          <Button className="mt-1 w-full">Tạo tài khoản</Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 text-center">
          <Text variant="info" className="text-[11px]">
            Bằng việc đăng ký, bạn đã đồng ý với Vietify về{' '}
            <Link href="/terms-of-use" className="text-brand hover:underline">
              Điều khoản dịch vụ
            </Link>
            {' & '}
            <Link href="/privacy-policy" className="text-brand hover:underline">
              Chính sách bảo mật
            </Link>
          </Text>
          <Text variant="info" className="text-[13px]">
            Bạn đã là thành viên?{' '}
            <Link href="/login" className="text-brand hover:underline">
              Đăng nhập
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </>
  );
};

export default Register;
