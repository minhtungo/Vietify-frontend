import AccountLayout from '@modules/account/templates/account-layout';
import ProfileTemplate from '@modules/account/templates/profile-template';
import Head from '@common/head';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Thông tin tài khoản"
        description="Xem và chỉnh sửa thông tin tài khoản."
      />
      <ProfileTemplate />
    </>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};

export default Profile;
