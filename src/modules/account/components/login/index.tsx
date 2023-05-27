import Input from '@common/form-input';
import Facebook from '@icons/facebook';
import Google from '@icons/google';
import Spinner from '@icons/spinner';
import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import cn from '@lib/util/cn';
import Link from '@modules/common/components/link';
import { Checkbox } from '@modules/ui/checkbox';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';
import Button, { buttonVariants } from '@ui//button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
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
    <div className="flex w-full justify-center py-12">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
          <Spinner size={24} />
        </div>
      )}
      <Card className="max-w-sm">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="!text-xl">Chào mừng đến với Vietify!</CardTitle>
          {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
        </CardHeader>

        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit} className="grid gap-3">
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
            {authError && (
              <Text variant="error" size="sm">
                Incorrect email or password.
              </Text>
            )}
            <div className="mt-1 flex justify-between">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="remember-password"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Checkbox id="remember-password" />
                  <Text size="xs" span>
                    Nhớ mật khẩu
                  </Text>
                </Label>
              </div>
              <Link href="/terms-of-use">
                <Text size="xs" span className="!text-primary hover:underline">
                  Quên mật khẩu?
                </Text>
              </Link>
            </div>
            <Button className="mt-2 w-full">Đăng nhập</Button>
          </form>

          <div className="flex items-center">
            <div className="h-[0.5px] flex-grow bg-border" />
            <Text size="xs" className="mx-3">
              hoặc tiếp tục với
            </Text>
            <div className="h-[0.5px] flex-grow bg-border" />
          </div>
          <div className="flex w-full justify-between gap-3">
            <a
              href={`http://localhost:9000/store/auth/google`}
              type="button"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  className: 'w-full',
                })
              )}
            >
              <Google className="mr-2 h-4 w-4" />
              Google
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/facebook`}
              type="button"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  className: 'w-full',
                })
              )}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 text-center">
          <Text size="xs">
            Bằng việc đăng nhập, bạn đã đồng ý với Vietify về{' '}
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
            Thành viên mới?{' '}
            <Link
              href="/account/register"
              className="text-primary hover:underline"
            >
              Đăng kí
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
