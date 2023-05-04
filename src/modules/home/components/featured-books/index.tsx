import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import Heading from '@ui/heading';
import { SlBadge } from 'react-icons/sl';

const FeaturedBooks = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <section id="featured-books" className="bg-primary/10">
      <div className="content-container py-16">
        <div className="mb-8 flex items-center justify-center gap-2">
          <SlBadge size={32} className="fill-brand" />
          <Heading variant="heading">Featured Books</Heading>
        </div>

        <Carousel
          prevActivateId="prev-featured-carousel-button"
          nextActivateId="next-featured-carousel-button"
          centeredSlides={true}
          prevButtonClassName="left-2 lg:left-2.5"
          nextButtonClassName="right-2 lg:right-2.5"
          featured
        >
          {data ? (
            data.map((product) => (
              <div key={`featured--key-${product.id}`} className="h-16">
                <SwiperSlide>
                  <ProductPreview {...product} />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductPreview {...product} />
                </SwiperSlide>
              </div>
            ))
          ) : (
            <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-4">
              {Array.from(Array(4).keys()).map((i) => (
                <div key={i}>
                  <SkeletonProductPreview />
                </div>
              ))}
            </ul>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedBooks;
