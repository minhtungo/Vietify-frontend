import { fetchProductsList } from '@lib/data';
import usePreviews from '@lib/hooks/use-previews';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import { Product, StoreGetProductsParams } from '@medusajs/medusa';
import Button from '@ui/button';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { useCart } from 'medusa-react';
import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductPreview from '../product-preview';
import Heading from '@ui/heading';
import Carousel from '@modules/carousels/templates';
import { SwiperSlide } from 'swiper/react';

type RelatedProductsProps = {
  product: Product;
};

const RelatedProducts = ({ product }: RelatedProductsProps) => {
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
    <div className="product-page-constraint">
      <div className="mb-16 flex items-center justify-center">
        <Heading variant="heading">Related Books</Heading>
      </div>

      {previews && previews.length > 0 && (
        <Carousel
          spaceBetween={10}
          slidesPerView={5}
          prevActivateId="prev-related-carousel-button"
          nextActivateId="next-related-carousel-button"
          centeredSlides={true}
          centeredSlidesBounds={true}
          prevButtonClassName="left-2 lg:left-2.5"
          nextButtonClassName="right-2 lg:right-2.5"
        >
          {previews.map((product) => (
            <>
              <SwiperSlide key={`related--key-${product.id}`}>
                <ProductPreview {...product} />
              </SwiperSlide>
            </>
          ))}
        </Carousel>
      )}

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
      </ul>
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
