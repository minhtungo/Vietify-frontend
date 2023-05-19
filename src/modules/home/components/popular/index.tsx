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
import { book } from '@static/book';
import repeat from '@lib/util/repeat';

const Popular = () => {
  const { data } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-8">
      <div className="mb-1 flex items-center gap-1 sm:gap-2">
        <AiOutlineFire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading variant="heading">{book.popular}</Heading>
      </div>

      <Tabs defaultValue={TABS[0].label}>
        <TabsList className="flex flex-col flex-wrap justify-start gap-x-7 lg:flex-row">
          {TABS.map((tab, i) => {
            return (
              <TabsTrigger
                key={i}
                value={tab.label}
                className="text-md px-0 hover:border-gray-400 hover:text-foreground/80"
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
          <Separator />
        </TabsList>
        {TABS.map((tab, i) => {
          return (
            <TabsContent value={tab.label} key={i} className="mt-8">
              <Carousel
                prevActivateId="prev-trending-carousel-button"
                nextActivateId="next-trending-carousel-button"
                centeredSlides={true}
                centeredSlidesBounds={true}
                prevButtonClassName="left-2 lg:left-2.5"
                nextButtonClassName="right-2 lg:right-2.5"
              >
                {data ? (
                  data.map((product) => (
                    <>
                      <SwiperSlide key={`trending--key-${product.id}`}>
                        <ProductPreview {...product} />
                      </SwiperSlide>
                      <SwiperSlide key={`trending--key-${product.id}`}>
                        <ProductPreview {...product} />
                      </SwiperSlide>
                    </>
                  ))
                ) : (
                  <ul className="grid grid-cols-2 gap-x-2 small:grid-cols-5">
                    {repeat(5).map((i) => (
                      <li key={i}>
                        <SkeletonProductPreview />
                      </li>
                    ))}
                  </ul>
                )}
              </Carousel>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Popular;
