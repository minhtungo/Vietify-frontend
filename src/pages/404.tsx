import Head from '@common/head';
import EmptyState from '@modules/common/components/empty-state';
import Layout from '@modules/layout/templates';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const NotFound: NextPageWithLayout = () => {
  return (
    <>
      <Head title="404" description="Something went wrong" />
      <main>
        <EmptyState
          title="Trang không tìm thấy"
          subtitle="Không thể tìm thấy trang bạn yêu cầu."
          showButton
        />
      </main>
    </>
  );
};

NotFound.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default NotFound;
