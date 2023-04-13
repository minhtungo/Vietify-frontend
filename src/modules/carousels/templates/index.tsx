import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import cn from '@lib/util/cn';
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper,
} from '@modules/carousels/components/slider';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import React, { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import { getDirection } from '@lib/util/get-direction';

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonGroupClassName?: string;
  breakpoints?: {} | any;
  autoplay?: {} | any;
  navigation?: {} | any;
  pagination?: {} | any;
  slidesPerView?: number;
}

const Carousel: FC<CarouselProps> = ({
  className,
  children,
  autoplay,
  navigation = true,
  breakpoints,
  buttonGroupClassName,
  pagination,
  slidesPerView,
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = 'ltr:-left-3.5 rtl:-right-3.5 lg:ltr:-left-4 lg:rtl:-right-4 xl:ltr:-left-5 xl:rtl:-right-5',
  nextButtonClassName = 'ltr:-right-3.5 rtl:-left-3.5 lg:ltr:-right-4 lg:rtl:-left-4 xl:ltr:-right-5 xl:rtl:-left-5',
  ...props
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  let nextButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation 3xl:text-2xl',

    nextButtonClassName
  );
  let prevButtonClasses = cn(
    'w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full bg-brand-light absolute transition duration-300 hover:bg-brand hover:text-brand-light focus:outline-none transform shadow-navigation 3xl:text-2xl',
    prevButtonClassName
  );
  return (
    <div className={cn('relative', className)}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        dir={dir}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!,
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!,
                disabledClass: 'hidden',
              }
            : {}
        }
        pagination={pagination}
        slidesPerView={slidesPerView}
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
