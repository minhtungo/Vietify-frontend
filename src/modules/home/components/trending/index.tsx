import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import repeat from '@lib/util/repeat';
import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import Fire from '@modules/common/icons/fire';
import ProductCarousel from '@modules/products/components/product-carousel';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { book } from '@static/book';
import Heading from '@ui/heading';

const Trending = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center gap-1 sm:gap-2">
        <Fire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading variant="heading">{book.trending}</Heading>
      </div>
      <ProductCarousel
        products={data}
        isLoading={isLoading}
        prevActivateId="prev-trending-button"
        nextActivateId="next-trending-button"
      />
    </div>
  );
};

export default Trending;
