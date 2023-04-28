import CartTemplate from '@modules/cart/templates';
import Head from '@modules/common/components/head';
import Heading from '@modules/ui/heading';
import FaqTemplate from '@modules/faq/templates';
import Layout from '@modules/layout/templates';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Faq: NextPageWithLayout = () => {
  return (
    <>
      <Head title="FAQ" description="Frequently asked questions" />
      <Heading className="pt-12 text-center">
        Frequently Asked Questions
      </Heading>
      <FaqTemplate />
    </>
  );
};

Faq.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Faq;
