import 'swiper/css/autoplay';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import clsxm from '@lib/clsxm';
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  Swiper,
} from '@modules/carousels/components/slider';
import React, { useRef } from 'react';
import { FC } from 'react';

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
  autoplay?: {} | any;
  navigation?: {} | any;
  pagination?: {} | any;
}

const Carousel: FC<CarouselProps> = ({
  className,
  children,
  autoplay,
  navigation,
  pagination,
  ...props
}) => {
  return (
    <div className={clsxm('relative', className)}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        navigation={navigation}
        pagination={pagination}
        {...props}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Carousel;
