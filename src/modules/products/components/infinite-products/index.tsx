import cn from '@lib/util/cn';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductPreviewType } from 'types/global';

type InfiniteProductsType = {
  products: ProductPreviewType[] | PricedProduct[];
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <div className={cn(className)}>
      <ul className="grid flex-1 grid-cols-2 gap-x-3 gap-y-4 small:grid-cols-3 medium:grid-cols-4">
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
