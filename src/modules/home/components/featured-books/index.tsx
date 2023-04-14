import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@modules/common/components/heading';

const FeaturedBooks = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="py-12 content-container">
      <Heading className="text-center mb-6">Featured Books</Heading>
      <Carousel
        spaceBetween={10}
        slidesPerView={4}
        prevActivateId="prev-featured-carousel-button"
        nextActivateId="next-featured-carousel-button"
        centeredSlides={true}
        centeredSlidesBounds={true}
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {data ? (
          data.map((product) => (
            <SwiperSlide key={`featured--key${product.id}`}>
              <ProductPreview {...product} />
            </SwiperSlide>
          ))
        ) : (
          <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-2">
            {Array.from(Array(4).keys()).map((i) => (
              <div key={i}>
                <SkeletonProductPreview />
              </div>
            ))}
          </ul>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedBooks;
