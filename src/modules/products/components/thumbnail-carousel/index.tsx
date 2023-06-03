import cn from '@lib/util/cn';
import {
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  Thumbs,
} from '@modules/carousel/components/slider';
import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Thumbnail from '../thumbnail';
import { THUMB_BREAKPOINTS } from '@static/breakpoints';
import { Image } from '@medusajs/medusa';

interface Props {
  gallery: Image[] | undefined;
  thumbnailClassName?: string;
  galleryClassName?: string;
}

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'lg:w-[76px]',
  galleryClassName = '',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="flex w-full flex-col lg:flex-row-reverse">
      <div
        className={cn(
          'relative mx-auto  w-[50%] overflow-hidden lg:ml-3 lg:w-full',
          galleryClassName
        )}
      >
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs]}
          slidesPerView={1}
          spaceBetween={0}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide key={`product-${item.id}`}>
              <Thumbnail
                thumbnail={item?.url}
                size="full"
                alt={`Product image ${item.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={cn(thumbnailClassName, 'hidden shrink-0 lg:block')}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={THUMB_BREAKPOINTS}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-${item.id}`}
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-md border transition hover:opacity-80"
            >
              <Thumbnail
                thumbnail={item?.url}
                size="full"
                alt={`Product thumb gallery ${item.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
