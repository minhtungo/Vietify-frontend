import Carousel from '@modules/carousel/templates';
import Container from '@modules/layout/components/container';
import { PUBLISHERS_BREAKPOINTS } from '@static/breakpoints';
import { PUBLISHERS } from '@static/publisher';
import Image from 'next/image';
import { FC } from 'react';
import { SwiperSlide } from 'swiper/react';

interface publishersProps {}

const Publishers: FC<publishersProps> = ({}) => {
  return (
    <Container>
      <Carousel
        autoplay={{ delay: 4000 }}
        loop
        breakpoints={PUBLISHERS_BREAKPOINTS}
        speed={1000}
        prevActivateId="prev-publisher"
        nextActivateId="next-publisher"
        prevButtonClassName="announcement-button text-muted-foreground hover:text-foreground left-0"
        nextButtonClassName="announcement-button text-muted-foreground right-0 hover:text-foreground"
      >
        {PUBLISHERS.map((publisher) => (
          <SwiperSlide key={`publisher-${publisher.id}`}>
            <Image
              src={publisher.imageSrc}
              alt={publisher.alt}
              width={120}
              height={120}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </Container>
  );
};

export default Publishers;
