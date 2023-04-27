import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import BannerCard from '@modules/home/components/hero/components/banner-card';
import { banners } from '@modules/home/components/hero/content';

const Hero = () => {
  return (
    <>
      <Carousel
        autoplay={{ delay: 5000 }}
        pagination={{
          clickable: true,
        }}
        banner
        speed={1100}
        loop
        prevActivateId="prev-banner-carousel-button"
        nextActivateId="next-banner-carousel-button"
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
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
