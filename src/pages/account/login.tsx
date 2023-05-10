import LoginTemplate from '@modules/account/templates/login-template';
import Head from '@common/head';
import Layout from '@modules/layout/templates';
import { NextPageWithLayout } from 'types/global';
import Login from '@modules/account/components/login';

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Sign in" description="Sign in to your Vietify account." />
      <Login />
    </>
  );
};

LoginPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
