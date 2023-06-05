import Head from '@common/head';
import useGetProducts from '@lib/hooks/use-get-products';
import Layout from '@modules/layout/templates';
import { SortFilterItem, defaultSort, sorting } from '@static/sort-options';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

import repeat from '@lib/util/repeat';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import SortingList from '@modules/store/components/sorting-list';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { useCart } from 'medusa-react';
import Container from '@modules/layout/components/container';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { q: searchValue } = router.query;
  const { sort } = router.query;

  const { cart } = useCart();
  const {
    sortKey,
    title: initialOption,
    reverse,
  } = sorting.find((item: SortFilterItem) => item.slug === sort) || defaultSort;

  const { products, isLoading } = useGetProducts({
    query: searchValue as string,
    sortKey: sort as string,
  });

  return (
    <>
      <Head
        title={`Kết quả tìm kiếm với: ${searchValue}`}
        description="Trang tìm kiếm."
      />
      <Container>
        <div className="flex items-baseline justify-between">
          {products?.length === 0 ? (
            <Text variant="dark" size="sm">
              Không có sản phẩm phù hợp với từ khóa tìm kiếm của bạn
            </Text>
          ) : (
            <Text variant="dark" size="sm">
              {`Có ${products?.length} kết quả tìm kiếm cho: `}
              <Text variant="dark" size="sm" className="font-semibold" span>
                {searchValue}
              </Text>
            </Text>
          )}
          <SortingList list={sorting} />
          {/* Mobile filter dialog */}
          {/* <MobileFilter>
          <CategoriesFilter
            handleCategoryChange={handleCategoryChange}
            refinementList={refinementList}
          />
          <PriceFilter defaultValue={[0, 100]} />
        </MobileFilter> */}
        </div>
        <Separator className="mb-4 mt-3" />

        <ul className="mt-4 grid flex-1 grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
          {products?.map((p) => (
            <li key={p.id}>
              <ProductPreview {...p} />
            </li>
          ))}
          {isLoading &&
            !products?.length &&
            repeat(8).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))}
        </ul>
      </Container>
      {/* <RefinementList refinementList={params} setRefinementList={setParams}>
        <InfiniteProducts products={products} isLoading={isLoading} />
      </RefinementList> */}
    </>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Search;
// const [params, setParams] = useState<StoreGetProductsParams>({});
// const queryParams = useMemo(() => {
//   const p: StoreGetProductsParams = {};

//   if (cart?.id) {
//     p.cart_id = cart.id;
//   }

//   p.is_giftcard = false;

//   return {
//     ...p,
//     ...params,
//   };
// }, [cart?.id, params]);

// const { data, isError, isLoading } = useQuery(
//   [`search_products`, searchValue],
//   () => searchProducts(searchValue as string)
// );
