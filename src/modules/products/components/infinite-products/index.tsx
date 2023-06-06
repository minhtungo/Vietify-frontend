import cn from '@lib/util/cn';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { defaultSort, sorting } from '@static/sort-options';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductPreviewType } from 'types/global';

type InfiniteProductsType = {
  products: ProductPreviewType[];
  isLoading: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
  pages?: any;
  fetchNextPage?: any;
  hasNextPage?: any;
};

const InfiniteProducts = ({
  products,
  isLoading,
  className,
  isFetchingNextPage,
  pages,
  fetchNextPage,
  hasNextPage,
}: InfiniteProductsType) => {
  const { inView } = useInView();

  const router = useRouter();
  const { sort } = router.query;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const [filteredProducts, setFilteredProducts] = useState<
    PricedProduct[] | ProductPreviewType[]
  >([]);

  const sortProducts = () => {
    let sortedProducts = [...products];

    sortKey === 'PRICE' &&
      sortedProducts.sort(
        (a, b) =>
          parseFloat(a.price?.calculated_price.replace('$', '')!) -
          parseFloat(b.price?.calculated_price.replace('$', '')!)
      );

    sortKey === 'CREATED_AT' &&
      sortedProducts.sort(
        (a, b) =>
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
      );

    reverse && sortedProducts.reverse();

    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    setFilteredProducts(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    sortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className={cn(className)}>
      <ul className="grid flex-1 grid-cols-2 gap-x-3 gap-y-4 small:grid-cols-3 medium:grid-cols-4">
        {filteredProducts?.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !filteredProducts?.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InfiniteProducts;
