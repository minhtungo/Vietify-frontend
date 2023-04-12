import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import BannerCard from '@modules/home/components/hero/components/banner-card';
import { banners } from '@modules/home/components/hero/content';

const Hero = () => {
  return (
    <>
      <Carousel
        autoplay={true}
        pagination={{
          clickable: true,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={`banner--key${banner.id}`}>
            <BannerCard banner={banner} />
          </SwiperSlide>
        ))}
      </Carousel>
    </>
  );
};

export default Hero;
