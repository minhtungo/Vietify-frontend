import Head from '@common/head';
import Register from '@modules/account/components/register';
import AuthenticationLayout from '@modules/account/templates/authentication-layout';
import { NextPageWithLayout } from 'types/global';

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
  return <AuthenticationLayout>{page}</AuthenticationLayout>;
};

export default RegisterPage;
