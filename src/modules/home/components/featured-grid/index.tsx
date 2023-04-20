import useWindowSize from '@lib/hooks/use-window-size';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Badge from '@modules/common/icons/badge';
import dynamic from 'next/dynamic';
import FeaturedCard from './featured-card';

const Carousel = dynamic(() => import('@modules/carousels/templates'), {
  ssr: false,
});

const data = [
  {
    id: 1,
    icon: (
      <Badge
        size={36}
        color="#F38E00"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-one',
    href: '',

    bgColor: '#FFEED6',
  },
  {
    id: 2,
    icon: (
      <Badge
        size={36}
        color="#0095E7"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-two',
    href: '',

    bgColor: '#CCEDFF',
  },
  {
    id: 3,
    icon: (
      <Badge
        size={36}
        color="#02B290"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-three',
    href: '',

    bgColor: '#D7F1EC',
  },
  {
    id: 4,
    icon: (
      <Badge
        size={36}
        color="#FF7B7B"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-title-four',
    href: '',
    bgColor: '#FFE1E1',
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640 ': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeaturedGrid: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 1536 ? (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          prevActivateId="featured-carousel-button-prev"
          nextActivateId="featured-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedGrid;
