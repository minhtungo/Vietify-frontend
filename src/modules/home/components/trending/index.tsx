import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import Fire from '@modules/common/icons/fire';
import ProductCarousel from '@modules/products/components/product-carousel';
import { book } from '@static/book';
import Heading from '@ui/heading';

const Trending = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-8 flex items-center gap-1 sm:gap-2">
        <Fire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading size="md">{book.trending}</Heading>
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
