import Head from '@common/head';
import { medusaClient } from '@lib/config';
import { IS_BROWSER } from '@lib/constants';
import { fetchProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import useQueryParams from '@lib/hooks/use-query-params';
import { getCategoryHandles } from '@lib/util/get-category-handles';
import { StoreGetProductsParams } from '@medusajs/medusa';
import Layout from '@modules/layout/templates';
import InfiniteProducts from '@modules/products/components/infinite-products';
import SkeletonCollectionPage from '@modules/skeletons/templates/skeleton-collection-page';
import RefinementList from '@modules/store/components/refinement-list';
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCart, useProductCategories } from 'medusa-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout, PrefetchedPageProps } from 'types/global';

interface Params extends ParsedUrlQuery {
  handle: string;
}

const fetchCategoryIdsProducts = async (
  categoryIds: string[],
  pageParam = 0
) => {
  const { products, count, offset } = await medusaClient.products.list({
    category_id: categoryIds,
    limit: 12,
    offset: pageParam,
  });

  return {
    response: { products, count },
    nextPage: count > offset + 12 ? offset + 12 : null,
  };
};

const CategoryPage: NextPageWithLayout<PrefetchedPageProps> = ({
  notFound,
}) => {
  const [params, setParams] = useState<StoreGetProductsParams>({});
  const queryParams = useQueryParams(params);

  const { cart } = useCart();

  const { query, replace } = useRouter();
  const handle = typeof query.handle === 'string' ? query.handle : '';

  const { product_categories: categories } = useProductCategories({ handle });

  const categoryIds = categories?.map((c) => c.id);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [`fetch-category-products`, handle],
    ({ pageParam }) =>
      fetchProductsList({ pageParam, queryParams, categoryIds }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const products = usePreviews({
    pages: data?.pages,
    region: cart?.region,
  });

  if (notFound) {
    if (IS_BROWSER) {
      replace('/404');
    }

    return <SkeletonCollectionPage />;
  }

  if (isError) {
    replace('/404');
  }

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

CategoryPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const handles = await getCategoryHandles();
  return {
    paths: handles.map((handle) => ({ params: { handle } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  const handle = context.params?.handle as string;

  const categoryIds = await medusaClient.productCategories
    .list({
      handle,
    })
    .then(({ product_categories }) => product_categories.map((c) => c.id));

  await queryClient.prefetchInfiniteQuery(
    ['fetch-category-products', handle],
    ({ pageParam }) => fetchCategoryIdsProducts(categoryIds, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const queryData = await queryClient.getQueryData([
    `fetch-category-products`,
    handle,
  ]);

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      notFound: false,
    },
  };
};
