import cn from '@lib/util/cn';
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper,
  SwiperOptions,
} from '@modules/carousel/components/slider';
import ArrowBack from '@modules/common/icons/arrow-back';
import ArrowForward from '@modules/common/icons/arrow-forward';
import React, { useRef } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';

export interface CarouselProps extends SwiperOptions {
  className?: string;
  children: React.ReactNode;
  buttonGroupClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  pagination?: {} | any;
  breakpoints?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
  loop?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  buttonGroupClassName,
  navigation = true,
  prevActivateId = '',
  nextActivateId = '',
  prevButtonClassName,
  nextButtonClassName,
  breakpoints,
  autoplay,
  grid,
  loop = false,
  pagination = false,
  ...props
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('carouselWrapper relative', className)}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        loop={loop}
        pagination={pagination}
        grid={grid}
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
            className={cn(
              prevButtonClassName || 'carousel-button left-2 lg:left-1'
            )}
            id={prevActivateId}
          >
            <ArrowBack />
          </div>
          <div
            className={cn(
              nextButtonClassName || 'carousel-button right-2 lg:right-1'
            )}
            id={nextActivateId}
          >
            <ArrowForward />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
