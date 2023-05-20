import CountDown from '@common/countdown';
import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import Flash from '@modules/common/icons/flash';
import ProductCarousel from '@modules/products/components/product-carousel';
import { book } from '@static/book';
import Heading from '@ui/heading';

const Deals = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-12">
      <div className="mb-5 flex gap-2 md:mb-8">
        <div className="flex items-center gap-1 sm:gap-2">
          <Flash className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
          <Heading variant="md">{book.deals}</Heading>
        </div>
        <CountDown date={Date.now() + 100000000} />
      </div>

      <ProductCarousel
        prevActivateId="prev-deals-button"
        nextActivateId="next-deals-button"
        products={data}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Deals;
