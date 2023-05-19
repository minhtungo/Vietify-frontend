import CountDown from '@common/countdown';
import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import repeat from '@lib/util/repeat';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Flash from '@modules/common/icons/flash';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { book } from '@static/book';
import Heading from '@ui/heading';

const Deals = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-5 flex gap-2 md:mb-8">
        <div className="flex items-center gap-1 sm:gap-2">
          <Flash className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
          <Heading variant="heading">{book.deals}</Heading>
        </div>
        <CountDown date={Date.now() + 100000000} />
      </div>

      <Carousel
        spaceBetween={10}
        slidesPerView={5}
        prevActivateId="prev-deals-carousel-button"
        nextActivateId="next-deals-carousel-button"
        centeredSlides={true}
        centeredSlidesBounds={true}
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {data ? (
          data.map((product) => (
            <SwiperSlide key={`deals--key-${product.id}`}>
              <ProductPreview {...product} />
            </SwiperSlide>
          ))
        ) : (
          <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-5">
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

export default Deals;
