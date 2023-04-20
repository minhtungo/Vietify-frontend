import useWindowSize from '@lib/hooks/use-window-size';
import cn from '@lib/util/cn';
import { SwiperSlide } from '@modules/carousels/components/slider';
import dynamic from 'next/dynamic';
import BundleCard from '../bundle-card';
const Carousel = dynamic(() => import('@modules/carousels/templates'), {
  ssr: false,
});

interface Props {
  className?: string;
  data: any;
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
  '680': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BundleGrid: React.FC<Props> = ({ className = 'mb-12 pb-0.5', data }) => {
  const { width } = useWindowSize();
  return (
    <div className={cn('heightFull', className)}>
      {width! < 1536 ? (
        <Carousel
          breakpoints={breakpoints}
          prevActivateId="prev-bundle-carousel-button"
          nextActivateId="next-bundle-carousel-button"
        >
          {data?.map((item: any) => (
            <SwiperSlide key={`bundle-key-${item.id}`}>
              <BundleCard bundle={item} href={``} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data?.map((item: any) => (
            <BundleCard key={`bundle-key-${item.id}`} bundle={item} href={``} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BundleGrid;
