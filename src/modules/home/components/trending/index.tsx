import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import repeat from '@lib/util/repeat';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Fire from '@modules/common/icons/fire';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { book } from '@static/book';
import Heading from '@ui/heading';

const Trending = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center gap-1 sm:gap-2">
        <Fire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading variant="heading">{book.trending}</Heading>
      </div>

      <Carousel
        prevActivateId="prev-trending-carousel-button"
        nextActivateId="next-trending-carousel-button"
        centeredSlides={true}
        centeredSlidesBounds={true}
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {data ? (
          data.map((product) => (
            <>
              <SwiperSlide key={`trending--key-${product.id}`}>
                <ProductPreview {...product} />
              </SwiperSlide>
            </>
          ))
        ) : (
          <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-4">
            {repeat(5).map((i) => (
              <li key={i}>
                <SkeletonProductPreview />
              </li>
            ))}
          </ul>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
