import Head from '@common/head';
import { StoreGetProductsParams } from '@medusajs/medusa';
import Layout from '@modules/layout/templates';

import InfiniteProducts from '@modules/products/components/infinite-products';
import RefinementList from '@modules/store/components/refinement-list';
import { defaultSort, sorting } from '@static/sort-options';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'types/global';

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({});

  const router = useRouter();
  const { sort } = router.query;

  const {
    sortKey,
    title: initialOption,
    reverse,
  } = sorting.find((item) => item.slug === sort) || defaultSort;

  return (
    <>
      <Head title="Shop" description="Explore all of our products." />
      <RefinementList refinementList={params} setRefinementList={setParams}>
        <InfiniteProducts params={params} />
      </RefinementList>
    </>
  );
};

Store.getLayout = (page) => <Layout>{page}</Layout>;

export default Store;
