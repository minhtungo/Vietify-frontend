import { StoreGetProductsParams } from '@medusajs/medusa';
import Head from '@common/head';
import Layout from '@modules/layout/templates';

import RefinementList from '@modules/store/components/refinement-list';
import { useState } from 'react';
import { NextPageWithLayout } from 'types/global';
import InfiniteProducts from '@modules/products/components/infinite-products';

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({});

  return (
    <>
      <Head title="Shop" description="Explore all of our products." />
      <div className="py-6">
        <RefinementList refinementList={params} setRefinementList={setParams}>
          <InfiniteProducts params={params} />
        </RefinementList>
      </div>
    </>
  );
};

Store.getLayout = (page) => <Layout>{page}</Layout>;

export default Store;
