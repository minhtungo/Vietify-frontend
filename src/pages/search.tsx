import { searchProducts } from '@lib/data';
import useGetProducts from '@lib/hooks/use-get-products';
import repeat from '@lib/util/repeat';
import Sorting from '@modules/common/icons/sorting';
import Layout from '@modules/layout/templates';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import SortingList from '@modules/store/components/sorting-list';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { SortFilterItem, defaultSort, sorting } from '@static/sort-options';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { q: searchValue } = router.query;
  const { sort } = router.query;
  const {
    sortKey,
    title: initialOption,
    reverse,
  } = sorting.find((item: SortFilterItem) => item.slug === sort) || defaultSort;

  console.log(searchValue);

  const { data, isError, isLoading } = useQuery(
    [`search_products`, searchValue],
    () => searchProducts(searchValue as string)
  );

  const { products } = useGetProducts({
    query: searchValue as string,
    sortKey: sort as string,
  });

  console.log(products);

  return (
    <div className="content-container pb-16 pt-6">
      <div className="flex items-baseline justify-between">
        {data?.length === 0 ? (
          <Text variant="dark" size="sm">
            Không có sản phẩm phù hợp với từ khóa tìm kiếm của bạn
          </Text>
        ) : (
          <Text variant="dark" size="sm">
            {`Có ${data?.length} kết quả tìm kiếm cho: `}
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

      <ul className="mt-4 grid flex-1 grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {products?.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !data?.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Search;
