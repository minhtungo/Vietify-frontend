import Head from '@common/head';
import { fetchCategoryProducts } from '@lib/data';
import useQueryParams from '@lib/hooks/use-query-params';
import { getProductHandles } from '@lib/util/get-product-handles';
import { StoreGetProductsParams } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Layout from '@modules/layout/templates';
import ProductPreview from '@modules/products/components/product-preview';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import { defaultSort, sorting } from '@static/sort-options';
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCart, useProductCategories, useProducts } from 'medusa-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout, PrefetchedPageProps } from 'types/global';
import RefinementList from '@modules/store/components/refinement-list';
import InfiniteProducts from '@modules/products/components/infinite-products';
import usePreviews from '@lib/hooks/use-previews';
import Container from '@modules/layout/components/container';

interface Params extends ParsedUrlQuery {
  handle: string;
}

const CategoryPage: NextPageWithLayout<PrefetchedPageProps> = ({
  notFound,
}) => {
  const [params, setParams] = useState<StoreGetProductsParams>({});
  const { cart } = useCart();

  const { query } = useRouter();
  const handle = typeof query.handle === 'string' ? query.handle : '';

  const { sort } = query;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const queryParams = useQueryParams(params);

  const { product_categories: categories } = useProductCategories({ handle });
  const categoryId =
    categories && categories.length > 0 ? categories[0].id : null;

  // const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
  //   useInfiniteQuery(
  //     [`fetch-category-products`, queryParams, cart],
  //     ({ pageParam }) =>
  //       fetchCategoryProducts({ pageParam, queryParams, sortKey, reverse }),
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextPage,
  //     }
  //   );

  // const products = usePreviews({
  //   pages: data?.pages,
  //   region: cart?.region,
  // });

  const { products, isLoading } = useProducts({
    category_id: categoryId ? [categoryId] : [],
  });

  return (
    // <>
    //   <Head title="Shop" description="Explore all of our products." />
    //   <RefinementList refinementList={params} setRefinementList={setParams}>
    //     <InfiniteProducts
    //       products={products}
    //       isLoading={isLoading}
    //       isFetchingNextPage={isFetchingNextPage}
    //       pages={data?.pages}
    //       fetchNextPage={fetchNextPage}
    //       hasNextPage={hasNextPage}
    //     />
    //   </RefinementList>
    // </>
    <>
      <Head description={handle} title={handle} />
      <Container>
        {categories && <Heading size="md">{categories[0]?.name}</Heading>}
        {products && !products.length && (
          <Text span>Không tìm thấy sản phẩm nào.</Text>
        )}
        {products && products.length > 0 && (
          <ul className="mt-4 grid flex-1 grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
            {products.map((product: PricedProduct) => (
              <li key={product.id}>
                <ProductPreview
                  id={product.id!}
                  handle={product.handle!}
                  thumbnail={product.thumbnail!}
                  title={product.title!}
                  key={product.id!}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

CategoryPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const handles = await getProductHandles();
//   return {
//     paths: handles.map((handle) => ({ params: { handle } })),
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const queryClient = new QueryClient();
//   const handle = context.params?.handle as string;

//   await queryClient.prefetchQuery([`get_category_products`, handle], () =>
//     fetchCategoryProducts({ handle })
//   );

//   const queryData = await queryClient.getQueryData([
//     `get_category_products`,
//     handle,
//   ]);

//   if (!queryData) {
//     return {
//       props: {
//         notFound: true,
//       },
//     };
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       notFound: false,
//     },
//   };
// };

export default CategoryPage;
