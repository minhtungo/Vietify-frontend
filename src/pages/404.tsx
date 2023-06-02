import Head from '@common/head';
import EmptyState from '@modules/common/components/empty-state';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const NotFound: NextPageWithLayout = () => {
  return (
    <>
      <Head title="404" description="Không thể tìm thấy trang bạn yêu cầu." />
      <div className="flex h-full w-full items-center justify-center py-24 lg:py-32">
        <EmptyState
          title="Trang không tìm thấy"
          subtitle="Không thể tìm thấy trang bạn yêu cầu."
          showButton
        />
      </div>
    </>
  );
};

NotFound.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default NotFound;
