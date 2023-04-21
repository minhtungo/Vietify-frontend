import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@modules/common/components/heading';
import { AiOutlineFire } from 'react-icons/ai';
import Button from '@modules/common/components/button';
import Link from '@modules/common/components/link';
import { IoIosArrowForward } from 'react-icons/io';
import UnderlineLink from '@modules/common/components/underline-link';

const Trending = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="py-12 content-container">
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center gap-2">
          <AiOutlineFire size={32} className="text-blue-500" />
          <Heading className="text-left">Trending Now</Heading>
        </div>
        <UnderlineLink href="/store">View More</UnderlineLink>
      </div>

      <Carousel
        spaceBetween={10}
        slidesPerView={5}
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
              <SwiperSlide key={`featured--key${product.id}`}>
                <ProductPreview {...product} />
              </SwiperSlide>
              <SwiperSlide key={`featured--key${product.id}`}>
                <ProductPreview {...product} />
              </SwiperSlide>
            </>
          ))
        ) : (
          <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-2">
            {Array.from(Array(4).keys()).map((i) => (
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
