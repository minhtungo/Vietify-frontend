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
import { BREAKPOINTS, FEATURED_BREAKPOINTS } from 'static/breakpoints';

export interface CarouselProps extends SwiperOptions {
  className?: string;
  children: React.ReactNode;
  buttonGroupClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  banner?: boolean;
  featured?:boolean;
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
  featured,
  ...props
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('relative', className)}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        breakpoints={banner ? undefined : featured ? FEATURED_BREAKPOINTS : BREAKPOINTS}
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
          className={cn(
            'absolute top-2/4 z-10 flex w-full items-center',
            buttonGroupClassName
          )}
        >
          <div
            className={cn('carousel-button', prevButtonClassName)}
            id={prevActivateId}
          >
            <IoIosArrowBack />
          </div>
          <div
            className={cn('carousel-button', nextButtonClassName)}
            id={nextActivateId}
          >
            <IoIosArrowForward />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
