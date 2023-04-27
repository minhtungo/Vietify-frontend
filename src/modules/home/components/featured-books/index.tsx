import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@modules/common/components/heading';
import { SlBadge } from 'react-icons/sl';
import UnderlineLink from '@modules/common/components/underline-link';

const FeaturedBooks = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className=" bg-blue-100/20">
      <div className="content-container py-16 ">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlBadge size={32} className="fill-brand" />
            <Heading className="text-left">Featured Books</Heading>
          </div>
          <UnderlineLink href="/store">View More</UnderlineLink>
        </div>

        <Carousel
          spaceBetween={10}
          slidesPerView={5}
          prevActivateId="prev-featured-carousel-button"
          nextActivateId="next-featured-carousel-button"
          centeredSlides={true}
          centeredSlidesBounds={true}
          prevButtonClassName="left-2 lg:left-2.5"
          nextButtonClassName="right-2 lg:right-2.5"
        >
          {data ? (
            data.map((product) => (
              <>
                <SwiperSlide key={`featured--key-${product.id}`}>
                  <ProductPreview {...product} />
                </SwiperSlide>
              </>
            ))
          ) : (
            <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-4">
              {Array.from(Array(4).keys()).map((i) => (
                <div key={i}>
                  <SkeletonProductPreview />
                </div>
              ))}
            </ul>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedBooks;
