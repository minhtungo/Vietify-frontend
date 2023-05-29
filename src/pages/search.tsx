import { searchProducts } from '@lib/data';
import repeat from '@lib/util/repeat';
import Layout from '@modules/layout/templates';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import Text from '@modules/ui/text';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/global';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { q: searchValue } = router.query;

  const { data, isError, isLoading } = useQuery(
    [`search_products`, searchValue],
    () => searchProducts(searchValue as string)
  );

  console.log(data);

  return (
    <div className="content-container pb-16 pt-6">
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

      <ul className="mt-4 grid flex-1 grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-3 medium:grid-cols-4">
        {data?.map((p) => (
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
