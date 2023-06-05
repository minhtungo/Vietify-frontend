import { useFeaturedProductsQuery } from '@lib/hooks/use-layout-data';
import Heading from '@ui/heading';

import Fire from '@modules/common/icons/fire';
import ProductCarousel from '@modules/products/components/product-carousel';
import { book } from '@static/book';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { TABS } from 'static/popular';
import Container from '@modules/layout/components/container';

const Popular = () => {
  const { data, isLoading } = useFeaturedProductsQuery();

  return (
    <Container>
      <div className="mb-1 flex items-center gap-1 sm:gap-2">
        <Fire className="h-6 w-6 text-primary sm:h-7 sm:w-7 medium:h-8 medium:w-8" />
        <Heading size="md">{book.popular}</Heading>
      </div>

      <Tabs defaultValue={TABS[0].label}>
        <TabsList className="gap-x-7">
          {TABS.map((tab, i) => {
            return (
              <TabsTrigger
                key={i}
                value={tab.label}
                className="text-md px-1 hover:border-gray-400 hover:text-foreground/80"
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

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
    </Container>
  );
};

export default Popular;
