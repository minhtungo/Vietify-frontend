import { fetchProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import { StoreGetProductsParams } from '@medusajs/medusa';
import { useInfiniteQuery } from '@tanstack/react-query';
import Button from '@ui/button';
import { useCart } from 'medusa-react';
import { useMemo } from 'react';

import cn from '@lib/util/cn';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { book } from '@static/book';
import Heading from '@ui/heading';
import ProductCarousel from '../product-carousel';

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
      [`related-products-${product.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const previews = usePreviews({ pages: data?.pages, region: cart?.region });

  return (
    <div className={cn('product-page-constraint', className)}>
      <div className="mb-5 flex items-center justify-center md:mb-8">
        <Heading size="lg">{book.relatedBooks}</Heading>
      </div>

      {previews && previews.length > 0 && (
        <ProductCarousel
          products={previews}
          isLoading={isLoading || isFetchingNextPage}
          prevActivateId="prev-related-products-button"
          nextActivateId="next-related-products-button"
        />
      )}
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
