import LoginTemplate from '@modules/account/templates/login-template';
import Head from '@common/head';
import Layout from '@modules/layout/templates';
import { NextPageWithLayout } from 'types/global';
import Register from '@modules/account/components/register';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Create an account"
        description="Create an account with Vietify."
      />
      <Register />
    </>
  );
};

RegisterPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default RegisterPage;
