import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@modules/carousels/components/slider';
import cn from '@lib/util/cn';
import Image from 'next/image';
import Thumbnail from '../thumbnail';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[700px] 2xl:w-[800px]',
  galleryClassName = 'xl:w-[80px] 2xl:w-[100px]',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full xl:flex xl:flex-row-reverse">
      <div
        className={cn(
          'relative mb-2.5 w-full overflow-hidden rounded-md border border-gray-100 md:mb-3 xl:ml-5',
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex items-center justify-center"
            >
              <Thumbnail
                thumbnail={item?.url}
                size="full"
                alt={`Product image ${item.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5">
          <div
            ref={prevRef}
            className="shadow-navigation flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-brand-light text-base transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl"
          >
            <IoIosArrowBack />
          </div>
          <div
            ref={nextRef}
            className="shadow-navigation flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-brand-light text-base transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl"
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-md border !border-muted transition hover:opacity-75"
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
