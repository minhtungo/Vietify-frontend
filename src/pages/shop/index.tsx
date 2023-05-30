import Head from '@common/head';
import { StoreGetProductsParams } from '@medusajs/medusa';
import Layout from '@modules/layout/templates';

import InfiniteProducts from '@modules/products/components/infinite-products';
import RefinementList from '@modules/store/components/refinement-list';
import { defaultSort, sorting } from '@static/sort-options';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'types/global';

import { fetchProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCart } from 'medusa-react';

import useQueryParams from '@lib/hooks/use-query-params';

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({});
  const { cart } = useCart();

  const router = useRouter();
  const { sort } = router.query;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const queryParams = useQueryParams(params);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, queryParams, cart],
      ({ pageParam }) =>
        fetchProductsList({ pageParam, queryParams, sortKey, reverse }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = usePreviews({
    pages: data?.pages,
    region: cart?.region,
  });

  return (
    <>
      <Head title="Shop" description="Explore all of our products." />
      <RefinementList refinementList={params} setRefinementList={setParams}>
        <InfiniteProducts
          products={products}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          pages={data?.pages}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </RefinementList>
    </>
  );
};

Store.getLayout = (page) => <Layout>{page}</Layout>;

export default Store;
