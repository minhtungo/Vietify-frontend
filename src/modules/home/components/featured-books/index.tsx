import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';

const FeaturedBooks = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="py-12">
      <div className="content-container py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
            Featured Books
          </p>
        </div>
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
          {data
            ? data.map((product) => (
                <SwiperSlide key={`featured--key${product.id}`}>
                  <ProductPreview {...product} />
                </SwiperSlide>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedBooks;
