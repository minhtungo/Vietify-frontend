import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import BannerCard from '@modules/home/components/hero/components/banner-card';
import { BANNERS } from 'static/banner';

const Hero = () => {
  return (
    <>
      <Carousel
        autoplay={{ delay: 5000 }}
        pagination={{
          clickable: true,
        }}
        banner
        loop
        speed={1100}
        prevActivateId="prev-banner-carousel-button"
        nextActivateId="next-banner-carousel-button"
        prevButtonClassName="left-2 lg:left-2.5"
        nextButtonClassName="right-2 lg:right-2.5"
      >
        {BANNERS.map((banner) => (
          <SwiperSlide key={`banner--key${banner.id}`}>
            <BannerCard banner={banner} />
          </SwiperSlide>
        ))}
      </Carousel>
    </>
  );
};

export default Hero;
