import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Heading from '@ui/heading';
import UnderlineLink from '@common/underline-link';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { AiOutlineFire } from 'react-icons/ai';

const Trending = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiOutlineFire size={32} className="text-blue-500" />
          <Heading className="text-left">Trending Now</Heading>
        </div>
        <UnderlineLink href="/store">View More</UnderlineLink>
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
