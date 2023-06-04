import { zodResolver } from '@hookform/resolvers/zod';
import { medusaClient } from '@lib/config';
import { useAccount } from '@lib/context/account-context';
import { signupFormSchema } from '@lib/schemas/signup';
import Loader from '@modules/common/components/loader';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@modules/ui/card';
import { Input } from '@modules/ui/input';
import Text from '@modules/ui/text';
import Button from '@ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignUp = () => {
  const { refetchCustomer } = useAccount();
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleError = (e: Error) => {
    setAuthError('An error occured. Please try again.');
  };

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const credentials = {
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer();
        router.push('/account');
      })
      .catch(handleError);
  };

  return (
    <div>
      <Loader open={form.formState.isSubmitting} />
      <Card className="w-full border-none shadow-none md:max-w-md md:border md:border-accent md:shadow-sm">
        <CardHeader className="py-8 pb-5 text-center md:pb-6">
          <CardTitle className="text-xl">Đăng ký</CardTitle>
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
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                        required
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder="Họ" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {authError && (
                <Text size="sm" variant="error">
                  Incorrect email or password.
                </Text>
              )}
              <Button className="mt-2 w-full">Tạo tài khoản</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-3 text-center sm:pt-0">
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

export default SignUp;
