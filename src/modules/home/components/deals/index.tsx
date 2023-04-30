import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import Button from '@ui/button';
import CountDown from '@common/countdown';
import Heading from '@ui/heading';
import Link from '@common/link';
import UnderlineLink from '@common/underline-link';
import ArrowForwardIcon from '@icons/arrow-forward';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { TiFlashOutline } from 'react-icons/ti';

const Deals = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TiFlashOutline size={32} className="text-primary" />
          <Heading className="text-left">Deals of The Week</Heading>
          <CountDown date={Date.now() + 100000000} />
        </div>
        <UnderlineLink href="/store">View More</UnderlineLink>
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
            <>
              <SwiperSlide key={`deals--key-${product.id}`}>
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

export default Deals;
