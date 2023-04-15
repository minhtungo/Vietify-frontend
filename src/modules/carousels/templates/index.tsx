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
  SwiperOptions,
} from '@modules/carousels/components/slider';
import React, { FC, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import BREAKPOINTS from '../breakpoints';

export interface CarouselProps extends SwiperOptions {
  className?: string;
  children: React.ReactNode;
  buttonGroupClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  banner?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  className,
  children,
  buttonGroupClassName,
  navigation = true,
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName = 'left-2 lg:left-2.5',
  nextButtonClassName = 'right-2 lg:right-2.5',
  banner,
  ...props
}) => {
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
        breakpoints={banner ? BREAKPOINTS : undefined}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!,
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!,
                disabledClass: 'opacity-50',
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          <div className={prevButtonClasses} id={prevActivateId}>
            <IoIosArrowBack />
          </div>
          <div className={nextButtonClasses} id={nextActivateId}>
            <IoIosArrowForward />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
