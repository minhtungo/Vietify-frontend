import Head from '@common/head';
import SignUp from '@modules/account/components/signup';
import AuthenticationLayout from '@modules/account/templates/authentication-layout';
import { NextPageWithLayout } from 'types/global';

const SignUpPage: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Create an account"
        description="Create an account with Vietify."
      />
      <SignUp />
    </>
  );
};

SignUpPage.getLayout = (page) => {
  return <AuthenticationLayout>{page}</AuthenticationLayout>;
};

export default SignUpPage;
