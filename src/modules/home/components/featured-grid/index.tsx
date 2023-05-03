import useWindowSize from '@lib/hooks/use-window-size';
import { SwiperSlide } from '@modules/carousels/components/slider';
import dynamic from 'next/dynamic';
import FeaturedCard from './featured-card';
import { GRID_BREAKPOINTS } from 'static/breakpoints';
import data from 'static/features';

const Carousel = dynamic(() => import('@modules/carousels/templates'), {
  ssr: false,
});

interface featuredGridProps {
  className?: string;
}

const FeaturedGrid: React.FC<featuredGridProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 1536 ? (
        <Carousel
          autoplay={false}
          breakpoints={GRID_BREAKPOINTS}
          prevActivateId="featured-grid-button-prev"
          nextActivateId="featured-grid-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedGrid;
