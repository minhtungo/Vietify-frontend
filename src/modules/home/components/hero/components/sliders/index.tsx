import cn from '@lib/util/cn';
import Carousel from '@modules/carousels/templates';
import { FC } from 'react';
import { Banner } from 'types/global';
import { SwiperSlide } from '@modules/carousels/components/slider';
import BannerCard from '@modules/home/components/hero/components/banner-card';

interface SliderProps {
  className?: string;
  contentClassName?: string;
  heroBanner: Banner[];
}

const Sliders: FC<SliderProps> = ({
  className,
  heroBanner,
  contentClassName,
}) => {
  return (
    <div className={cn(className)}>
      <Carousel
        autoplay={true}
        pagination={{
          clickable: true,
        }}
      >
        {heroBanner.map((banner, index) => (
          <SwiperSlide
            key={`banner--key${banner.id}`}
            className={contentClassName}
          >
            <BannerCard banner={banner} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default Sliders;
