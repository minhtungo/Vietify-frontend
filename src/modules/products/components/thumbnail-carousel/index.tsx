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
          'w-full xl:ml-5 mb-2.5 md:mb-3 border border-gray-100 overflow-hidden rounded-md relative',
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
              <Image
                src={item?.url}
                alt={`Product gallery ${item.id}`}
                width={650}
                height={590}
                className="rounded-lg w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            <IoIosArrowBack />
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
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
              className="flex items-center justify-center overflow-hidden transition border rounded cursor-pointer border-border-base hover:opacity-75"
            >
              <Image
                src={item?.url}
                alt={`Product thumb gallery ${item.id}`}
                width={170}
                height={170}
                style={{ width: 'auto' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
