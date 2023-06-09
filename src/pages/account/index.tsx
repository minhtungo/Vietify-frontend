import AccountLayout from '@modules/account/templates/account-layout';
import OverviewTemplate from '@modules/account/templates/overview-template';
import Head from '@common/head';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Account: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Tài khoản của tôi"
        description="Overview of your account activity."
      />
      <OverviewTemplate />
    </>
  );
};

Account.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};

export default Account;
