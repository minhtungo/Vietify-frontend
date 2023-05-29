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
      className="w-full"
      loop
      speed={1100}
      prevActivateId="prev-banner"
      nextActivateId="next-banner"
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
