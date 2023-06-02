import { zodResolver } from '@hookform/resolvers/zod';
import Facebook from '@icons/facebook';
import Google from '@icons/google';
import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import cn from '@lib/util/cn';
import Link from '@modules/common/components/link';
import Loader from '@modules/common/components/loader';
import { Checkbox } from '@modules/ui/checkbox';
import { Input } from '@modules/ui/input';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';
import Button, { buttonVariants } from '@ui//button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'Định dạng email không hợp lệ.',
  }),
  password: z.string().min(8),
});

const Login = () => {
  const { refetchCustomer } = useAccount();
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleError = (_e: Error) => {
    setAuthError('Email hoặc mật khẩu không đúng.');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (credentials: z.infer<typeof formSchema>) => {
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer();
        router.push('/account');
      })
      .catch(handleError);
  };

  return (
    <>
      <Loader open={form.formState.isSubmitting} />
      <Card className="w-full border-none shadow-none md:max-w-md md:border md:border-accent md:shadow-sm">
        <CardHeader className="py-8 pb-5 text-center md:pb-6">
          <CardTitle className="text-xl">Chào mừng đến với Vietify!</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mật khẩu"
                        {...field}
                        required
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                  <Text
                    size="xs"
                    span
                    className="!text-primary hover:underline"
                  >
                    Quên mật khẩu?
                  </Text>
                </Link>
              </div>
              <Button
                className="mt-2 w-full"
                isLoading={form.formState.isSubmitting}
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <div className="flex items-center">
            <div className="h-[0.5px] flex-grow bg-border" />
            <Text size="xs" className="mx-3">
              hoặc tiếp tục với
            </Text>
            <div className="h-[0.5px] flex-grow bg-border" />
          </div>
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:gap-3">
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

        <CardFooter className="flex flex-col gap-3 pt-3 text-center sm:pt-0">
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
    </>
  );
};

export default Login;
