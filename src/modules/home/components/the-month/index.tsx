import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import { SwiperSlide } from '@modules/carousels/components/slider';
import Carousel from '@modules/carousels/templates';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import Heading from '@ui/heading';
import { AiOutlineFire } from 'react-icons/ai';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Separator } from '@ui/separator';
import { TABS } from 'static/popular';

const TheMonth = () => {
  const { data } = useFeaturedProductsQuery();

  const featuredProducts = data ? data[0] : null;

  return (
    <div className="content-container py-8">
      <div className="mb-8 flex items-center gap-2">
        <AiOutlineFire size={32} className="text-primary" />
        <Heading variant="heading">The Month</Heading>
      </div>
      <div className="grid-cols-7 gap-3 md:grid lg:grid-cols-5 lg:gap-5 xl:gap-7 2xl:grid-cols-7">
        <div className="col-span-3 mb-3 md:sticky md:top-16 md:mb-0 md:h-[600px] lg:top-20 lg:col-span-2 lg:h-[690px]">
          <div className="h-auto overflow-hidden rounded-md shadow-card">
            <ProductPreview {...featuredProducts} />
          </div>
        </div>
        <div className="col-span-4 lg:col-span-3 2xl:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-5">
            {data &&
              data.map((product) => (
                <>
                  <ProductPreview {...product} key={product.id} />
                  <ProductPreview {...product} key={product.id} />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheMonth;
