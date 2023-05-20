import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import ProductCarousel from '@modules/products/components/product-carousel';
import Heading from '@ui/heading';
import { SlBadge } from 'react-icons/sl';

const FeaturedBooks = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <section id="featured-books" className="bg-primary/10">
      <div className="content-container py-16">
        <div className="mb-8 flex items-center justify-center gap-1 sm:gap-2">
          <SlBadge className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
          <Heading variant="heading">Sách Nổi Bật</Heading>
        </div>
        <ProductCarousel
          products={data}
          isLoading={isLoading}
          prevActivateId="prev-featured-button"
          nextActivateId="next-featured-button"
          center
        />
      </div>
    </section>
  );
};

export default FeaturedBooks;
