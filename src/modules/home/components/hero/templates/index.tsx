import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import BannerCard from '@modules/home/components/hero/components/banner-card';
import { BANNERS } from 'static/banner';

const Hero = () => {
  return (
    <Carousel
      autoplay={{ delay: 5000 }}
      pagination={{
        clickable: true,
      }}
      loop
      speed={1100}
      prevActivateId="prev-banner"
      nextActivateId="next-banner"
      prevButtonClassName="left-2 lg:left-2.5"
      nextButtonClassName="right-2 lg:right-2.5"
    >
      {BANNERS.map((banner) => (
        <SwiperSlide key={`banner-${banner.id}`}>
          <BannerCard banner={banner} />
        </SwiperSlide>
      ))}
    </Carousel>
  );
};

export default Hero;
