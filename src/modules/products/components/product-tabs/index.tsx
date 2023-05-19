import { Product } from '@medusajs/medusa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import DescriptionTab from './description-tab';
import ProductDetails from './product-details';
import ReviewsTab from './reviews';
import { book } from '@static/book';

import { Separator } from '@ui/separator';
type ProductTabsProps = {
  product: PricedProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: book.description,
        component: <DescriptionTab product={product} />,
      },
      {
        label: book.details,
        component: <ProductDetails product={product} />,
      },
      {
        label: book.review,
        component: <ReviewsTab product={product} />,
      },
    ];
  }, [product]);

  return (
    <Tabs defaultValue="Description">
      <TabsList className="flex flex-col flex-wrap justify-start gap-x-7 lg:flex-row">
        {tabs.map((tab, i) => {
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
      {tabs.map((tab, i) => {
        return (
          <TabsContent value={tab.label} key={i}>
            {tab.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ProductTabs;
