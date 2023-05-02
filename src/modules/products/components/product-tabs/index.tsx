import cn from '@lib/util/cn';
import { Product } from '@medusajs/medusa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';

import ProductDetails from './product-details';
import DescriptionTab from './description-tab';
import ReviewsTab from './reviews';
import Heading from '@modules/ui/heading';

type ProductTabsProps = {
  product: Product;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: 'Description',
        component: <DescriptionTab product={product} />,
      },
      {
        label: 'Product Details',
        component: <ProductDetails product={product} />,
      },
      {
        label: 'Reviews',
        component: <ReviewsTab product={product} />,
      },
    ];
  }, [product]);

  return (
    <Tabs defaultValue="Description">
      <TabsList className="flex flex-col border-b border-gray-200 lg:flex-row">
        {tabs.map((tab, i) => {
          return (
            <TabsTrigger
              key={i}
              value={tab.label}
              className={cn(
                'transition-color w-[15%] uppercase duration-150 ease-in-out'
              )}
            >
              <Heading variant="medium">{tab.label}</Heading>
            </TabsTrigger>
          );
        })}
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
