import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import Heading from '@ui/heading';

import Fire from '@modules/common/icons/fire';
import ProductCarousel from '@modules/products/components/product-carousel';
import { book } from '@static/book';
import { Separator } from '@ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { TABS } from 'static/popular';

const Popular = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <div className="content-container py-8">
      <div className="mb-1 flex items-center gap-1 sm:gap-2">
        <Fire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading variant="md">{book.popular}</Heading>
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
        </TabsList>
        <Separator />

        {TABS.map((tab) => {
          return (
            <TabsContent value={tab.label} key={tab.label} className="mt-8">
              <ProductCarousel
                products={data}
                isLoading={isLoading}
                prevActivateId={`prev-popular-button-${tab.label}`}
                nextActivateId={`next-popular-button-${tab.label}`}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Popular;
