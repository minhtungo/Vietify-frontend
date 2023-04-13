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
        prevActivateId="bundle-combo-carousel-button-prev"
        nextActivateId="bundle-combo-carousel-button-next"
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
