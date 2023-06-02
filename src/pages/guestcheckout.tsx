import Head from '@common/head';
import CheckoutNav from '@modules/checkout/templates/checkout-nav';
import Footer from '@modules/layout/templates/footer';
import Button from '@modules/ui/button';
import Heading from '@modules/ui/heading';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@modules/ui/input';

const formSchema = z.object({
  email: z.string().email({
    message: 'Định dạng email không hợp lệ.',
  }),
});

const Checkout = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = () => {};

  return (
    <>
      <Head title="Tiến hành thanh toán" />
      <CheckoutNav />
      <main className="flex h-full w-full flex-col items-center justify-center md:h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center gap-4">
          <Heading>Thanh Toán Bằng Tài Khoản Vietify</Heading>
          <Text size="md">
            Đăng nhập để thanh toán nhanh hơn và quản lý các đơn hàng của bạn.
          </Text>
          <Button className="w-fit px-6">Đăng nhập</Button>
          <Text size="md">
            Bạn chưa có tài khoản?{' '}
            <Link
              className="text-primary hover:underline"
              href="/account/register"
            >
              Tạo tài khoản
            </Link>
          </Text>
          <Separator className="mb-6 mt-2" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Heading>Guest Checkout</Heading>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="min-w-[300px]"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-fit px-6">Tiếp tục</Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
