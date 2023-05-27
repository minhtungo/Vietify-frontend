import Head from '@common/head';
import { medusaClient } from '@lib/config';
import Layout from '@modules/layout/templates';
import ProductTemplate from '@modules/products/templates';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';
import { NextPageWithLayout, PrefetchedPageProps } from 'types/global';
import { useProductCategories, useProducts } from 'medusa-react';
import { ProductCategory } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ProductPreview from '@modules/products/components/product-preview';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';

interface Params extends ParsedUrlQuery {
  handle: string;
}

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0]);
};

const CategoryPage: NextPageWithLayout<PrefetchedPageProps> = ({
  notFound,
}) => {
  const { query } = useRouter();
  const handle = typeof query.handle === 'string' ? query.handle : '';
  const { product_categories: categories } = useProductCategories({ handle });
  const categoryId =
    categories && categories.length > 0 ? categories[0].id : null;

  const { products, isLoading } = useProducts({
    category_id: categoryId ? [categoryId] : [],
  });

  return (
    <>
      <Head description={handle} title={handle} />
      <div className="content-container py-6">
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
      </div>
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
//   const handle = context.params?.handle as string;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery([`get_product`, handle], () =>
//     fetchProduct(handle)
//   );

//   const queryData = await queryClient.getQueryData([`get_product`, handle]);

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
