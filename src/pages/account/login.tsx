import Head from '@common/head';
import Login from '@modules/account/components/login';
import AuthenticationLayout from '@modules/account/templates/authentication-layout';
import { NextPageWithLayout } from 'types/global';

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Sign in" description="Sign in to your Vietify account." />
      <Login />
    </>
  );
};

LoginPage.getLayout = (page) => {
  return <AuthenticationLayout>{page}</AuthenticationLayout>;
};

export default LoginPage;
