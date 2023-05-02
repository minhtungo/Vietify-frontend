import cn from '@lib/util/cn';
import { Product } from '@medusajs/medusa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';

import ProductDetails from './product-details';
import DescriptionTab from './description-tab';
import ReviewsTab from './reviews';

import { Separator } from '@ui/separator';

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
      <TabsList className="flex flex-col flex-wrap lg:flex-row lg:space-x-4 ">
        {tabs.map((tab, i) => {
          return (
            <TabsTrigger
              key={i}
              value={tab.label}
              className="text-lg hover:border-gray-500 hover:text-gray-600"
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
