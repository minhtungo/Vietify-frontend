import cn from '@lib/util/cn';
import repeat from '@lib/util/repeat';
import {
  SwiperOptions,
  SwiperSlide,
} from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { FC } from 'react';
import { PRODUCT_BREAKPOINTS } from 'static/breakpoints';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { ProductPreviewType } from 'types/global';

export interface ProductCarouselProps extends SwiperOptions {
  className?: string;
  products: ProductPreviewType[] | undefined;
  isLoading: boolean;
  center?: boolean;
  carouselBreakpoint?: {} | any;
  prevActivateId?: string;
  nextActivateId?: string;
}

const ProductCarousel: FC<ProductCarouselProps> = ({
  className,
  products,
  isLoading,
  carouselBreakpoint,
  center = false,
  prevActivateId,
  nextActivateId,
}) => {
  return (
    <Carousel
      breakpoints={carouselBreakpoint || PRODUCT_BREAKPOINTS}
      centeredSlides={center}
      prevActivateId={prevActivateId}
      nextActivateId={nextActivateId}
      className={cn(className)}
      prevButtonClassName="-left-2 md:-left-1 lg:-left-2 xl:-left-2.5 2xl:left-5 -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
      nextButtonClassName="-right-2 md:-right-1 lg:-right-2 xl:-right-2.5 2xl:right-5 -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
    >
      {isLoading ? (
        <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-5">
          {repeat(5).map((i) => (
            <li key={i}>
              <SkeletonProductPreview />
            </li>
          ))}
        </ul>
      ) : (
        products?.map((product) => (
          <SwiperSlide key={`product-${product.id}`}>
            <ProductPreview {...product} />
          </SwiperSlide>
        ))
      )}
    </Carousel>
  );
};

export default ProductCarousel;
