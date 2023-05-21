import { fetchProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { StoreGetProductsParams } from '@medusajs/medusa';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { useInfiniteQuery } from '@tanstack/react-query';
import Button from '@ui/button';
import { useCart } from 'medusa-react';
import { useMemo } from 'react';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { book } from '@static/book';
import Heading from '@ui/heading';
import ProductCarousel from '../product-carousel';
import cn from '@lib/util/cn';

type RelatedProductsProps = {
  product: PricedProduct;
  className?: string;
};

const RelatedProducts = ({ product, className }: RelatedProductsProps) => {
  const { cart } = useCart();

  const queryParams: StoreGetProductsParams = useMemo(() => {
    const params: StoreGetProductsParams = {};

    if (cart?.id) {
      params.cart_id = cart.id;
    }

    if (product.collection_id) {
      params.collection_id = [product.collection_id];
    }

    if (product.tags) {
      params.tags = product.tags.map((t) => t.value);
    }

    params.is_giftcard = false;

    return params;
  }, [product, cart?.id]);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-${product.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const previews = usePreviews({ pages: data?.pages, region: cart?.region });

  return (
    <div className={cn('product-page-constraint', className)}>
      <div className="mb-8 flex items-center justify-center">
        <Heading size="md">{book.relatedBooks}</Heading>
      </div>

      {previews && previews.length > 0 && (
        <ProductCarousel
          products={previews}
          isLoading={isLoading && !previews.length}
          prevActivateId={`prev-related-products-button`}
          nextActivateId={`next-related-products-button`}
        />
      )}
      {/* 
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-3 medium:grid-cols-5">
        {isLoading && !previews.length && (
          <>
            {Array.from(Array(5).keys()).map((i) => (
              <li key={i}>
                <SkeletonProductPreview />
              </li>
            ))}
          </>
        )}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul> */}
      {hasNextPage && (
        <div className="mt-8 flex items-center justify-center">
          <Button
            isLoading={isLoading}
            onClick={() => fetchNextPage()}
            className="w-72"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
